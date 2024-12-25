import { useState, useEffect, useCallback } from 'react';
import { Record, RecordType } from '../types';
import { supabase } from '../lib/supabase';
import { useSupabase } from '../context/SupabaseContext';
import { useRecordCache } from './useRecordCache';
import { sortRecordsByDate, getLatestRecordByType } from '../utils/recordUtils';

export function useRecords(catId: string) {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSupabase();
  const { setCacheItem, getCacheItem } = useRecordCache();

  const cacheKey = `records_${catId}`;

  const fetchRecords = useCallback(async () => {
    if (!session?.user?.id || !catId) return;
    
    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('records')
        .select('*')
        .eq('cat_id', catId)
        .order('created_at', { ascending: false })
        .order('date', { ascending: false });

      if (fetchError) throw fetchError;

      const formattedRecords: Record[] = data.map(record => ({
        id: record.id,
        cat_id: record.cat_id,
        type: record.type,
        date: record.date,
        value: record.value,
        amount: record.amount,
        frequency: record.frequency,
        condition: record.condition,
        created_at: record.created_at
      }));

      setRecords(formattedRecords);
      setCacheItem(cacheKey, formattedRecords);
      setError(null);
    } catch (err) {
      console.error('Error fetching records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch records');
    } finally {
      setLoading(false);
    }
  }, [catId, session?.user?.id, cacheKey, setCacheItem]);

  // 初期データ取得
  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  // リアルタイム更新のサブスクリプション
  useEffect(() => {
    if (!catId) return;
    
    const channel = supabase
      .channel(`records:${catId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'records',
          filter: `cat_id=eq.${catId}`
        },
        async () => {
          await fetchRecords();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [catId, fetchRecords]);

  const getLatestRecord = useCallback((type: RecordType) => {
    const typeRecords = records.filter(record => record.type === type);
    if (typeRecords.length === 0) return null;

    const sortedRecords = typeRecords.sort((a, b) => {
      if (a.created_at && b.created_at) {
        const createdAtA = new Date(a.created_at).getTime();
        const createdAtB = new Date(b.created_at).getTime();
        if (createdAtA !== createdAtB) return createdAtB - createdAtA;
      }

      const dateA = new Date(a.date + 'T00:00:00Z').getTime();
      const dateB = new Date(b.date + 'T00:00:00Z').getTime();
      if (dateA !== dateB) return dateB - dateA;
      
      if (a.id && b.id) {
        return b.id.localeCompare(a.id);
      }
      
      return 0;
    });

    return sortedRecords[0];
  }, [records]);

  const addRecord = async (record: Omit<Record, 'id' | 'created_at'>) => {
    try {
      const { data: insertedRecord, error: insertError } = await supabase
        .from('records')
        .insert([{
          cat_id: record.cat_id,
          type: record.type,
          date: record.date,
          value: record.value?.toString(),
          amount: record.amount,
          frequency: record.frequency,
          condition: record.condition
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      const newRecord: Record = {
        id: insertedRecord.id,
        cat_id: insertedRecord.cat_id,
        type: insertedRecord.type,
        date: insertedRecord.date,
        value: insertedRecord.value,
        amount: insertedRecord.amount,
        frequency: insertedRecord.frequency,
        condition: insertedRecord.condition,
        created_at: insertedRecord.created_at
      };

      // 既存のレコードと新しいレコードを結合して、日付でソート
      setRecords(prevRecords => {
        const updatedRecords = [...prevRecords, newRecord];
        return sortRecordsByDate(updatedRecords);
      });

      // キャッシュも更新
      const currentCache = (await getCacheItem<Record[]>(cacheKey)) || [];
      const updatedCache = sortRecordsByDate([...currentCache, newRecord]);
      setCacheItem(cacheKey, updatedCache);

      return true;
    } catch (err) {
      console.error('Error adding record:', err);
      throw err;
    }
  };

  const formatRecordValue = (type: RecordType, value: string) => {
    switch (type) {
      case 'weight':
        return `${value}kg`;
      case 'food':
        return `${value}g`;
      case 'water':
        return `${value}ml`;
      case 'temperature':
        return `${value}℃`;
      case 'urine':
        return value;
      case 'poop':
        return value;
      default:
        return value;
    }
  };

  return { records, loading, error, addRecord, getLatestRecord };
}

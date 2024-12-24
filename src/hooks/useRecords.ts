import { useState, useEffect, useCallback } from 'react';
import { Record } from '../types';
import { supabase } from '../lib/supabase';
import { useSupabase } from '../context/SupabaseContext';
import { useRecordCache } from './useRecordCache';
import { sortRecordsByDate, getLatestRecordByType } from '../utils/recordUtils';

export function useRecords(catId: string) {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSupabase();
  const { setCacheItem, getCacheItem, clearCache } = useRecordCache();

  const cacheKey = `records_${catId}`;

  const fetchRecords = useCallback(async () => {
    if (!session?.user?.id || !catId) return;
    
    try {
      setLoading(true);
      
      const { data, error: fetchError } = await supabase
        .from('records')
        .select('*')
        .eq('cat_id', catId)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const formattedRecords = data.map(record => ({
        id: record.id,
        catId: record.cat_id,
        type: record.type,
        date: record.date,
        value: record.value,
        unit: record.unit
      }));

      const sortedRecords = sortRecordsByDate(formattedRecords);
      setRecords(sortedRecords);
      setCacheItem(cacheKey, sortedRecords);
      setError(null);
    } catch (err) {
      console.error('Error fetching records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch records');
      
      // エラー時にキャッシュからデータを取得
      const cachedData = getCacheItem<Record[]>(cacheKey);
      if (cachedData) {
        setRecords(cachedData);
      }
    } finally {
      setLoading(false);
    }
  }, [catId, session?.user?.id, cacheKey, setCacheItem, getCacheItem]);

  useEffect(() => {
    fetchRecords();

    // リアルタイム更新のサブスクリプション
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
        () => {
          fetchRecords();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [catId, fetchRecords]);

  const addRecord = async (record: Omit<Record, 'id'>) => {
    if (!session?.user?.id) throw new Error('認証が必要です');

    try {
      // 楽観的更新
      const tempId = `temp_${Date.now()}`;
      const newRecord = { ...record, id: tempId };
      setRecords(prev => sortRecordsByDate([...prev, newRecord]));

      const { data: insertedRecord, error: insertError } = await supabase
        .from('records')
        .insert([{
          cat_id: record.catId,
          type: record.type,
          date: record.date,
          value: record.value.toString(),
          unit: record.unit
        }])
        .select()
        .single();

      if (insertError) {
        // エラー時は楽観的更新を元に戻す
        setRecords(prev => prev.filter(r => r.id !== tempId));
        throw insertError;
      }

      // 実際のレコードで更新
      setRecords(prev => 
        sortRecordsByDate(
          prev
            .filter(r => r.id !== tempId)
            .concat({
              id: insertedRecord.id,
              catId: insertedRecord.cat_id,
              type: insertedRecord.type,
              date: insertedRecord.date,
              value: insertedRecord.value,
              unit: insertedRecord.unit
            })
        )
      );

      return true;
    } catch (err) {
      console.error('Error adding record:', err);
      throw err;
    }
  };

  const getLatestRecord = useCallback((type: Record['type']) => {
    return getLatestRecordByType(records, type);
  }, [records]);

  return { records, loading, error, addRecord, getLatestRecord };
}
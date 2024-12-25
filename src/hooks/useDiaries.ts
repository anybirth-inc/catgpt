import { useState, useEffect, useCallback } from 'react';
import { Diary } from '../types';
import { supabase } from '../lib/supabase';
import { useSupabase } from '../context/SupabaseContext';

export function useDiaries(catId: string) {

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSupabase();

  const fetchDiaries = useCallback(async () => {
    try {
      setLoading(true);
      
      if (!session?.user?.id || !catId) {
        console.log('No session or catId:', { session, catId });
        setDiaries([]);
        return;
      }
      
      const { data, error: fetchError } = await supabase
        .from('diaries')
        .select('*')
        .eq('cat_id', catId)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });


      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw fetchError;
      }

      if (!data) {
        console.log('No data returned');
        setDiaries([]);
        return;
      }

      const formattedDiaries = data.map(diary => ({
        id: diary.id,
        cat_id: diary.cat_id,
        date: diary.date,
        content: diary.content,
        photos: diary.photos || [],
        created_at: diary.created_at
      }));

      setDiaries(formattedDiaries);
      setError(null);
    } catch (err) {
      console.error('Error fetching diaries:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch diaries');
      setDiaries([]);
    } finally {
      setLoading(false);
    }
  }, [catId, session?.user?.id]);

  // 初期データ取得
  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  // リアルタイム更新のサブスクリプション
  useEffect(() => {
    if (!catId) return;
    
    
    const channel = supabase
      .channel(`diaries:${catId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'diaries',
          filter: `cat_id=eq.${catId}`
        },
        async (payload) => {
          console.log('Realtime diary update received:', payload);
          await fetchDiaries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [catId, fetchDiaries]);

  const addDiary = async (diary: Omit<Diary, 'id' | 'created_at'>) => {
    try {
      const { data: insertedDiary, error: insertError } = await supabase
        .from('diaries')
        .insert([{
          cat_id: diary.cat_id,
          date: diary.date,
          content: diary.content,
          photos: diary.photos
        }])
        .select()
        .single();

      if (insertError) throw insertError;

      // 新しい日記をローカルのstateに追加
      const newDiary: Diary = {
        id: insertedDiary.id,
        cat_id: insertedDiary.cat_id,
        date: insertedDiary.date,
        content: insertedDiary.content,
        photos: insertedDiary.photos || [],
        created_at: insertedDiary.created_at
      };

      setDiaries(prevDiaries => {
        const updatedDiaries = [...prevDiaries, newDiary];
        return updatedDiaries.sort((a, b) => {
          const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          if (dateComparison !== 0) return dateComparison;
          return (b.created_at || '').localeCompare(a.created_at || '');
        });
      });

      return true;
    } catch (err) {
      console.error('Error adding diary:', err);
      throw err;
    }
  };

  return { diaries, loading, error, addDiary };
}

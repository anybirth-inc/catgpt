import { useState, useEffect } from 'react';
import { Cat } from '../types';
import { supabase } from '../lib/supabase';
import { useSupabase } from '../context/SupabaseContext';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function useCatDetails(id: string | undefined) {
  const [cat, setCat] = useState<Cat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSupabase();

  useEffect(() => {
    if (!id) {
      setError('猫のIDが必要です');
      setIsLoading(false);
      return;
    }

    if (!UUID_REGEX.test(id)) {
      setError('無効な猫のIDです');
      setIsLoading(false);
      return;
    }

    if (!session) {
      setError('ログインが必要です');
      setIsLoading(false);
      return;
    }

    fetchCat(id);
  }, [id, session]);

  const fetchCat = async (catId: string) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('cats')
        .select('*')
        .eq('id', catId)
        .eq('user_id', session?.user.id)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (!data) {
        setError('猫が見つかりません');
        return;
      }

      setCat({
        id: data.id,
        name: data.name,
        birthDate: data.birth_date,
        adoptionDate: data.adoption_date || '',
        breed: data.breed || '',
        gender: data.gender,
        photos: data.photos || [],
        microchipId: data.microchip_id,
        healthStatus: data.health_status
      });
    } catch (err) {
      console.error('Error fetching cat:', err);
      setError('猫の情報の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return { cat, isLoading, error };
}
import { useState, useEffect } from 'react';
import { Cat } from '../types';
import { supabase } from '../lib/supabase';
import { useSupabase } from '../context/SupabaseContext';

export function useCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useSupabase();

  useEffect(() => {
    if (session) {
      fetchCats();
    } else {
      setCats([]);
      setLoading(false);
    }
  }, [session]);

  const fetchCats = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('cats')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('name');

      if (fetchError) throw fetchError;

      setCats(data.map(cat => ({
        id: cat.id,
        name: cat.name,
        birthDate: cat.birth_date,
        adoptionDate: cat.adoption_date || '',
        breed: cat.breed || '',
        gender: cat.gender,
        photos: cat.photos || [],
        microchipId: cat.microchip_id,
        healthStatus: cat.health_status
      })));
    } catch (err) {
      console.error('Error fetching cats:', err);
      setError('猫の一覧の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return { cats, loading, error };
}
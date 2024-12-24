import React from 'react';
import { DashboardSummary } from '../components/DashboardSummary';
import { CatCard } from '../components/CatCard';
import { AddCatButton } from '../components/AddCatButton';
import { useCats } from '../hooks/useCats';
import { useSupabase } from '../context/SupabaseContext';

export function Home() {
  const { cats, loading, error } = useCats();
  const { session } = useSupabase();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">エラーが発生しました</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <DashboardSummary cats={cats} pendingRecords={3} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">登録された猫</h2>
        {session && <AddCatButton />}
      </div>

      {!session ? (
        <div className="text-center py-12">
          <p className="text-gray-600">ログインして猫を登録しましょう</p>
        </div>
      ) : cats.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">まだ猫が登録されていません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
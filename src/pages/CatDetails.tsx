import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CatHeader } from '../components/cat/CatHeader';
import { CatQuickActions } from '../components/cat/CatQuickActions';
import { HealthRecordSection } from '../components/cat/HealthRecordSection';
import { DiarySection } from '../components/cat/DiarySection';
import { VetSection } from '../components/cat/VetSection';
import { MedicationSection } from '../components/cat/MedicationSection';
import { RecordModal } from '../components/modals/RecordModal';
import { RecordType } from '../types';
import { useCatDetails } from '../hooks/useCatDetails';
import { useSupabase } from '../context/SupabaseContext';

export function CatDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useSupabase();
  const { cat, isLoading, error } = useCatDetails(id);
  const [recordModal, setRecordModal] = useState<{
    isOpen: boolean;
    type: RecordType;
    title: string;
  }>({
    isOpen: false,
    type: 'weight',
    title: ''
  });

  const openRecordModal = (type: RecordType, title: string) => {
    if (!session) {
      // ログインしていない場合はホームページにリダイレクト
      navigate('/');
      return;
    }
    setRecordModal({ isOpen: true, type, title });
  };

  if (isLoading) {
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
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-500"
        >
          ホームに戻る
        </button>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">猫が見つかりません</h2>
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-500"
        >
          ホームに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <CatHeader cat={cat} />
      <CatQuickActions catId={id!} onRecordClick={openRecordModal} />
      <HealthRecordSection catId={id!} onRecordClick={openRecordModal} />
      <DiarySection />
      <VetSection />
      <MedicationSection />

      <RecordModal
        isOpen={recordModal.isOpen}
        onClose={() => setRecordModal({ ...recordModal, isOpen: false })}
        type={recordModal.type}
        title={recordModal.title}
        catId={id!}
      />
    </div>
  );
}
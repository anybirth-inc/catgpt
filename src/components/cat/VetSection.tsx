import React, { useState } from 'react';
import { Stethoscope, Plus } from 'lucide-react';
import { VetModal } from '../modals/VetModal';

const mockVetRecords = [
  {
    id: '1',
    date: '2024-03-01',
    clinic: '〇〇動物病院',
    reason: '定期健康診断',
    diagnosis: '特に異常なし',
    nextVisit: '2024-06-01'
  },
  {
    id: '2',
    date: '2024-02-01',
    clinic: '〇〇動物病院',
    reason: 'ワクチン接種',
    diagnosis: '3種混合ワクチン接種完了',
    nextVisit: '2025-02-01'
  }
];

export function VetSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">獣医記録</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          記録を追加
        </button>
      </div>

      <div className="space-y-4">
        {mockVetRecords.map((record) => (
          <div key={record.id} className="border rounded-lg p-4">
            <div className="flex items-start">
              <Stethoscope className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{record.clinic}</h3>
                  <p className="text-sm text-gray-600">{record.date}</p>
                </div>
                <p className="text-sm text-gray-800 mt-1">
                  受診理由: {record.reason}
                </p>
                <p className="text-sm text-gray-800">診断: {record.diagnosis}</p>
                {record.nextVisit && (
                  <p className="text-sm text-gray-600 mt-1">
                    次回予約: {record.nextVisit}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <VetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
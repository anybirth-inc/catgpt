import React, { useState } from 'react';
import { Pill, Plus } from 'lucide-react';
import { MedicationModal } from '../modals/MedicationModal';

const mockMedications = [
  {
    id: '1',
    name: '胃腸薬A',
    dosage: '1錠',
    frequency: '1日2回',
    startDate: '2024-03-01',
    endDate: '2024-03-07',
    notes: '食後に投与'
  },
  {
    id: '2',
    name: 'ビタミン剤B',
    dosage: '0.5錠',
    frequency: '1日1回',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    notes: '朝に投与'
  }
];

export function MedicationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">服薬記録</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          薬を追加
        </button>
      </div>

      <div className="space-y-4">
        {mockMedications.map((med) => (
          <div key={med.id} className="border rounded-lg p-4">
            <div className="flex items-start">
              <Pill className="w-5 h-5 text-indigo-600 mt-1 mr-3" />
              <div className="flex-1">
                <h3 className="font-medium">{med.name}</h3>
                <p className="text-sm text-gray-600">
                  {med.dosage} - {med.frequency}
                </p>
                <p className="text-sm text-gray-600">
                  期間: {med.startDate} 〜 {med.endDate}
                </p>
                {med.notes && (
                  <p className="text-sm text-gray-600 mt-1">備考: {med.notes}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MedicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
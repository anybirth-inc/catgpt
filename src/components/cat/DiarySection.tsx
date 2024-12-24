import React, { useState } from 'react';
import { Camera, Plus } from 'lucide-react';
import { DiaryModal } from '../modals/DiaryModal';

const mockDiaries = [
  {
    id: '1',
    date: '2024-03-05',
    content: '今日は元気いっぱい遊んでいました。新しいおもちゃも気に入ってくれたようです。',
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=500&h=500']
  },
  {
    id: '2',
    date: '2024-03-04',
    content: '午後からぐっすり寝ていました。食欲は普通でした。',
    photos: []
  }
];

export function DiarySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">日記</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          新規作成
        </button>
      </div>

      <div className="space-y-6">
        {mockDiaries.map((diary) => (
          <div key={diary.id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-gray-600">{diary.date}</p>
            </div>
            <p className="text-gray-800 mb-3">{diary.content}</p>
            {diary.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {diary.photos.map((photo, index) => (
                  <img key={index} src={photo} alt="" className="rounded-lg w-full h-32 object-cover" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <DiaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
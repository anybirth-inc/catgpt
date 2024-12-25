import React, { useState } from 'react';
import { Book, Plus } from 'lucide-react';
import { useDiaries } from '../../hooks/useDiaries';
import { formatDate } from '../../utils/formatDate';

interface DiarySectionProps {
  catId: string;
  onAddClick: () => void;
}

export function DiarySection({ catId, onAddClick }: DiarySectionProps) {
  const { diaries, loading } = useDiaries(catId);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">日記</h2>
        </div>
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 mt-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">日記</h2>
        <button
          onClick={onAddClick}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          新規作成
        </button>
      </div>

      <div className="space-y-6">
        {diaries.length === 0 ? (
          <p className="text-gray-500 text-center py-4">日記がありません</p>
        ) : (
          diaries.map((diary) => (
            <div key={diary.id} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <Book className="w-6 h-6 text-indigo-600" />
                  <p className="text-sm text-gray-600">{formatDate(diary.date)}</p>
                </div>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{diary.content}</p>
              {diary.photos && diary.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {diary.photos.map((photo, index) => (
                    <img 
                      key={index} 
                      src={photo} 
                      alt="" 
                      className="rounded-lg w-full h-32 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

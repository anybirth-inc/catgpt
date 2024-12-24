import React from 'react';
import { Cat as CatIcon } from 'lucide-react';
import { Cat } from '../../types';
import { getAge } from '../../utils/dateUtils';

interface CatHeaderProps {
  cat: Cat;
}

export function CatHeader({ cat }: CatHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {cat.photos.length > 0 ? (
            <img
              src={cat.photos[0]}
              alt={cat.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <CatIcon className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{cat.name}</h1>
          <div className="mt-1 text-sm text-gray-600">
            <p>年齢: {getAge(cat.birthDate)}</p>
            <p>品種: {cat.breed}</p>
            <p>性別: {cat.gender === 'male' ? 'オス' : 'メス'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
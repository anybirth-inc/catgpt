import React from 'react';
import { Cat } from '../../types';

interface CatSelectorProps {
  cats: Cat[];
  selectedCats: string[];
  onCatSelect: (catId: string) => void;
}

export function CatSelector({ cats, selectedCats, onCatSelect }: CatSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {cats.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCatSelect(cat.id)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedCats.includes(cat.id)
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
import React from 'react';
import { PlusCircle } from 'lucide-react';

export function AddCatButton() {
  return (
    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <PlusCircle className="w-5 h-5 mr-2" />
      猫を追加
    </button>
  );
}
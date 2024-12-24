import React, { useState } from 'react';
import { X } from 'lucide-react';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'weight' | 'temperature' | 'activity';
  title: string;
}

export function RecordModal({ isOpen, onClose, type, title }: RecordModalProps) {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 記録の保存処理
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">日付</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {type === 'activity' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">活動量</label>
              <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">選択してください</option>
                <option value="5">とても活発</option>
                <option value="4">活発</option>
                <option value="3">普通</option>
                <option value="2">おとなしい</option>
                <option value="1">ほとんど動かない</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {type === 'weight' ? '体重 (kg)' : '体温 (℃)'}
              </label>
              <input
                type="number"
                step={type === 'weight' ? '0.1' : '0.1'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            記録する
          </button>
        </form>
      </div>
    </div>
  );
}
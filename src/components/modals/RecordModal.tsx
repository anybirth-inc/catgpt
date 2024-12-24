import React, { useState } from 'react';
import { X } from 'lucide-react';
import { RecordType } from '../../types';
import { useRecords } from '../../hooks/useRecords';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: RecordType;
  title: string;
  catId: string;
}

export function RecordModal({ isOpen, onClose, type, title, catId }: RecordModalProps) {
  const { addRecord } = useRecords(catId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    value: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await addRecord({
        catId,
        type,
        date: formData.date,
        value: formData.value,
        unit: getUnit()
      });

      // フォームをリセット
      setFormData({ date: new Date().toISOString().split('T')[0], value: '' });
      onClose();
    } catch (err) {
      setError('記録の保存に失敗しました');
      console.error('Error saving record:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getUnit = () => {
    switch (type) {
      case 'weight':
        return 'kg';
      case 'food':
        return 'g';
      case 'water':
        return 'ml';
      case 'temperature':
        return '℃';
      default:
        return undefined;
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'activity':
        return (
          <select
            value={formData.value}
            onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">選択してください</option>
            <option value="very_active">とても活発</option>
            <option value="active">活発</option>
            <option value="normal">普通</option>
            <option value="low">おとなしい</option>
            <option value="inactive">ほとんど動かない</option>
          </select>
        );
      default:
        return (
          <input
            type="number"
            step={type === 'temperature' ? '0.1' : '1'}
            value={formData.value}
            onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        );
    }
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
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {type === 'weight' ? '体重 (kg)' :
               type === 'temperature' ? '体温 (℃)' :
               type === 'food' ? '食事量 (g)' :
               type === 'water' ? '飲水量 (ml)' :
               '活動量'}
            </label>
            {renderFormFields()}
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {submitting ? '保存中...' : '記録する'}
          </button>
        </form>
      </div>
    </div>
  );
}
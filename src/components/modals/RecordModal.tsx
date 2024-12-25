import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { RecordType, AMOUNT_OPTIONS, POOP_CONDITION_OPTIONS, ACTIVITY_OPTIONS } from '../../types';
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
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [value, setValue] = useState('');
  const [amount, setAmount] = useState<(typeof AMOUNT_OPTIONS)[number]['value']>(AMOUNT_OPTIONS[1].value);
  const [frequency, setFrequency] = useState(1);
  const [condition, setCondition] = useState<(typeof POOP_CONDITION_OPTIONS)[number]['value']>(POOP_CONDITION_OPTIONS[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    try {
      setIsSubmitting(true);
      await addRecord({
        cat_id: catId,
        type,
        value,
        amount: type === 'urine' || type === 'poop' ? amount : undefined,
        frequency: type === 'urine' || type === 'poop' ? frequency : undefined,
        condition: type === 'poop' ? condition : undefined,
        date
      });
      onClose();
    } catch (error) {
      console.error('Error adding record:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as (typeof AMOUNT_OPTIONS)[number]['value'];
    setAmount(value);
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as (typeof POOP_CONDITION_OPTIONS)[number]['value'];
    setCondition(value);
  };

  const renderFields = () => {
    switch (type) {
      case 'urine':
      case 'poop':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                量
              </label>
              <select
                value={amount}
                onChange={handleAmountChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {AMOUNT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                回数
              </label>
              <input
                type="number"
                min="1"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {type === 'poop' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  形状
                </label>
                <select
                  value={condition}
                  onChange={handleConditionChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {POOP_CONDITION_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        );

      case 'activity':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              活動量
            </label>
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">選択してください</option>
              {ACTIVITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'food':
      case 'water':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'food' ? '食事量 (g)' : '飲水量 (ml)'}
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        );

      case 'weight':
      case 'temperature':
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'weight' ? '体重 (kg)' : '体温 (℃)'}
            </label>
            <input
              type="number"
              step={type === 'weight' ? '0.1' : '0.1'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日付
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            {renderFields()}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? '保存中...' : '記録する'}
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
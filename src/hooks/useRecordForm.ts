import { useState, FormEvent, ChangeEvent } from 'react';
import { RecordType, Record } from '../types';
import { useRecords } from './useRecords';

interface FormData {
  date: string;
  weight?: number;
  activity?: string;
  foodAmount?: number;
  waterAmount?: number;
  temperature?: number;
}

export function useRecordForm(type: RecordType, catId: string, onClose: () => void) {
  const { addRecord } = useRecords(catId);
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const record: Record = {
        catId,
        type,
        date: formData.date,
        value: getValue(),
        unit: getUnit()
      };

      addRecord(record);
      onClose();
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };

  const getValue = () => {
    switch (type) {
      case 'weight':
        return formData.weight || 0;
      case 'activity':
        return formData.activity || '';
      case 'food':
        return formData.foodAmount || 0;
      case 'water':
        return formData.waterAmount || 0;
      case 'temperature':
        return formData.temperature || 0;
      default:
        return 0;
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

  return {
    formData,
    handleChange,
    handleSubmit
  };
}
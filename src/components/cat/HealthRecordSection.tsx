import React from 'react';
import { Droplet, UtensilsCrossed, Thermometer } from 'lucide-react';
import { RecordType } from '../../types';
import { useRecords } from '../../hooks/useRecords';
import { formatRecord } from '../../utils/formatRecord';

interface HealthRecordSectionProps {
  catId: string;
  onRecordClick: (type: RecordType, title: string) => void;
}

export function HealthRecordSection({ catId, onRecordClick }: HealthRecordSectionProps) {
  const { getLatestRecord, loading } = useRecords(catId);

  const records = [
    {
      icon: UtensilsCrossed,
      title: '食事・飲水',
      type: 'food' as RecordType,
      getLastRecord: () => {
        const foodRecord = getLatestRecord('food');
        const waterRecord = getLatestRecord('water');
        return {
          food: foodRecord ? formatRecord(foodRecord) : '記録なし',
          water: waterRecord ? formatRecord(waterRecord) : '記録なし'
        };
      }
    },
    {
      icon: Thermometer,
      title: '体温',
      type: 'temperature' as RecordType,
      getLastRecord: () => {
        const record = getLatestRecord('temperature');
        return record ? formatRecord(record) : '記録なし';
      }
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow-md animate-pulse">
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {records.map((record) => (
        <button
          key={record.title}
          onClick={() => onRecordClick(record.type, `${record.title}を記録`)}
          className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <record.icon className="w-6 h-6 text-indigo-600" />
          <div className="flex-1 text-left">
            <h3 className="font-medium">{record.title}</h3>
            {record.type === 'food' ? (
              <>
                <p className="text-sm text-gray-600">
                  食事: {record.getLastRecord().food}
                </p>
                <p className="text-sm text-gray-600">
                  飲水: {record.getLastRecord().water}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                最新: {record.getLastRecord()}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
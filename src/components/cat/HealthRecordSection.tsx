import React from 'react';
import { Scale, Droplets, Activity, Thermometer, UtensilsCrossed } from 'lucide-react';
import { RecordType, AMOUNT_OPTIONS, POOP_CONDITION_OPTIONS, ACTIVITY_OPTIONS } from '../../types';
import { useRecords } from '../../hooks/useRecords';

interface HealthRecordSectionProps {
  catId: string;
  onRecordClick: (type: RecordType, title: string) => void;
}

export function HealthRecordSection({ catId, onRecordClick }: HealthRecordSectionProps) {
  const { getLatestRecord } = useRecords(catId);

  const formatRecordValue = (type: RecordType, record: any) => {
    if (!record) return '未記録';

    switch (type) {
      case 'weight':
        return `${record.value}kg`;
      case 'food':
        return `${record.value}g`;
      case 'water':
        return `${record.value}ml`;
      case 'temperature':
        return `${record.value}℃`;
      case 'activity':
        const activityLabel = ACTIVITY_OPTIONS.find(opt => opt.value === record.value)?.label;
        return activityLabel || '未記録';
      case 'urine':
      case 'poop':
        const amountLabel = AMOUNT_OPTIONS.find(opt => opt.value === record.amount)?.label;
        const conditionLabel = record.condition ? 
          POOP_CONDITION_OPTIONS.find(opt => opt.value === record.condition)?.label : '';
        return [
          amountLabel,
          record.frequency ? `${record.frequency}回` : '',
          conditionLabel
        ].filter(Boolean).join(' / ');
      default:
        return record.value || '未記録';
    }
  };

  const recordItems = [
    {
      icon: Scale,
      title: '体重',
      type: 'weight' as RecordType,
      getLastRecord: () => formatRecordValue('weight', getLatestRecord('weight'))
    },
    {
      icon: UtensilsCrossed,
      title: '食事量',
      type: 'food' as RecordType,
      getLastRecord: () => formatRecordValue('food', getLatestRecord('food'))
    },
    {
      icon: Droplets,
      title: '飲水量',
      type: 'water' as RecordType,
      getLastRecord: () => formatRecordValue('water', getLatestRecord('water'))
    },
    {
      icon: Activity,
      title: '活動量',
      type: 'activity' as RecordType,
      getLastRecord: () => formatRecordValue('activity', getLatestRecord('activity'))
    },
    {
      icon: Thermometer,
      title: '体温',
      type: 'temperature' as RecordType,
      getLastRecord: () => formatRecordValue('temperature', getLatestRecord('temperature'))
    },
    {
      icon: Droplets,
      title: 'おしっこ',
      type: 'urine' as RecordType,
      getLastRecord: () => formatRecordValue('urine', getLatestRecord('urine'))
    },
    {
      icon: Activity,
      title: 'うんち',
      type: 'poop' as RecordType,
      getLastRecord: () => formatRecordValue('poop', getLatestRecord('poop'))
    }
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {recordItems.map((record) => (
          <button
            key={record.title}
            onClick={() => onRecordClick(record.type, `${record.title}を記録`)}
            className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition-colors text-left relative overflow-hidden group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <record.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="font-medium text-gray-900">{record.title}</h3>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">最新の記録</span>
              <p className="text-base font-medium text-gray-800 break-words">
                {record.getLastRecord()}
              </p>
            </div>
            <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-5 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}

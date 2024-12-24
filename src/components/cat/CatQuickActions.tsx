import React from 'react';
import { Activity, Scale } from 'lucide-react';
import { RecordType } from '../../types';
import { useRecords } from '../../hooks/useRecords';
import { formatRecord } from '../../utils/formatRecord';

interface CatQuickActionsProps {
  catId: string;
  onRecordClick: (type: RecordType, title: string) => void;
}

export function CatQuickActions({ catId, onRecordClick }: CatQuickActionsProps) {
  const { getLatestRecord, loading } = useRecords(catId);

  const actions = [
    {
      icon: Scale,
      title: '体重を記録',
      type: 'weight' as RecordType,
      getLastRecord: () => formatRecord(getLatestRecord('weight'))
    },
    {
      icon: Activity,
      title: '活動量を記録',
      type: 'activity' as RecordType,
      getLastRecord: () => formatRecord(getLatestRecord('activity'))
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
      {actions.map((action) => (
        <button
          key={action.type}
          onClick={() => onRecordClick(action.type, action.title)}
          className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-3 hover:bg-gray-50 transition-colors"
        >
          <action.icon className="w-6 h-6 text-indigo-600" />
          <div className="flex-1 text-left">
            <h3 className="font-medium">{action.title}</h3>
            <p className="text-sm text-gray-600">最新: {action.getLastRecord()}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
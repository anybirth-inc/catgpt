import React from 'react';
import { Activity, AlertTriangle, Scale, Droplets } from 'lucide-react';
import { RecordType } from '../../types';

interface CatQuickActionsProps {
  catId: string;
  onRecordClick: (type: RecordType, title: string) => void;
}

export function CatQuickActions({ catId, onRecordClick }: CatQuickActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4">
      {/* 健康な猫 */}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Activity className="w-8 h-8 text-green-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">健康な猫</p>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      {/* 注意が必要な猫 */}
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">注意が必要な猫</p>
          <p className="text-2xl font-bold">1</p>
        </div>
      </div>

      {/* 未記録の体重測定 */}
      <div 
        className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50"
        onClick={() => onRecordClick('weight', '体重を記録')}
      >
        <div className="flex-shrink-0">
          <Scale className="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">未記録の体重測定</p>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      {/* 今日の飲水量 */}
      <div 
        className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-50"
        onClick={() => onRecordClick('water', '飲水量を記録')}
      >
        <div className="flex-shrink-0">
          <Droplets className="w-8 h-8 text-cyan-500" />
        </div>
        <div>
          <p className="text-sm text-gray-600">今日の飲水量</p>
          <p className="text-2xl font-bold">未記録</p>
        </div>
      </div>
    </div>
  );
}

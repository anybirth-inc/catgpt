import React from 'react';
import { Cat } from '../types';
import { AlertTriangle, Activity, Scale, Droplet } from 'lucide-react';

interface DashboardSummaryProps {
  cats: Cat[];
  pendingRecords: number;
}

export function DashboardSummary({ cats, pendingRecords }: DashboardSummaryProps) {
  const warningCats = cats.filter(cat => cat.healthStatus !== 'healthy').length;

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="bg-green-50 p-2 rounded-lg mr-3">
            <Activity className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">健康な猫</p>
            <p className="text-xl font-semibold">{cats.length - warningCats}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="bg-yellow-50 p-2 rounded-lg mr-3">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">注意が必要な猫</p>
            <p className="text-xl font-semibold">{warningCats}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="bg-blue-50 p-2 rounded-lg mr-3">
            <Scale className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">未記録の体重測定</p>
            <p className="text-xl font-semibold">{pendingRecords}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="bg-cyan-50 p-2 rounded-lg mr-3">
            <Droplet className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">今日の飲水量</p>
            <p className="text-xl font-semibold">未記録</p>
          </div>
        </div>
      </div>
    </div>
  );
}
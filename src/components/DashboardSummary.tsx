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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Activity className="w-8 h-8 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">健康な猫</p>
            <p className="text-2xl font-semibold">{cats.length - warningCats}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <AlertTriangle className="w-8 h-8 text-yellow-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">注意が必要な猫</p>
            <p className="text-2xl font-semibold">{warningCats}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Scale className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">未記録の体重測定</p>
            <p className="text-2xl font-semibold">{pendingRecords}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Droplet className="w-8 h-8 text-cyan-500 mr-3" />
          <div>
            <p className="text-sm text-gray-600">今日の飲水量</p>
            <p className="text-2xl font-semibold">未記録</p>
          </div>
        </div>
      </div>
    </div>
  );
}
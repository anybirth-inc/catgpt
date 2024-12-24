import React from 'react';
import { WeightChart } from '../components/charts/WeightChart';
import { ActivityChart } from '../components/charts/ActivityChart';

export function Statistics() {
  const stats = [
    { label: '平均体重', value: '4.3kg' },
    { label: '平均活動量', value: '3.8/5' },
    { label: '記録日数', value: '124日' },
    { label: '継続率', value: '92%' },
  ];

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold mb-6">統計</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">全体の体重推移</h2>
          <WeightChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">全体の活動量推移</h2>
          <ActivityChart />
        </div>
      </div>
    </div>
  );
}
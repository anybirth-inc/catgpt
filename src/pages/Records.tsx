import React, { useState } from 'react';
import { RecordTabs } from '../components/records/RecordTabs';
import { DateRangeSelector } from '../components/records/DateRangeSelector';
import { CatSelector } from '../components/records/CatSelector';
import { WeightChart } from '../components/charts/WeightChart';
import { ActivityChart } from '../components/charts/ActivityChart';
import { ToiletChart } from '../components/charts/ToiletChart';
import { FoodWaterChart } from '../components/charts/FoodWaterChart';
import { TemperatureChart } from '../components/charts/TemperatureChart';

const mockCats = [
  { id: '1', name: 'ルナ', color: '#4F46E5' },
  { id: '2', name: 'ミロ', color: '#10B981' }
];

const tabs = [
  '体重',
  '活動量',
  'トイレ',
  '食事・飲水',
  '体温'
];

export function Records() {
  const [selectedCats, setSelectedCats] = useState<string[]>([mockCats[0].id]);
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [startDate, setStartDate] = useState('2024-03-01');
  const [endDate, setEndDate] = useState('2024-03-07');

  const handleCatSelect = (catId: string) => {
    setSelectedCats(prev =>
      prev.includes(catId)
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="pb-20 px-4">
      <h1 className="text-2xl font-bold mb-6">記録</h1>

      <div className="space-y-4 mb-6">
        <CatSelector
          cats={mockCats}
          selectedCats={selectedCats}
          onCatSelect={handleCatSelect}
        />

        <div className="bg-white rounded-lg shadow-md p-4">
          <DateRangeSelector
            range={dateRange}
            onRangeChange={setDateRange}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
        <RecordTabs tabs={tabs}>
          <WeightChart
            selectedCats={selectedCats}
            startDate={startDate}
            endDate={endDate}
          />
          <ActivityChart
            selectedCats={selectedCats}
            startDate={startDate}
            endDate={endDate}
          />
          <ToiletChart
            selectedCats={selectedCats}
            startDate={startDate}
            endDate={endDate}
          />
          <FoodWaterChart
            selectedCats={selectedCats}
            startDate={startDate}
            endDate={endDate}
          />
          <TemperatureChart
            selectedCats={selectedCats}
            startDate={startDate}
            endDate={endDate}
          />
        </RecordTabs>
      </div>
    </div>
  );
}
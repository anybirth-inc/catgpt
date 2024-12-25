import React from 'react';

interface DateRangeSelectorProps {
  range: 'day' | 'week' | 'month' | 'year';
  onRangeChange: (range: 'day' | 'week' | 'month' | 'year') => void;
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
}

export function DateRangeSelector({
  range,
  onRangeChange,
  startDate,
  endDate,
  onDateChange
}: DateRangeSelectorProps) {
  return (
    <div className="space-y-4">
      {/* 期間選択ボタン */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 w-fit">
        {(['day', 'week', 'month', 'year'] as const).map((value) => (
          <button
            key={value}
            onClick={() => onRangeChange(value)}
            className={`px-4 py-2 text-sm ${
              range === value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {{
              day: '日',
              week: '週',
              month: '月',
              year: '年'
            }[value]}
          </button>
        ))}
      </div>

      {/* 日付選択 */}
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onDateChange(e.target.value, endDate)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span className="text-gray-500">〜</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onDateChange(startDate, e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
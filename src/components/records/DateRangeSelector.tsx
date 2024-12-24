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
  onDateChange,
}: DateRangeSelectorProps) {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex rounded-md shadow-sm">
        {(['day', 'week', 'month', 'year'] as const).map((value) => (
          <button
            key={value}
            onClick={() => onRangeChange(value)}
            className={`px-4 py-2 text-sm font-medium ${
              range === value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } ${
              value === 'day'
                ? 'rounded-l-md'
                : value === 'year'
                ? 'rounded-r-md'
                : ''
            } border`}
          >
            {value === 'day' && '日'}
            {value === 'week' && '週'}
            {value === 'month' && '月'}
            {value === 'year' && '年'}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onDateChange(e.target.value, endDate)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <span>〜</span>
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
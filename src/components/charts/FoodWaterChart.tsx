import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { date: '2024-03-01', food: 200, water: 150, catId: '1' },
  { date: '2024-03-02', food: 180, water: 160, catId: '1' },
  { date: '2024-03-03', food: 220, water: 140, catId: '1' },
];

interface FoodWaterChartProps {
  selectedCats: string[];
  startDate: string;
  endDate: string;
}

export function FoodWaterChart({ selectedCats, startDate, endDate }: FoodWaterChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="食事 (g)" type="monotone" dataKey="food" stroke="#10B981" strokeWidth={2} />
          <Line name="飲水 (ml)" type="monotone" dataKey="water" stroke="#60A5FA" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
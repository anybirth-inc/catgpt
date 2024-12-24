import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { date: '2024-03-01', temperature: 38.2, catId: '1' },
  { date: '2024-03-02', temperature: 38.1, catId: '1' },
  { date: '2024-03-03', temperature: 38.3, catId: '1' },
];

interface TemperatureChartProps {
  selectedCats: string[];
  startDate: string;
  endDate: string;
}

export function TemperatureChart({ selectedCats, startDate, endDate }: TemperatureChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[37, 40]} />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
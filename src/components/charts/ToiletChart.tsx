import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockData = [
  { date: '2024-03-01', urine: 3, stool: 2, catId: '1' },
  { date: '2024-03-02', urine: 4, stool: 1, catId: '1' },
  { date: '2024-03-03', urine: 3, stool: 2, catId: '1' },
];

interface ToiletChartProps {
  selectedCats: string[];
  startDate: string;
  endDate: string;
}

export function ToiletChart({ selectedCats, startDate, endDate }: ToiletChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Legend />
          <Bar name="おしっこ" dataKey="urine" fill="#60A5FA" />
          <Bar name="うんち" dataKey="stool" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
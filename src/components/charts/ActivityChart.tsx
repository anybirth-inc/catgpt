import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-03-01', level: 5 },
  { date: '2024-03-02', level: 3 },
  { date: '2024-03-03', level: 4 },
  { date: '2024-03-04', level: 5 },
  { date: '2024-03-05', level: 2 },
];

export function ActivityChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Bar dataKey="level" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
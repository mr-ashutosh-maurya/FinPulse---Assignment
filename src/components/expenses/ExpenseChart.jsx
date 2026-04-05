import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from '../layout/Card';
import { TrendingDown } from 'lucide-react';

export const ExpenseChart = ({ monthlyData, categoryData }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <TrendingDown size={20} className="text-rose-600" />
          Expense Trends
        </h3>
      </div>
      
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Expenses']}
            />
            <Bar dataKey="amount" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
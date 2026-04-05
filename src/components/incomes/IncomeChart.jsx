import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card } from '../layout/Card';
import { TrendingUp } from 'lucide-react';

export const IncomeChart = ({ monthlyData, trend }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <TrendingUp size={20} className="text-emerald-600" />
          Income Trend
        </h3>
        {trend && (
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            trend.trend === 'increasing' 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {trend.trend === 'increasing' ? '↑' : '↓'} {trend.percentageChange.toFixed(1)}% trend
          </div>
        )}
      </div>
      
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Income']}
            />
            <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
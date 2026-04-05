import React, { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Card } from '../layout/Card';
import { formatShortDate } from '../../utils/formatters';

export const BalanceChart = ({ transactions }) => {
  const chartData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
    let balance = 0;
    return sorted.map(t => {
      balance += t.type === 'income' ? t.amount : -t.amount;
      return {
        date: formatShortDate(t.date),
        balance
      };
    });
  }, [transactions]);

  return (
    <Card className="lg:col-span-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Balance Trend
        </h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Balance']}
            />
            <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
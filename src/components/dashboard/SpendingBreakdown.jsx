import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../layout/Card';
import { CHART_COLORS } from '../../utils/constants';
import { formatCurrency } from '../../utils/helpers';

export const SpendingBreakdown = ({ transactions }) => {
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (categoryData.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-6">Spending Breakdown</h3>
        <p className="text-center text-slate-400 py-8">No expense data available</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-6">Spending Breakdown</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => formatCurrency(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {categoryData.slice(0, 4).map((item, idx) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
              <span className="text-slate-600">{item.name}</span>
            </div>
            <span className="font-medium">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
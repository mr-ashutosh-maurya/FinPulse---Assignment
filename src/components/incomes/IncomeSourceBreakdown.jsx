import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../layout/Card';
import { INCOME_COLORS } from '../../utils/incomeHelpers';

export const IncomeSourceBreakdown = ({ sourceData }) => {
  if (sourceData.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-6">Income Sources</h3>
        <p className="text-center text-slate-400 py-8">No income data available</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-6">Income Sources</h3>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sourceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              // label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={true}
            >
              {sourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={INCOME_COLORS[entry.name] || INCOME_COLORS['Other Income']} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
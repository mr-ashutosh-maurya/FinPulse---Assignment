import React from 'react';
import { Card } from '../layout/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const MonthlyComparison = ({ currentMonthTotal, previousMonthTotal }) => {
  const difference = currentMonthTotal - previousMonthTotal;
  const percentageChange = previousMonthTotal > 0 ? (difference / previousMonthTotal) * 100 : 0;
  const isIncrease = difference > 0;

  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4">Monthly Comparison</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-slate-500">This Month</p>
            <p className="text-2xl font-bold text-slate-900">${currentMonthTotal.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Last Month</p>
            <p className="text-lg font-semibold text-slate-600">${previousMonthTotal.toFixed(2)}</p>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 p-3 rounded-lg ${isIncrease ? 'bg-rose-50' : 'bg-emerald-50'}`}>
          {isIncrease ? (
            <TrendingUp size={20} className="text-rose-600" />
          ) : (
            <TrendingDown size={20} className="text-emerald-600" />
          )}
          <span className={`text-sm font-medium ${isIncrease ? 'text-rose-600' : 'text-emerald-600'}`}>
            {isIncrease ? 'Increased' : 'Decreased'} by {Math.abs(percentageChange).toFixed(1)}% compared to last month
          </span>
        </div>
      </div>
    </Card>
  );
};
import React from 'react';
import { Card } from '../layout/Card';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export const MonthlyIncomeComparison = ({ currentMonthTotal, previousMonthTotal, monthlyGrowth }) => {
  const difference = currentMonthTotal - previousMonthTotal;
  const percentageChange = previousMonthTotal > 0 ? (difference / previousMonthTotal) * 100 : 0;
  const isIncrease = difference > 0;

  return (
    <Card className="p-6">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <Calendar size={20} className="text-blue-600" />
        Monthly Comparison
      </h3>
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
        
        <div className={`flex items-center gap-2 p-3 rounded-lg ${isIncrease ? 'bg-emerald-50' : 'bg-red-50'}`}>
          {isIncrease ? (
            <TrendingUp size={20} className="text-emerald-600" />
          ) : (
            <TrendingDown size={20} className="text-red-600" />
          )}
          <span className={`text-sm font-medium ${isIncrease ? 'text-emerald-600' : 'text-red-600'}`}>
            {isIncrease ? 'Increased' : 'Decreased'} by {Math.abs(percentageChange).toFixed(1)}% compared to last month
          </span>
        </div>

        {monthlyGrowth !== 0 && (
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-1">Overall Growth Rate</p>
            <p className={`text-lg font-bold ${monthlyGrowth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {monthlyGrowth > 0 ? '+' : ''}{monthlyGrowth.toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
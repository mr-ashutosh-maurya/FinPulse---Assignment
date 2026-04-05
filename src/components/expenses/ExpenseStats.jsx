import React from 'react';
import { TrendingDown, DollarSign, ShoppingBag, AlertCircle } from 'lucide-react';
import { Card } from '../layout/Card';

export const ExpenseStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Expenses',
      value: `$${stats.totalExpenses.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-rose-600 bg-rose-50',
      trend: `${stats.transactionCount} transactions`
    },
    // {
    //   title: 'Average Expense',
    //   value: `$${stats.averageExpense.toFixed(2)}`,
    //   icon: TrendingDown,
    //   color: 'text-orange-600 bg-orange-50',
    //   trend: 'per transaction'
    // },
    {
      title: 'Highest Expense',
      value: `$${stats.highestExpense.toFixed(2)}`,
      icon: ShoppingBag,
      color: 'text-purple-600 bg-purple-50',
      trend: 'largest single expense'
    },
    {
      title: 'Income Ratio',
      value: `${stats.expensePercentageOfIncome.toFixed(1)}%`,
      icon: AlertCircle,
      color: stats.expensePercentageOfIncome > 50 ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50',
      trend: stats.expensePercentageOfIncome > 50 ? 'High spending alert' : 'Healthy ratio'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
      {statCards.map((stat, idx) => (
        <Card key={idx} className="p-6 flex justify-between">
          <div>
            <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{stat.trend}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className={stat.color + " p-3 rounded-xl"}>
              <stat.icon size={24} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
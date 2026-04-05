import React from 'react';
import { TrendingUp, DollarSign, Award, PiggyBank } from 'lucide-react';
import { Card } from '../layout/Card';

export const IncomeStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Income',
      value: `$${stats.totalIncome.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-emerald-600 bg-emerald-50',
      trend: `${stats.transactionCount} transactions`
    },
    {
      title: 'Highest Income',
      value: `$${stats.highestIncome.toFixed(2)}`,
      icon: Award,
      color: 'text-purple-600 bg-purple-50',
      trend: 'largest single source'
    },
    {
      title: 'Savings Rate',
      value: `${stats.savingsRate.toFixed(1)}%`,
      icon: PiggyBank,
      color: stats.savingsRate > 20 ? 'text-emerald-600 bg-emerald-50' : 'text-yellow-600 bg-yellow-50',
      trend: stats.savingsRate > 20 ? 'Excellent savings!' : 'Consider saving more'
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
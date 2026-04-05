import React from 'react';
import { cn } from '../../utils/helpers';
import { Card } from '../layout/Card';
import { formatCurrency } from '../../utils/helpers';

export const SummaryCard = ({ title, amount, icon: Icon, type }) => {
  const colors = {
    balance: "text-blue-600 bg-blue-50",
    income: "text-emerald-600 bg-emerald-50",
    expense: "text-rose-600 bg-rose-50"
  };

  return (
    <Card className="p-6 hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900">
            {formatCurrency(amount)}
          </h3>
        </div>
        <div className={cn("p-3 rounded-xl", colors[type])}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};
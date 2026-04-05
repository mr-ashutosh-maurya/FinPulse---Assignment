import React from 'react';
import { EXPENSE_COLORS } from '../../utils/expenseHelpers';

export const CategoryPill = ({ category, amount, showAmount = false }) => {
  const color = EXPENSE_COLORS[category] || EXPENSE_COLORS.Other;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-sm text-slate-600">{category}</span>
      </div>
      {showAmount && amount && (
        <span className="text-sm font-medium text-slate-900">
          ${amount.toFixed(2)}
        </span>
      )}
    </div>
  );
};
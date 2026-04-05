import React, { useMemo } from 'react';
import { Card } from '../layout/Card';
import { formatCurrency } from '../../utils/helpers';

export const InsightsPanel = ({ transactions }) => {
  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    if (expenses.length === 0) return null;

    const categories = {};
    expenses.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

    const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    const avgExpense = expenses.reduce((acc, t) => acc + t.amount, 0) / expenses.length;

    return {
      topCategory: topCategory[0],
      topAmount: topCategory[1],
      avgExpense
    };
  }, [transactions]);

  return (
    <>
      <Card className="p-6 bg-blue-600 text-white border-none">
        <h3 className="font-bold text-lg mb-4 border-b border-gray-300 pb-2">Quick Insights</h3>
        {insights ? (
          <div className="space-y-4">
            <div>
              <p className="text-blue-100 text-sm">Highest Spending</p>
              <p className="text-xl font-bold">{insights.topCategory}</p>
              <p className="text-blue-200 text-xs mt-1">{formatCurrency(insights.topAmount)} total</p>
            </div>
            <div className="pt-4 border-t border-blue-500/30">
              <p className="text-blue-100 text-sm">Avg. Transaction</p>
              <p className="text-xl font-bold">{formatCurrency(insights.avgExpense)}</p>
            </div>
          </div>
        ) : (
          <p className="text-blue-100 text-sm">No expense data yet.</p>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Tips</h3>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            Try to keep food expenses below 15% of your income.
          </li>
          <li className="flex gap-2">
            <span className="text-blue-600">•</span>
            Your balance trend is looking positive this week!
          </li>
        </ul>
      </Card>
    </>
  );
};
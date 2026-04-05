import React from 'react';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';
import { INCOME_COLORS } from '../../utils/incomeHelpers';

export const IncomeTable = ({ incomes, onEdit, onDelete }) => {

  if (incomes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-400">No income records found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Source</th>
              <th className="px-6 py-4 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {incomes.map((income) => (
              <tr key={income.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 text-sm text-slate-500">
                  {format(parseISO(income.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{income.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span 
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${INCOME_COLORS[income.category]}20`,
                      color: INCOME_COLORS[income.category]
                    }}
                  >
                    {income.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-right text-emerald-600">
                  +${income.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
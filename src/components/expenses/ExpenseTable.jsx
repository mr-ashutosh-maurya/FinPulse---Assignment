import React from 'react';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';
import { Trash2, Edit } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { USER_ROLES } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext';

export const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const { role } = useAppContext();

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-400">No expenses found matching your criteria</p>
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
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold text-right">Amount</th>
              {/* {role === USER_ROLES.ADMIN && <th className="px-6 py-4 font-semibold text-right">Actions</th>} */}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 text-sm text-slate-500">
                  {format(parseISO(expense.date), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">{expense.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-medium">
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-right text-rose-600">
                  -${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                {/* {role === USER_ROLES.ADMIN && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(expense)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(expense.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                )} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
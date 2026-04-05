import React from 'react';
import { motion } from 'framer-motion';
import { Pencil, X } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { formatDate } from '../../utils/formatters';
import { formatCurrency } from '../../utils/helpers';
import { USER_ROLES } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext';

export const TransactionRow = ({ transaction, onEdit, onDelete }) => {
  const { role } = useAppContext();

  return (
    <motion.tr 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-slate-50/80 transition-colors group"
    >
      <td className="px-6 py-4 text-sm text-slate-500">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-slate-900">{transaction.description}</p>
      </td>
      <td className="px-6 py-4">
        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
          {transaction.category}
        </span>
      </td>
      <td className={cn(
        "px-6 py-4 text-sm font-bold text-right",
        transaction.type === 'income' ? "text-emerald-600" : "text-rose-600"
      )}>
        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
      </td>
      {role === USER_ROLES.ADMIN && (
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(transaction)}
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Pencil size={16} />
            </button>
            <button 
              onClick={() => onDelete(transaction.id)}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </td>
      )}
    </motion.tr>
  );
};
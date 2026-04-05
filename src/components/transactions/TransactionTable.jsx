import React from 'react';
import { ReceiptText } from 'lucide-react';
import { Card } from '../layout/Card';
import { TransactionFilters } from './TransactionFilters';
import { TransactionRow } from './TransactionRow';
import { USER_ROLES } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext';

export const TransactionTable = ({ 
  transactions, 
  searchTerm, 
  onSearchChange,
  filterType,
  onFilterChange,
  onExport,
  onReset,
  onAdd,
  onEdit,
  onDelete
}) => {
  const { role } = useAppContext();

  return (
    <Card className="lg:col-span-3">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ReceiptText size={20} className="text-slate-400" />
          <h3 className="font-bold text-lg">Transactions</h3>
        </div>
        
        <TransactionFilters 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          filterType={filterType}
          onFilterChange={onFilterChange}
          onExport={onExport}
          onReset={onReset}
          onAdd={onAdd}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold text-right">Amount</th>
              {role === USER_ROLES.ADMIN && <th className="px-6 py-4 font-semibold text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TransactionRow 
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan={role === USER_ROLES.ADMIN ? 5 : 4} className="px-6 py-12 text-center text-slate-400 italic">
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
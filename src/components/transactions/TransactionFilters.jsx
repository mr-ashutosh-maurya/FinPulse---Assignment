import React from 'react';
import { Search, Download, RotateCcw, Plus } from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext';

export const TransactionFilters = ({ 
  searchTerm, 
  onSearchChange, 
  filterType, 
  onFilterChange,
  onExport,
  onReset,
  onAdd 
}) => {
  const { role } = useAppContext();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button 
        onClick={onExport}
        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
        title="Export to CSV"
      >
        <Download size={20} />
      </button>
      {role === USER_ROLES.ADMIN && (
        <button 
          onClick={onReset}
          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Reset to Defaults"
        >
          <RotateCcw size={20} />
        </button>
      )}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
        />
      </div>
      <select 
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
        className="px-3 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      {role === USER_ROLES.ADMIN && (
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Plus size={18} />
          Add
        </button>
      )}
    </div>
  );
};
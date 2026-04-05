import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '../../utils/expenseHelpers';

export const ExpenseFilters = ({ 
  searchTerm, 
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  minAmount,
  onMinAmountChange,
  maxAmount,
  onMaxAmountChange
}) => {
  const categories = ['All', ...Object.values(EXPENSE_CATEGORIES)];
  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'amount_desc', label: 'Highest Amount' },
    { value: 'amount_asc', label: 'Lowest Amount' },
    { value: 'category_asc', label: 'Category A-Z' }
  ];

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || minAmount || maxAmount;

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('All');
    onMinAmountChange('');
    onMaxAmountChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex-1 min-w-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Amount Range */}
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={minAmount}
            onChange={(e) => onMinAmountChange(e.target.value)}
            className="w-28 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            placeholder="Max $"
            value={maxAmount}
            onChange={(e) => onMaxAmountChange(e.target.value)}
            className="w-28 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <X size={18} />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};
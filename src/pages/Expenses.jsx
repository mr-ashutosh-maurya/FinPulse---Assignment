import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTransactions } from '../hooks/useTransactions';
import { useDateRange } from '../hooks/useDateRange';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseStats } from '../components/expenses/ExpenseStats';
import { ExpenseFilters } from '../components/expenses/ExpenseFilters';
import { ExpenseChart } from '../components/expenses/ExpenseChart';
import { CategoryBreakdown } from '../components/expenses/CategoryBreakdown';
import { MonthlyComparison } from '../components/expenses/MonthlyComparison';
import { ExpenseTable } from '../components/expenses/ExpenseTable';
import { ExpenseAlert } from '../components/expenses/ExpenseAlert';
import { DateRangePicker } from '../components/common/DateRangePicker';
import { groupExpensesByMonth, getTopExpenses, getRecurringExpenses } from '../utils/expenseHelpers';
import { Card } from '../components/layout/Card';
import { ArrowLeft, TrendingUp, Repeat } from 'lucide-react';

const Expenses = ({ onNavigate }) => {
  const { setEditingTransaction, setIsModalOpen } = useAppContext();
  const { transactions, deleteTransaction } = useTransactions();
  const { dateRange, activeRange, setRange, setCustomRange } = useDateRange();
  const { expenses, categoryData, stats } = useExpenses(transactions, dateRange);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // Process and sort expenses
  const processedExpenses = useMemo(() => {
    let filtered = [...expenses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(exp => 
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(exp => exp.category === selectedCategory);
    }

    // Amount range filter
    if (minAmount) {
      filtered = filtered.filter(exp => exp.amount >= parseFloat(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter(exp => exp.amount <= parseFloat(maxAmount));
    }

    // Sorting
    switch(sortBy) {
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount_desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount_asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case 'category_asc':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default: // date_desc
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [expenses, searchTerm, selectedCategory, sortBy, minAmount, maxAmount]);

  // Monthly data for chart
  const monthlyData = useMemo(() => {
    return groupExpensesByMonth(expenses);
  }, [expenses]);

  // Top expenses
  const topExpenses = useMemo(() => {
    return getTopExpenses(expenses, 5);
  }, [expenses]);

  // Recurring expenses
  const recurringExpenses = useMemo(() => {
    return getRecurringExpenses(expenses);
  }, [expenses]);

  // Monthly comparison data
  const monthlyComparison = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);

    const lastMonthExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === lastMonth && expDate.getFullYear() === lastMonthYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);

    return { currentMonth: currentMonthExpenses, lastMonth: lastMonthExpenses };
  }, [expenses]);

  const handleEdit = (expense) => {
    setEditingTransaction(expense);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center md:justify-end">

            <DateRangePicker dateRange={dateRange} onRangeChange={setRange} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Budget Alert */}
        <ExpenseAlert expenses={expenses} budgetLimit={1500} />

        {/* Stats Cards */}
        <ExpenseStats stats={stats} />


        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ExpenseChart monthlyData={monthlyData} categoryData={categoryData} />
          </div>
          <div className="space-y-6">
            <CategoryBreakdown categoryData={categoryData} />
          </div>                                
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Expenses */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={20} className="text-rose-600" />
              <h3 className="font-bold text-lg">Top Expenses</h3>
            </div>
            <div className="space-y-3">
              {topExpenses.map((expense, idx) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{expense.description}</p>
                    <p className="text-xs text-slate-500">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-rose-600">${expense.amount.toFixed(2)}</p>
                    <p className="text-xs text-slate-400">{new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              {topExpenses.length === 0 && (
                <p className="text-center text-slate-400 py-4">No expenses recorded</p>
              )}
            </div>
          </Card>

          {/* Recurring Expenses */}
            <MonthlyComparison 
              currentMonthTotal={monthlyComparison.currentMonth}
              previousMonthTotal={monthlyComparison.lastMonth}
            />                
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ExpenseFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            minAmount={minAmount}
            onMinAmountChange={setMinAmount}
            maxAmount={maxAmount}
            onMaxAmountChange={setMaxAmount}
          />
        </div>

        {/* Expenses Table */}
        <div>
          <h3 className="font-bold text-lg mb-4">All Expenses</h3>
          <ExpenseTable 
            expenses={processedExpenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
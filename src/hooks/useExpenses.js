import { useMemo } from 'react';
import { filterExpensesByDateRange, groupExpensesByCategory, calculateExpenseStats } from '../utils/expenseHelpers';

export const useExpenses = (transactions, dateRange) => {
  const expenses = useMemo(() => {
    return transactions.filter(t => t.type === 'expense');
  }, [transactions]);

  const filteredExpenses = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) return expenses;
    return filterExpensesByDateRange(expenses, dateRange.startDate, dateRange.endDate);
  }, [expenses, dateRange]);

  const categoryData = useMemo(() => {
    return groupExpensesByCategory(filteredExpenses);
  }, [filteredExpenses]);

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    return calculateExpenseStats(filteredExpenses, totalIncome);
  }, [filteredExpenses, transactions]);

  return {
    expenses: filteredExpenses,
    allExpenses: expenses,
    categoryData,
    stats
  };
};
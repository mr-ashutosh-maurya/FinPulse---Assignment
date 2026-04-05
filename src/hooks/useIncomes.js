import { useMemo } from 'react';
import { filterIncomesByDateRange, groupIncomesBySource, calculateIncomeStats } from '../utils/incomeHelpers';

export const useIncomes = (transactions, dateRange) => {
  const incomes = useMemo(() => {
    return transactions.filter(t => t.type === 'income');
  }, [transactions]);

  const filteredIncomes = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate) return incomes;
    return filterIncomesByDateRange(incomes, dateRange.startDate, dateRange.endDate);
  }, [incomes, dateRange]);

  const sourceData = useMemo(() => {
    return groupIncomesBySource(filteredIncomes);
  }, [filteredIncomes]);

  const stats = useMemo(() => {
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return calculateIncomeStats(filteredIncomes, totalExpenses);
  }, [filteredIncomes, transactions]);

  return {
    incomes: filteredIncomes,
    allIncomes: incomes,
    sourceData,
    stats
  };
};
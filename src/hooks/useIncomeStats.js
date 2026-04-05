import { useMemo } from 'react';
import { getTopIncomeSources, getIncomeTrend, predictNextMonthIncome } from '../utils/incomeHelpers';

export const useIncomeStats = (incomes) => {
  const topSources = useMemo(() => {
    return getTopIncomeSources(incomes, 5);
  }, [incomes]);

  const trend = useMemo(() => {
    return getIncomeTrend(incomes);
  }, [incomes]);

  const prediction = useMemo(() => {
    return predictNextMonthIncome(incomes);
  }, [incomes]);

  const monthlyGrowth = useMemo(() => {
    if (incomes.length < 2) return 0;
    
    const sorted = [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstMonth = sorted[0].amount;
    const lastMonth = sorted[sorted.length - 1].amount;
    
    return ((lastMonth - firstMonth) / firstMonth) * 100;
  }, [incomes]);

  return {
    topSources,
    trend,
    prediction,
    monthlyGrowth
  };
};
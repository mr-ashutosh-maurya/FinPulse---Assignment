import { startOfMonth, endOfMonth, subMonths, format, isWithinInterval, parseISO } from 'date-fns';

export const INCOME_CATEGORIES = {
  SALARY: 'Salary',
  FREELANCE: 'Freelance',
  INVESTMENT: 'Investment',
  BUSINESS: 'Business',
  RENTAL: 'Rental Income',
  GIFTS: 'Gifts',
  REFUNDS: 'Refunds',
  BONUS: 'Bonus',
  INTEREST: 'Interest',
  OTHER: 'Other Income'
};

export const INCOME_COLORS = {
  [INCOME_CATEGORIES.SALARY]: '#6366f1',
  [INCOME_CATEGORIES.FREELANCE]: '#10b981',
  [INCOME_CATEGORIES.INVESTMENT]: '#f59e0b',
  [INCOME_CATEGORIES.BUSINESS]: '#ef4444',
  [INCOME_CATEGORIES.RENTAL]: '#8b5cf6',
  [INCOME_CATEGORIES.GIFTS]: '#ec4899',
  [INCOME_CATEGORIES.REFUNDS]: '#06b6d4',
  [INCOME_CATEGORIES.BONUS]: '#84cc16',
  [INCOME_CATEGORIES.INTEREST]: '#f97316',
  [INCOME_CATEGORIES.OTHER]: '#64748b'
};

export const filterIncomesByDateRange = (incomes, startDate, endDate) => {
  return incomes.filter(income => {
    const incomeDate = parseISO(income.date);
    return isWithinInterval(incomeDate, { start: startDate, end: endDate });
  });
};

export const groupIncomesBySource = (incomes) => {
  const sources = {};
  incomes.forEach(income => {
    if (!sources[income.category]) {
      sources[income.category] = 0;
    }
    sources[income.category] += income.amount;
  });
  return Object.entries(sources).map(([name, value]) => ({ name, value }));
};

export const groupIncomesByMonth = (incomes) => {
  const monthlyData = {};
  incomes.forEach(income => {
    const monthKey = format(parseISO(income.date), 'MMM yyyy');
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    monthlyData[monthKey] += income.amount;
  });
  return Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));
};

export const calculateIncomeStats = (incomes, totalExpenses = 0) => {
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
  const highestIncome = incomes.length > 0 ? Math.max(...incomes.map(i => i.amount)) : 0;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  
  return {
    totalIncome,
    averageIncome,
    highestIncome,
    savingsRate,
    transactionCount: incomes.length
  };
};

export const getTopIncomeSources = (incomes, limit = 5) => {
  const sourceTotals = {};
  incomes.forEach(income => {
    if (!sourceTotals[income.category]) {
      sourceTotals[income.category] = 0;
    }
    sourceTotals[income.category] += income.amount;
  });
  
  return Object.entries(sourceTotals)
    .map(([source, amount]) => ({ source, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

export const getIncomeTrend = (incomes) => {
  if (incomes.length < 2) return null;
  
  const sorted = [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date));
  const firstHalf = sorted.slice(0, Math.floor(sorted.length / 2));
  const secondHalf = sorted.slice(Math.floor(sorted.length / 2));
  
  const firstHalfAvg = firstHalf.reduce((sum, i) => sum + i.amount, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, i) => sum + i.amount, 0) / secondHalf.length;
  
  const percentageChange = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
  
  return {
    trend: percentageChange > 0 ? 'increasing' : 'decreasing',
    percentageChange: Math.abs(percentageChange),
    firstHalfAvg,
    secondHalfAvg
  };
};

export const predictNextMonthIncome = (incomes) => {
  
  const sorted = [...incomes].sort((a, b) => new Date(a.date) - new Date(b.date));
  const last3Months = sorted.slice(-3);
  const averageGrowth = last3Months.reduce((sum, inc, idx, arr) => {
    if (idx === 0) return 0;
    const previousAmount = arr[idx - 1].amount;
    const growth = ((inc.amount - previousAmount) / previousAmount) * 100;
    return sum + growth;
  }, 0) / (last3Months.length - 1);
  
  const lastMonthIncome = last3Months[last3Months.length - 1].amount;
  const predictedIncome = lastMonthIncome * (1 + averageGrowth / 100);
  
  return {
    predictedAmount: predictedIncome,
    confidence: Math.min(90, 60 + (incomes.length * 2)),
    basedOnMonths: incomes.length
  };
};
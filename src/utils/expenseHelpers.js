import { startOfMonth, endOfMonth, subMonths, format, isWithinInterval, parseISO } from 'date-fns';

export const EXPENSE_CATEGORIES = {
  HOUSING: 'Housing',
  FOOD: 'Food',
  TRANSPORTATION: 'Transportation',
  ENTERTAINMENT: 'Entertainment',
  UTILITIES: 'Utilities',
  HEALTHCARE: 'Healthcare',
  SHOPPING: 'Shopping',
  EDUCATION: 'Education',
  INSURANCE: 'Insurance',
  OTHER: 'Other'
};

export const EXPENSE_COLORS = {
  [EXPENSE_CATEGORIES.HOUSING]: '#6366f1',
  [EXPENSE_CATEGORIES.FOOD]: '#10b981',
  [EXPENSE_CATEGORIES.TRANSPORTATION]: '#f59e0b',
  [EXPENSE_CATEGORIES.ENTERTAINMENT]: '#ef4444',
  [EXPENSE_CATEGORIES.UTILITIES]: '#8b5cf6',
  [EXPENSE_CATEGORIES.HEALTHCARE]: '#ec4899',
  [EXPENSE_CATEGORIES.SHOPPING]: '#06b6d4',
  [EXPENSE_CATEGORIES.EDUCATION]: '#84cc16',
  [EXPENSE_CATEGORIES.INSURANCE]: '#f97316',
  [EXPENSE_CATEGORIES.OTHER]: '#64748b'
};

export const filterExpensesByDateRange = (expenses, startDate, endDate) => {
  return expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, { start: startDate, end: endDate });
  });
};

export const groupExpensesByCategory = (expenses) => {
  const categories = {};
  expenses.forEach(expense => {
    if (!categories[expense.category]) {
      categories[expense.category] = 0;
    }
    categories[expense.category] += expense.amount;
  });
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

export const groupExpensesByMonth = (expenses) => {
  const monthlyData = {};
  expenses.forEach(expense => {
    const monthKey = format(parseISO(expense.date), 'MMM yyyy');
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    monthlyData[monthKey] += expense.amount;
  });
  return Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));
};

export const calculateExpenseStats = (expenses, totalIncome = 0) => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const highestExpense = expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0;
  const expensePercentageOfIncome = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
  
  return {
    totalExpenses,
    averageExpense,
    highestExpense,
    expensePercentageOfIncome,
    transactionCount: expenses.length
  };
};

export const getTopExpenses = (expenses, limit = 5) => {
  return [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

export const getRecurringExpenses = (expenses) => {
  const categoryCount = {};
  expenses.forEach(expense => {
    if (!categoryCount[expense.category]) {
      categoryCount[expense.category] = { count: 0, total: 0 };
    }
    categoryCount[expense.category].count++;
    categoryCount[expense.category].total += expense.amount;
  });
  
  return Object.entries(categoryCount)
    .filter(([_, data]) => data.count >= 3)
    .map(([category, data]) => ({
      category,
      frequency: `${data.count} times`,
      averageAmount: data.total / data.count
    }));
};
import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

export const useTransactions = () => {
  const [transactions, setTransactions] = useLocalStorage(
    STORAGE_KEYS.TRANSACTIONS,
    MOCK_TRANSACTIONS
  );

  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses
    };
  }, [transactions]);

  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      id: generateId()
    };
    setTransactions(prev => [...prev, newTransaction]);
  }, [setTransactions]);

  const updateTransaction = useCallback((id, updatedTransaction) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...updatedTransaction, id } : t));
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, [setTransactions]);

  const resetTransactions = useCallback(() => {
    setTransactions(MOCK_TRANSACTIONS);
  }, [setTransactions]);

  return {
    transactions,
    summary,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    resetTransactions
  };
};
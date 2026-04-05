import { useMemo } from 'react';
import { compareDesc, parseISO } from 'date-fns';

export const useFilteredTransactions = (transactions, searchTerm, filterType) => {
  return useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
  }, [transactions, searchTerm, filterType]);
};
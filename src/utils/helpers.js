import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatCurrency = (amount) => {
  return `$${amount.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};
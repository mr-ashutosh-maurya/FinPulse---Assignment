import { format, parseISO } from 'date-fns';

export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  return format(parseISO(dateString), formatStr);
};

export const formatShortDate = (dateString) => {
  return format(parseISO(dateString), 'MMM dd');
};

export const formatCSVDate = (date) => {
  return format(date, 'yyyy-MM-dd');
};
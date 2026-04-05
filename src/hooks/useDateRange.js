import { useState } from 'react';
import { startOfMonth, endOfMonth, subMonths, startOfWeek, endOfWeek } from 'date-fns';

export const useDateRange = (initialRange = 'month') => {
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date())
  });
  const [activeRange, setActiveRange] = useState(initialRange);

  const setRange = (range) => {
    const now = new Date();
    let start, end;
    
    switch(range) {
      case 'week':
        start = startOfWeek(now);
        end = endOfWeek(now);
        break;
      case 'month':
        start = startOfMonth(now);
        end = endOfMonth(now);
        break;
      case 'lastMonth':
        start = startOfMonth(subMonths(now, 1));
        end = endOfMonth(subMonths(now, 1));
        break;
      case 'quarter':
        const currentMonth = now.getMonth();
        const quarterStartMonth = Math.floor(currentMonth / 3) * 3;
        start = new Date(now.getFullYear(), quarterStartMonth, 1);
        end = new Date(now.getFullYear(), quarterStartMonth + 3, 0);
        break;
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      default:
        return;
    }
    
    setDateRange({ startDate: start, endDate: end });
    setActiveRange(range);
  };

  const setCustomRange = (start, end) => {
    setDateRange({ startDate: start, endDate: end });
    setActiveRange('custom');
  };

  return {
    dateRange,
    activeRange,
    setRange,
    setCustomRange
  };
};
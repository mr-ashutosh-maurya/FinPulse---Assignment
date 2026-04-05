import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

export const DateRangePicker = ({ dateRange, onRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ranges = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Last Month', value: 'lastMonth' },
    { label: 'This Quarter', value: 'quarter' },
    { label: 'This Year', value: 'year' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
      >
        <Calendar size={16} className="text-slate-400" />
        <span>
          {format(dateRange.startDate, 'MMM dd, yyyy')} - {format(dateRange.endDate, 'MMM dd, yyyy')}
        </span>
        <ChevronDown size={16} className="text-slate-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 right-0 z-50 bg-white rounded-xl shadow-lg border border-slate-200 p-2 min-w-50">
            {ranges.map(range => (
              <button
                key={range.value}
                onClick={() => {
                  onRangeChange(range.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors"
              >
                {range.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
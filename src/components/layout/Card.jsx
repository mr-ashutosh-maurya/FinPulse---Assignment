import React from 'react';
import { cn } from '../../utils/helpers';

export const Card = ({ children, className }) => {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
};
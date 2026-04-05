import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { useAppContext } from '../../context/AppContext';
import { USER_ROLES, TRANSACTION_TYPES } from '../../utils/constants';

export const TransactionModal = ({ isOpen, onClose, onSubmit, editingTransaction }) => {
  const { role } = useAppContext();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role !== USER_ROLES.ADMIN) return;
    onSubmit(e);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold">{editingTransaction ? 'Edit Transaction' : 'New Transaction'}</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                  <select 
                    name="type" 
                    defaultValue={editingTransaction?.type || TRANSACTION_TYPES.EXPENSE}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
                    <option value={TRANSACTION_TYPES.INCOME}>Income</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    required
                    defaultValue={editingTransaction?.date || format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input 
                    type="number" 
                    step="0.01" 
                    name="amount" 
                    required
                    placeholder="0.00"
                    defaultValue={editingTransaction?.amount}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                <input 
                  type="text" 
                  name="category" 
                  required
                  placeholder="e.g. Food, Salary, Rent"
                  defaultValue={editingTransaction?.category}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                <input 
                  type="text" 
                  name="description" 
                  required
                  placeholder="What was this for?"
                  defaultValue={editingTransaction?.description}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mt-4"
              >
                {editingTransaction ? 'Save Changes' : 'Add Transaction'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
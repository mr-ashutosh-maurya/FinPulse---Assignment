import React, { useState } from 'react';
import { Card } from '../layout/Card';
import { Target, Edit2, Check } from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext';

export const IncomeGoalTracker = ({ currentIncome, onSaveGoal }) => {
  const [monthlyGoal, setMonthlyGoal] = useState(() => {
    const saved = localStorage.getItem('income_goal');
    return saved ? parseFloat(saved) : 5000;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(monthlyGoal);

  const progress = (currentIncome / monthlyGoal) * 100;
  const isGoalMet = currentIncome >= monthlyGoal;
  const { role } = useAppContext();

  const handleSaveGoal = () => {
    setMonthlyGoal(editValue);
    localStorage.setItem('income_goal', editValue);
    setIsEditing(false);
    if (onSaveGoal) onSaveGoal(editValue);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target size={20} className="text-blue-600" />
          <h3 className="font-bold text-lg">Monthly Income Goal</h3>
        </div>
        {role === USER_ROLES.ADMIN && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
          >
            <Edit2 size={16} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(parseFloat(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button
              onClick={handleSaveGoal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check size={18} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-2xl font-bold text-slate-900">${currentIncome.toFixed(2)}</p>
              <p className="text-sm text-slate-500">of ${monthlyGoal.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${isGoalMet ? 'text-emerald-600' : 'text-blue-600'}`}>
                {progress.toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${isGoalMet ? 'bg-emerald-600' : 'bg-blue-600'}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          {isGoalMet && (
            <div className="mt-3 p-2 bg-emerald-50 rounded-lg text-center">
              <p className="text-sm text-emerald-700 font-medium">
                🎉 Congratulations! You've met your monthly income goal!
              </p>
            </div>
          )}
        </>
      )}
    </Card>
  );
};
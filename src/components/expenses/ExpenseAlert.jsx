import React, { useState, useEffect } from 'react';
import { AlertTriangle, DollarSign, TrendingUp, X } from 'lucide-react';
import { Card } from '../layout/Card';
import { cn } from '../../utils/helpers';

export const ExpenseAlert = ({ expenses, budgetLimit = 2000, autoClose = 5000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const percentageUsed = (totalExpenses / budgetLimit) * 100;
  const isOverBudget = totalExpenses > budgetLimit;
  const isCloseToBudget = percentageUsed >= 80 && !isOverBudget;
  const shouldShowAlert = isOverBudget || isCloseToBudget;

  useEffect(() => {
    if (shouldShowAlert) {
      // Show the popup with animation
      setIsVisible(true);
    //   setIsAnimating(true);
      
      // Remove animation class after animation completes
      const animationTimer = setTimeout(() => setIsAnimating(false), 2000);
      
      // Auto close after specified time
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, autoClose);
      
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(autoCloseTimer);
      };
    }
  }, [shouldShowAlert, autoClose]);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
    }, 300);
  };

  if (!shouldShowAlert) return null;

  return (
    <>
      {/* Overlay */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleClose}
            style={{
              opacity: isAnimating ? 0 : 1,
              animation: isAnimating && isVisible ? 'fadeOut 0.3s ease-out' : 'fadeIn 0.3s ease-out'
            }}
          />
          
          {/* Popup Card */}
          <div 
            className={cn(
              "relative z-10 max-w-md w-full transform transition-all duration-500",
              isAnimating && isVisible ? 'animate-fadeOutUp' : 'animate-fadeInDown'
            )}
            style={{
              animation: isAnimating && isVisible 
                ? 'slideOutUp 0.3s ease-out' 
                : 'slideInDown 0.5s ease-out'
            }}
          >
            <Card className={`p-6 shadow-2xl ${isOverBudget ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-black/10 transition-colors"
                aria-label="Close alert"
              >
                <X size={18} className={isOverBudget ? 'text-red-600' : 'text-yellow-600'} />
              </button>

              <div className="flex items-start gap-3">
                {/* <div className={cn(
                  "animate-bounce",
                  isOverBudget ? 'text-red-600' : 'text-yellow-600'
                )}>
                  <AlertTriangle size={28} />
                </div> */}
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${isOverBudget ? 'text-red-900' : 'text-yellow-900'}`}>
                    {isOverBudget ? '⚠️ Budget Exceeded!' : '⚠️ Approaching Budget Limit'}
                  </h3>
                  <p className={`text-sm mt-2 ${isOverBudget ? 'text-red-700' : 'text-yellow-700'}`}>
                    {isOverBudget 
                      ? `You have exceeded your monthly budget by $${(totalExpenses - budgetLimit).toFixed(2)}`
                      : `You have used ${percentageUsed.toFixed(1)}% of your monthly budget. $${(budgetLimit - totalExpenses).toFixed(2)} remaining`
                    }
                  </p>
                  
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Budget Usage</span>
                      <span className="font-semibold">{percentageUsed.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden shadow-inner">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000 ease-out",
                          isOverBudget ? 'bg-red-600' : 'bg-yellow-600'
                        )}
                        style={{ 
                          width: `${Math.min(percentageUsed, 100)}%`,
                          animation: 'progressFill 1s ease-out'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-50px);
          }
        }
        
        @keyframes progressFill {
          from { width: 0%; }
          to { width: var(--final-width); }
        }
        
        .animate-fadeInDown {
          animation: slideInDown 0.5s ease-out;
        }
        
        .animate-fadeOutUp {
          animation: slideOutUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};
import React from 'react';
import { AlertCircle, TrendingUp, Gift } from 'lucide-react';
import { Card } from '../layout/Card';

export const IncomeAlert = ({ stats, trend, prediction }) => {
  const alerts = [];

  if (trend && trend.trend === 'decreasing' && trend.percentageChange > 10) {
    alerts.push({
      type: 'warning',
      icon: TrendingUp,
      message: `Income decreased by ${trend.percentageChange.toFixed(1)}% compared to previous period`,
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    });
  }

  if (stats.savingsRate < 10) {
    alerts.push({
      type: 'info',
      icon: AlertCircle,
      message: 'Your savings rate is low. Consider increasing your income or reducing expenses.',
      color: 'text-blue-600 bg-blue-50 border-blue-200'
    });
  }

  if (prediction && prediction.predictedAmount > stats.totalIncome) {
    alerts.push({
      type: 'success',
      icon: Gift,
      message: `AI predicts a ${((prediction.predictedAmount - stats.totalIncome) / stats.totalIncome * 100).toFixed(1)}% increase in income next month!`,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3 mb-8">
      {alerts.map((alert, idx) => (
        <Card key={idx} className={`p-4 ${alert.color}`}>
          <div className="flex items-start gap-3">
            <alert.icon size={20} />
            <p className="text-sm font-medium">{alert.message}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
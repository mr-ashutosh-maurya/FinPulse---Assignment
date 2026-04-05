import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTransactions } from '../hooks/useTransactions';
import { useDateRange } from '../hooks/useDateRange';
import { useIncomes } from '../hooks/useIncomes';
import { useIncomeStats } from '../hooks/useIncomeStats';
import { IncomeStats } from '../components/incomes/IncomeStats';
import { IncomeFilters } from '../components/incomes/IncomeFilters';
import { IncomeChart } from '../components/incomes/IncomeChart';
import { IncomeSourceBreakdown } from '../components/incomes/IncomeSourceBreakdown';
import { MonthlyIncomeComparison } from '../components/incomes/MonthlyIncomeComparison';
import { IncomeTable } from '../components/incomes/IncomeTable';
import { IncomeAlert } from '../components/incomes/IncomeAlert';
import { IncomeGoalTracker } from '../components/incomes/IncomeGoalTracker';
import { DateRangePicker } from '../components/common/DateRangePicker';
import { groupIncomesByMonth, groupIncomesBySource } from '../utils/incomeHelpers';
import { Card } from '../components/layout/Card';
import { ArrowLeft, TrendingUp, Star, Wallet } from 'lucide-react';
import { subMonths, format } from 'date-fns';

const Incomes = ({ onNavigate, onEditTransaction }) => {
  const { transactions, deleteTransaction } = useTransactions();
  const { dateRange, setRange } = useDateRange();
  const { incomes, sourceData, stats } = useIncomes(transactions, dateRange);
  const { topSources, trend, prediction, monthlyGrowth } = useIncomeStats(incomes);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [showPrediction, setShowPrediction] = useState(true);

  // Process and sort incomes
  const processedIncomes = useMemo(() => {
    let filtered = [...incomes];

    if (searchTerm) {
      filtered = filtered.filter(inc => 
        inc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSource !== 'All') {
      filtered = filtered.filter(inc => inc.category === selectedSource);
    }

    if (minAmount) {
      filtered = filtered.filter(inc => inc.amount >= parseFloat(minAmount));
    }
    if (maxAmount) {
      filtered = filtered.filter(inc => inc.amount <= parseFloat(maxAmount));
    }

    switch(sortBy) {
      case 'date_asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount_desc':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount_asc':
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case 'source_asc':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [incomes, searchTerm, selectedSource, sortBy, minAmount, maxAmount]);

  // Monthly data for chart
  const monthlyData = useMemo(() => {
    return groupIncomesByMonth(incomes);
  }, [incomes]);

  const last12MonthsData = useMemo(() => {
    const allIncomes = transactions.filter(t => t.type === 'income');
    const today = new Date();
    const last12Months = [];
    
    // Create array of last 12 months
    for (let i = 6; i >= 0; i--) {
      const monthDate = subMonths(today, i);
      const monthKey = format(monthDate, 'MMM yyyy');
      const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
      
      // Filter incomes for this month
      const monthIncomes = allIncomes.filter(income => {
        const incomeDate = new Date(income.date);
        return incomeDate >= monthStart && incomeDate <= monthEnd;
      });
      
      const totalAmount = monthIncomes.reduce((sum, inc) => sum + inc.amount, 0);
      
      last12Months.push({
        month: monthKey,
        amount: totalAmount,
        transactionCount: monthIncomes.length
      });
    }
    
    return last12Months;
  }, [transactions]);

  // Monthly comparison
  const monthlyComparison = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthIncomes = incomes.filter(inc => {
      const incDate = new Date(inc.date);
      return incDate.getMonth() === currentMonth && incDate.getFullYear() === currentYear;
    }).reduce((sum, inc) => sum + inc.amount, 0);

    const lastMonthIncomes = incomes.filter(inc => {
      const incDate = new Date(inc.date);
      return incDate.getMonth() === lastMonth && incDate.getFullYear() === lastMonthYear;
    }).reduce((sum, inc) => sum + inc.amount, 0);

    return { currentMonth: currentMonthIncomes, lastMonth: lastMonthIncomes };
  }, [incomes]);

  const handleEdit = (income) => {
    if (onEditTransaction) {
      onEditTransaction(income);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this income record?')) {
      await deleteTransaction(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center md:justify-end">
            <DateRangePicker dateRange={dateRange} onRangeChange={setRange} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        <IncomeAlert stats={stats} trend={trend} prediction={prediction} />

        {/* Stats Cards */}
        <IncomeStats stats={stats} />


        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <IncomeChart monthlyData={last12MonthsData} trend={trend} />
          </div>
          <div className="space-y-6">
            <IncomeSourceBreakdown sourceData={sourceData} />
          </div>
        </div>
        {/* Income Goal Tracker */}
        <div className="mb-8">
          <IncomeGoalTracker currentIncome={monthlyComparison?.currentMonth} />
        </div>

        {/* AI Prediction Section */}
        {showPrediction && (
          <Card className="p-6 mb-8 ">
            <div className="flex items-start gap-4">
              {/* <div className="p-3 bg-blue-600 rounded-xl text-white">
                <TrendingUp size={24} />
              </div> */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900">
                  AI Income Prediction
                </h3>
                <p className="text-blue-700 mt-1">
                  Based on your income patterns from the last{" "}
                  {prediction?.basedOnMonths} months, we predict your next
                  month's income will be:
                </p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    ${prediction?.predictedAmount.toFixed(2)}
                  </p>
                <div className='flex justify-end'>
                  <span className="text-xs text-blue-600 font-medium">
                    {prediction?.confidence}% confidence
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-blue-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${prediction?.confidence}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  *This is an AI-generated prediction based on historical data
                  patterns
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Additional Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Income Sources */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-yellow-600" />
              <h3 className="font-bold text-lg">Top Income Sources</h3>
            </div>
            <div className="space-y-3">
              {topSources.map((source, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {source.source}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">
                      ${source.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {topSources.length === 0 && (
                <p className="text-center text-slate-400 py-4">
                  No income data available
                </p>
              )}
            </div>
          </Card>
          <MonthlyIncomeComparison
            currentMonthTotal={monthlyComparison.currentMonth}
            previousMonthTotal={monthlyComparison.lastMonth}
            monthlyGrowth={monthlyGrowth}
          />
        </div>

        {/* income filter */}
        <div className="mb-8">
          <IncomeFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSource={selectedSource}
            onSourceChange={setSelectedSource}
            sortBy={sortBy}
            onSortChange={setSortBy}
            minAmount={minAmount}
            onMinAmountChange={setMinAmount}
            maxAmount={maxAmount}
            onMaxAmountChange={setMaxAmount}
            showPrediction={showPrediction}
            onShowPredictionChange={setShowPrediction}
          />
        </div>
        {/* Income Table */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Wallet size={20} className="text-emerald-600" />
            All Income Records
          </h3>
          <IncomeTable
            incomes={processedIncomes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Incomes;
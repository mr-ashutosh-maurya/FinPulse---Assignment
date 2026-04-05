import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle,
} from 'lucide-react';
import { format } from 'date-fns';

import { useAppContext } from '../context/AppContext';
import { useTransactions } from '../hooks/useTransactions';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { BalanceChart } from '../components/dashboard/BalanceChart';
import { SpendingBreakdown } from '../components/dashboard/SpendingBreakdown';
import { InsightsPanel } from '../components/dashboard/InsightsPanel';
import { TransactionTable } from '../components/transactions/TransactionTable';
import { TransactionModal } from '../components/transactions/TransactionModal';
import { USER_ROLES } from '../utils/constants';

const Dashboard = () => {
  const { role, isModalOpen, setIsModalOpen, editingTransaction, setEditingTransaction } = useAppContext();
  const { transactions, summary, addTransaction, updateTransaction, deleteTransaction, resetTransactions } = useTransactions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = useFilteredTransactions(transactions, searchTerm, filterType);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (role !== USER_ROLES.ADMIN) return;

    const formData = new FormData(e.currentTarget);
    const transactionData = {
      date: formData.get('date'),
      amount: parseFloat(formData.get('amount')),
      category: formData.get('category'),
      description: formData.get('description'),
      type: formData.get('type'),
    };

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }

    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (role !== USER_ROLES.ADMIN) return;
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleReset = () => {
    if (role !== USER_ROLES.ADMIN) return;
    if (window.confirm('Are you sure you want to reset all data to defaults?')) {
      resetTransactions();
    }
  };

  const handleExport = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filteredTransactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount.toString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fintrack_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Total Balance" amount={summary.totalBalance} icon={Wallet} type="balance" />
          <SummaryCard title="Total Income" amount={summary.totalIncome} icon={ArrowUpCircle} type="income" />
          <SummaryCard title="Total Expenses" amount={summary.totalExpenses} icon={ArrowDownCircle} type="expense" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BalanceChart transactions={transactions} />
          <SpendingBreakdown transactions={transactions} />
        </div>

        {/* Insights & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Insights Panel */}
          <div className="lg:col-span-1 space-y-6">
            <InsightsPanel transactions={transactions} />
          </div>

          {/* Transactions Table */}
          <TransactionTable 
            transactions={filteredTransactions}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
            onExport={handleExport}
            onReset={handleReset}
            onAdd={() => {
              setEditingTransaction(null);
              setIsModalOpen(true);
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      {/* Transaction Modal */}
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleAddTransaction}
        editingTransaction={editingTransaction}
      />
    </div>
  );
};

export default Dashboard;
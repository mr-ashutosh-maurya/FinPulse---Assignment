# FinPulse - Personal Finance Tracker

A comprehensive, modern personal finance management application built with React. Track your income and expenses, visualize spending patterns, set financial goals, and get AI-powered insights to make better financial decisions.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Detailed Feature Guide](#detailed-feature-guide)
- [Approach & Architecture](#approach--architecture)
- [User Roles](#user-roles)
- [Data Persistence](#data-persistence)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)

## 🚀 Overview

FinPulse is a full-featured personal finance tracker that helps users:
- Track income and expenses in real-time
- Visualize financial data through interactive charts
- Set and monitor financial goals
- Get AI-powered income predictions
- Analyze spending patterns and trends
- Export data for external analysis

The application features a dual-role system (Admin/Viewer) making it suitable for both active financial management and shared viewing scenarios.

## ✨ Features

### Dashboard
- **Real-time Financial Summary**: Total balance, income, and expenses at a glance
- **Balance Trend Chart**: Visual representation of financial health over time
- **Spending Breakdown**: Pie chart showing expense distribution by category
- **Quick Insights**: AI-generated tips and spending analysis

### Income Management
- **Income Tracking**: Record and categorize all income sources
- **12-Month Trend Analysis**: View income patterns over the last year (filter-independent)
- **Income Source Breakdown**: Visualize income distribution by source
- **AI Income Prediction**: Machine learning-based predictions for future income
- **Income Goal Setting**: Set monthly targets and track progress
- **Monthly Comparison**: Compare income month-over-month

### Expense Management
- **Expense Tracking**: Log all expenses with categories
- **Category Analysis**: Detailed breakdown of spending by category
- **Budget Alerts**: Warnings when approaching or exceeding budget limits
- **Monthly Comparison**: Track expense trends over time
- **Top Expenses**: Identify highest spending categories

### Transaction Management
- **CRUD Operations**: Create, read, update, and delete transactions
- **Advanced Filtering**: Search by description, category, amount range
- **Sorting**: Sort by date, amount, or category
- **CSV Export**: Download transaction data for external analysis
- **Date Range Filtering**: View transactions within specific time periods

### User Roles
- **Admin**: Full access - add, edit, delete transactions, reset data
- **Viewer**: Read-only access - view all data but cannot modify

## 🛠 Tech Stack

### Frontend
- **React 18**: UI library with hooks for state management
- **Vite**: Build tool for fast development and optimized production builds
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **Recharts**: Charting library for data visualization
- **Lucide React**: Modern icon library

### Key Libraries
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Conditional className management
- **Local Storage API**: Client-side data persistence

## 📦 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or pnpm package manager

### Installation Steps

1. **Clone or create the project**
```bash
mkdir FinPulse
cd FinPulse
```

2. **Initialize package.json**
```bash
npm init -y
```

3. **Install dependencies**

Using npm:
```bash
npm install react react-dom
npm install motion lucide-react date-fns recharts
npm install clsx tailwind-merge
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
```

Using yarn:
```bash
yarn add react react-dom motion lucide-react date-fns recharts clsx tailwind-merge
yarn add -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

Using pnpm:
```bash
pnpm add react react-dom motion lucide-react date-fns recharts clsx tailwind-merge
pnpm add -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer
```

4. **Initialize Tailwind CSS**
```bash
npx tailwindcss init -p
```

5. **Create folder structure**
```bash
mkdir -p src/components/{layout,dashboard,transactions,incomes,expenses,common}
mkdir -p src/{context,hooks,utils,data,styles,pages}
mkdir public
```

6. **Add all source files**
Copy all the provided component files into their respective folders as shown in the project structure.

7. **Start development server**
```bash
npm run dev
```

8. **Build for production**
```bash
npm run build
```

9. **Preview production build**
```bash
npm run preview
```

## 📁 Project Structure

```
FinPulse/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Card.jsx
│   │   ├── dashboard/
│   │   │   ├── SummaryCard.jsx
│   │   │   ├── BalanceChart.jsx
│   │   │   ├── SpendingBreakdown.jsx
│   │   │   └── InsightsPanel.jsx
│   │   ├── transactions/
│   │   │   ├── TransactionTable.jsx
│   │   │   ├── TransactionRow.jsx
│   │   │   ├── TransactionModal.jsx
│   │   │   └── TransactionFilters.jsx
│   │   ├── incomes/
│   │   │   ├── IncomeStats.jsx
│   │   │   ├── IncomeFilters.jsx
│   │   │   ├── IncomeChart.jsx
│   │   │   ├── IncomeSourceBreakdown.jsx
│   │   │   ├── MonthlyIncomeComparison.jsx
│   │   │   ├── IncomeTable.jsx
│   │   │   ├── IncomeAlert.jsx
│   │   │   └── IncomeGoalTracker.jsx
│   │   ├── expenses/
│   │   │   ├── ExpenseStats.jsx
│   │   │   ├── ExpenseFilters.jsx
│   │   │   ├── ExpenseChart.jsx
│   │   │   ├── CategoryBreakdown.jsx
│   │   │   ├── MonthlyComparison.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   └── ExpenseAlert.jsx
│   │   └── common/
│   │       ├── DateRangePicker.jsx
│   │       └── CategoryPill.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useTransactions.js
│   │   ├── useFilteredTransactions.js
│   │   ├── useExpenses.js
│   │   ├── useIncomes.js
│   │   ├── useIncomeStats.js
│   │   └── useDateRange.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── expenseHelpers.js
│   │   └── incomeHelpers.js
│   ├── data/
│   │   └── mockData.js
│   ├── pages/
│   │   ├── ExpensesPage.jsx
│   │   └── IncomesPage.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎯 Detailed Feature Guide

### 1. Dashboard
The central hub showing your financial health:
- **Summary Cards**: Display total balance, income, and expenses
- **Balance Trend**: Area chart showing balance over time
- **Spending Breakdown**: Pie chart of expenses by category
- **Quick Insights**: AI-generated tips based on your spending patterns

### 2. Income Page
Comprehensive income tracking and analysis:
- **12-Month Chart**: Always shows last year's income (filter-independent)
- **Income Sources**: Pie chart of income by source
- **AI Predictions**: Machine learning-based income forecasts
- **Goal Tracking**: Set monthly income targets
- **Monthly Comparison**: Compare with previous months
- **Top Sources**: Identify highest contributing income streams

### 3. Expenses Page
Detailed expense management:
- **Category Analysis**: Breakdown of spending by category
- **Budget Alerts**: Visual warnings when approaching limits
- **Recurring Detection**: Identifies regular expense patterns
- **Monthly Trends**: Track expense changes over time
- **Top Expenses**: List of largest individual expenses

### 4. Transaction Management
Powerful transaction handling:
- **Add/Edit/Delete**: Full CRUD operations (Admin only)
- **Search**: Search by description or category
- **Filters**: Filter by type, category, amount range
- **Sorting**: Sort by date, amount, or category
- **Export**: Download filtered data as CSV

### 5. Data Persistence
- **Auto-save**: All changes automatically saved to localStorage
- **Mock Data**: Pre-loaded with sample transactions
- **Reset Option**: Restore to default mock data (Admin only)

## 🏗 Approach & Architecture

### Component-Based Architecture
The application follows a modular component-based architecture:
- **Presentational Components**: Reusable UI components (Card, Button, etc.)
- **Container Components**: Connect to state and logic (Pages)
- **Feature Components**: Specific functionality (IncomeChart, ExpenseTable)

### State Management
- **React Context API**: Global state for user role and modal visibility
- **Custom Hooks**: Encapsulated logic for transactions, filtering, and calculations
- **Local Storage**: Client-side persistence with automatic syncing

### Data Flow
```
User Action → Component → Custom Hook → State Update → Local Storage → UI Re-render
```

### Key Design Patterns

1. **Custom Hooks Pattern**
   - `useTransactions`: Manages all transaction CRUD operations
   - `useFilteredTransactions`: Handles search, filter, and sort logic
   - `useLocalStorage`: Syncs state with localStorage

2. **Render Props Pattern**
   - Used in modal components for flexible content rendering

3. **Compound Components**
   - Transaction table with modular row components

4. **Provider Pattern**
   - AppContext provides global state to all components

### Performance Optimizations
- **useMemo**: Memoizes expensive calculations (summaries, chart data)
- **useCallback**: Prevents unnecessary re-renders of child components
- **Lazy Loading**: Components are loaded on demand
- **Virtualized Lists**: Planned for large transaction datasets

## 👥 User Roles

### Admin Role
- Full access to all features
- Can add, edit, and delete transactions
- Can reset data to default mock data
- Can export data to CSV
- Role indicator: Blue "Admin" badge

### Viewer Role
- Read-only access
- Can view all dashboards and reports
- Cannot modify any data
- Role indicator: Gray "Viewer" badge

## 💾 Data Persistence

### Local Storage Strategy
- **Storage Key**: `FinPulse_transactions`
- **Auto-save**: Every transaction change triggers save
- **Initial Load**: Loads from localStorage or uses mock data
- **Reset**: Admin can restore default mock data

### Data Structure
```javascript
Transaction {
  id: string,
  date: string (YYYY-MM-DD),
  amount: number,
  category: string,
  description: string,
  type: 'income' | 'expense'
}
```

## 🔮 Future Enhancements

### Planned Features
1. **Multi-currency Support**
   - Currency conversion
   - Exchange rate API integration

2. **Budget Planning**
   - Category-based budgets
   - Monthly budget templates
   - Rollover budgets

3. **Advanced Analytics**
   - Predictive spending patterns
   - Anomaly detection
   - Financial health score

4. **Data Import**
   - CSV import
   - Bank statement parsing
   - PDF receipt scanning

5. **Mobile App**
   - React Native version
   - Offline support
   - Push notifications

6. **Cloud Sync**
   - User accounts
   - Multi-device sync
   - Data backup

7. **Reports & Export**
   - PDF report generation
   - Email reports
   - Scheduled exports

8. **Investment Tracking**
   - Portfolio management
   - Return on investment (ROI) tracking
   - Dividend tracking

## 🐛 Troubleshooting

### Common Issues and Solutions

**Issue**: `subMonths is not defined`
```javascript
// Solution: Add missing import
import { subMonths, format } from 'date-fns';
```

**Issue**: Styles not loading
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/styles/index.css -o ./src/styles/output.css --watch
```

**Issue**: Local storage not persisting
```javascript
// Check if localStorage is available
if (typeof Storage !== "undefined") {
  // localStorage is available
} else {
  console.error("localStorage is not supported");
}
```

**Issue**: Charts not rendering
- Ensure Recharts is properly installed
- Check that data is in correct format (array of objects)
- Verify container has height defined

**Issue**: Modal not closing
- Check modal state management in AppContext
- Verify onClose handler is properly connected

### Development Tips

1. **Debugging State**
```javascript
// Add to component to monitor state changes
useEffect(() => {
  console.log('Transactions updated:', transactions);
}, [transactions]);
```

2. **Testing Filters**
```javascript
// Log filtered results
console.log('Filtered transactions:', filteredTransactions);
```

3. **Performance Check**
```javascript
// Use React DevTools Profiler to identify bottlenecks
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue in the repository or contact the maintainers.

---

**FinPulse** - Take control of your finances, one transaction at a time. 🚀
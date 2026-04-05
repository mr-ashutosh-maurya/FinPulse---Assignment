import React, { useState } from 'react';
import { Wallet, ShieldCheck, ShieldAlert, LayoutDashboard, TrendingUp, TrendingDown, Menu, X } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { USER_ROLES } from '../../utils/constants';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { role, setRole } = useAppContext();
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, nav: '/' },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown, nav: '/expenses' },
    { id: 'income', label: 'Income', icon: TrendingUp, nav: '/income' },
  ];
  const navigate = useNavigate();

  const handlePageChange = (pageId, nav) => {
    setActivePage(pageId);
    navigate(nav);
    setIsMobileMenuOpen(false);
    console.log(`Navigating to: ${pageId}`);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo Section */}
            <div onClick={()=>navigate('/')} className="flex items-center gap-2 shrink-0 cursor-pointer">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Wallet size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                  FIN<span className='text-blue-600'>PULSE </span>
                </h1>
                <p className='text-xs text-gray-500 hidden md:block'>
                  Manage your Transactions
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handlePageChange(item.id, item.nav)}
                        className={cn(
                          "px-3 lg:px-4 py-2 text-sm font-medium rounded-lg cursor-pointer transition-all flex items-center gap-2 whitespace-nowrap",
                          activePage === item.id
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop Role Selector */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setRole(USER_ROLES.VIEWER)}
                  className={cn(
                    "px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md cursor-pointer transition-all flex items-center gap-1 sm:gap-2",
                    role === USER_ROLES.VIEWER 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <ShieldAlert size={14} className="sm:w-4 sm:h-4" />
                  <span className=" xs:inline">Viewer</span>
                </button>
                <button 
                  onClick={() => setRole(USER_ROLES.ADMIN)}
                  className={cn(
                    "px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md cursor-pointer transition-all flex items-center gap-1 sm:gap-2",
                    role === USER_ROLES.ADMIN 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  <ShieldCheck size={14} className="sm:w-4 sm:h-4" />
                  <span className=" xs:inline">Admin</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            // className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="fixed top-16 left-0 right-0 bg-white shadow-xl z-40 md:hidden animate-slideDown">
            {/* Mobile Navigation */}
            <nav className="p-4 border-b border-slate-200">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handlePageChange(item.id, item.nav)}
                        className={cn(
                          "w-full px-4 py-3 text-sm font-medium rounded-lg transition-all flex items-center gap-3",
                          activePage === item.id
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        {/* <Icon size={20} /> */}
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Role Selector */}
            <div className="p-4">
              <p className="text-xs text-slate-500 mb-2">Select Role</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setRole(USER_ROLES.VIEWER);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
                    role === USER_ROLES.VIEWER 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  <ShieldAlert size={16} />
                  Viewer
                </button>
                <button 
                  onClick={() => {
                    setRole(USER_ROLES.ADMIN);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
                    role === USER_ROLES.ADMIN 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  )}
                >
                  <ShieldCheck size={16} />
                  Admin
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
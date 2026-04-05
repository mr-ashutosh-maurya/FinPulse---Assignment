import React, { createContext, useState, useContext } from 'react';
import { USER_ROLES } from '../utils/constants';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(USER_ROLES.ADMIN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const value = {
    role,
    setRole,
    isModalOpen,
    setIsModalOpen,
    editingTransaction,
    setEditingTransaction
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
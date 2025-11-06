// src/context/AppProvider.js
import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import { loadStorage, saveStorage } from '../utils/storage';

const SAMPLE_STATE = { users: [], currentUserId: null };

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(() => loadStorage('expense_app_state') || SAMPLE_STATE);

  useEffect(() => {
    saveStorage('expense_app_state', state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

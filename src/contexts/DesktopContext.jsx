import React from 'react';
import { createContext, useContext } from 'react';
import { useDesktop } from '../hooks';

const DesktopContext = createContext(null);

export const DesktopProvider = ({ children }) => {
  const desktop = useDesktop();

  return (
    <DesktopContext.Provider value={desktop}>
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktopContext = () => {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error('useDesktopContext must be used within a DesktopContext.Provider');
  return ctx;
};

export default DesktopContext;

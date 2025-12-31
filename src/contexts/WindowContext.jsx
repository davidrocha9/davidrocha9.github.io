import { createContext, useContext, useEffect, useState } from 'react';

const WindowContext = createContext(null);

export const WindowProvider = ({ children }) => {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState(new Set());
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <WindowContext.Provider value={{
      openWindows,
      setOpenWindows,
      activeWindowId,
      setActiveWindowId,
      minimizedWindows,
      setMinimizedWindows,
      showNotification,
      setShowNotification,
    }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindow must be used within WindowProvider');
  return ctx;
};

export default WindowContext;

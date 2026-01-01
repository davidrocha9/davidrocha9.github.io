import { createContext, useContext } from 'react';
import { usePrefetchedDiscogs } from '@contexts/DataPrefetchContext';

const DiscogsContext = createContext();

export const useDiscogsContext = () => {
  const context = useContext(DiscogsContext);
  if (!context) {
    throw new Error('useDiscogsContext must be used within a DiscogsProvider');
  }
  return context;
};

export const DiscogsProvider = ({ children }) => {
  const discogsData = usePrefetchedDiscogs();

  const value = {
    ...discogsData,
  };

  return (
    <DiscogsContext.Provider value={value}>
      {children}
    </DiscogsContext.Provider>
  );
};
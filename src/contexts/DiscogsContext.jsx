import { createContext, useContext } from 'react';
import { useDiscogsCollection } from '@hooks/useDiscogsCollection';

const DiscogsContext = createContext();

export const useDiscogsContext = () => {
  const context = useContext(DiscogsContext);
  if (!context) {
    throw new Error('useDiscogsContext must be used within a DiscogsProvider');
  }
  return context;
};

export const DiscogsProvider = ({ children }) => {
  const USERNAME = 'davidrocha9';
  const discogsData = useDiscogsCollection(USERNAME);

  const value = {
    ...discogsData,
    username: USERNAME,
  };

  return (
    <DiscogsContext.Provider value={value}>
      {children}
    </DiscogsContext.Provider>
  );
};
import { createContext, useContext } from 'react';
import { usePrefetchedGitHub } from '@contexts/DataPrefetchContext';

const GitHubContext = createContext();

export const GitHubProvider = ({ children, username }) => {
  const prefetchedData = usePrefetchedGitHub();

  const value = {
    ...prefetchedData,
  };

  return (
    <GitHubContext.Provider value={value}>
      {children}
    </GitHubContext.Provider>
  );
};

export const useGitHub = () => {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error('useGitHub must be used within a GitHubProvider');
  }
  return context;
};
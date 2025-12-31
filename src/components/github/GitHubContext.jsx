import { createContext, useContext } from 'react';
import useGitHubProfile from '@components/github/useGitHubProfile';

const GitHubContext = createContext();

export const GitHubProvider = ({ children, username }) => {
  const { profile, repos, pinnedRepos, loading, error } = useGitHubProfile(username);

  const openGitHub = (url) => {
    const target = url || `https://github.com/${username}`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  const value = {
    profile,
    repos,
    pinnedRepos,
    loading,
    error,
    openGitHub,
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
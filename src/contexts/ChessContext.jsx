import { createContext, useContext, useState } from 'react';
import { useChessProfile } from '@hooks/useChessProfile';
import { ChessTabs } from '@components/hobbies/chess';

const ChessContext = createContext();

export const useChessContext = () => {
  const context = useContext(ChessContext);
  if (!context) {
    throw new Error('useChessContext must be used within a ChessProvider');
  }
  return context;
};

export const ChessProvider = ({ children }) => {
  const USERNAME = 'davidrocha_9';
  const chessData = useChessProfile(USERNAME);
  const [activeTab, setActiveTab] = useState(ChessTabs.STATS);

  const value = {
    ...chessData,
    username: USERNAME,
    activeTab,
    setActiveTab,
  };

  return (
    <ChessContext.Provider value={value}>
      {children}
    </ChessContext.Provider>
  );
};
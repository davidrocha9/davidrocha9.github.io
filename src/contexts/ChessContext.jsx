import { createContext, useContext, useState } from 'react';
import { usePrefetchedChess } from '@contexts/DataPrefetchContext';
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
  const chessData = usePrefetchedChess();
  const [activeTab, setActiveTab] = useState(ChessTabs.STATS);

  const value = {
    ...chessData,
    activeTab,
    setActiveTab,
  };

  return (
    <ChessContext.Provider value={value}>
      {children}
    </ChessContext.Provider>
  );
};
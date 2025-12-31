import GamesList from './GamesList';
import { useChessContext } from '@contexts/ChessContext';

const GamesView = () => {
  const { games, username, getGameResult } = useChessContext();

  return (
    <div className="chess-games-view">
      <GamesList games={games} username={username} getGameResult={getGameResult} />
    </div>
  );
};

export default GamesView;
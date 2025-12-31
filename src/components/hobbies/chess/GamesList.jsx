import GameItem from './GameItem';
import { useChessContext } from '@contexts/ChessContext';

const GamesList = () => {
  const { games } = useChessContext();

  if (games.length === 0) {
    return <div className="no-games">No recent games this month</div>;
  }

  return (
    <div className="games-list">
      {games.map((game, index) => (
        <GameItem
          key={index}
          game={game}
        />
      ))}
    </div>
  );
};

export default GamesList;
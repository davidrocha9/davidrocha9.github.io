import { useChessContext } from '@contexts/ChessContext';

const GameItem = ({ game }) => {
  const { username, getGameResult } = useChessContext();
  const result = getGameResult(game);
  const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
  const opponent = isWhite ? game.black.username : game.white.username;
  const timeClass = game.time_class;
  const date = new Date(game.end_time * 1000).toLocaleDateString();

  return (
    <div
      className={`game-item ${result.class}`}
      onClick={() => window.open(game.url, '_blank')}
    >
      <div className="game-color">{isWhite ? '⬜' : '⬛'}</div>
      <div className="game-info">
        <div className="game-opponent">vs {opponent}</div>
        <div className="game-meta">
          {timeClass} • {date}
        </div>
      </div>
      <div className={`game-result ${result.class}`}>{result.text}</div>
    </div>
  );
};

export default GameItem;
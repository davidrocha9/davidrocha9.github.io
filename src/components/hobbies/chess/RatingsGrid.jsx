import { useChessContext } from '@contexts/ChessContext';

const RatingsGrid = () => {
  const { formatRating } = useChessContext();

  return (
    <div className="ratings-grid">
      {[
        { key: 'chess_rapid', label: '⏱️ Rapid' },
        { key: 'chess_blitz', label: '⚡ Blitz' },
        { key: 'chess_bullet', label: '🔥 Bullet' },
        { key: 'chess_daily', label: '📅 Daily' },
        { key: 'puzzle_rush', label: '🧩 Puzzles' },
      ].map(({ key, label }) => {
        const rating = formatRating(key);
        if (!rating) return null;
        return (
          <div key={key} className="rating-card">
            <div className="rating-label">{label}</div>
            <div className="rating-value">{rating}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RatingsGrid;
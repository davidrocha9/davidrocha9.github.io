import { useChessContext } from '@contexts/ChessContext';

const RecordSection = () => {
  const { stats } = useChessContext();

  if (!stats?.chess_rapid?.record) return null;

  return (
    <div className="record-section">
      <h4>Rapid Record</h4>
      <div className="record-stats">
        <div className="record-item win">
          <span className="record-count">{stats.chess_rapid.record.win}</span>
          <span className="record-label">Wins</span>
        </div>
        <div className="record-item loss">
          <span className="record-count">{stats.chess_rapid.record.loss}</span>
          <span className="record-label">Losses</span>
        </div>
        <div className="record-item draw">
          <span className="record-count">{stats.chess_rapid.record.draw}</span>
          <span className="record-label">Draws</span>
        </div>
      </div>
    </div>
  );
};

export default RecordSection;
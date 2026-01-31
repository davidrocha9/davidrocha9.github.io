import { Loading, Error, StatsView, GamesView, ChessTabs } from '@components/hobbies/chess/index';
import { ChessProvider, useChessContext } from '@contexts/ChessContext';
import '@components/hobbies/chess/ChessProfile.css';
import { trackTabSwitch, trackExternalLink } from '@/utils/analytics';

const ChessProfileContent = () => {
  const { loading, error, openChess, username, activeTab, setActiveTab } = useChessContext();

  const handleTabChange = (newTab) => {
    if (newTab !== activeTab) {
      trackTabSwitch('chess', newTab, activeTab);
      setActiveTab(newTab);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} username={username} openChess={openChess} />;
  }

  return (
    <div className="chess-profile">
      <div className="chess-header">
        <h2>♟️ Chess.com</h2>
        <div className="chess-tabs">
          <button
            className={activeTab === ChessTabs.STATS ? 'active' : ''}
            onClick={() => handleTabChange(ChessTabs.STATS)}
          >
            Stats
          </button>
          <button
            className={activeTab === ChessTabs.GAMES ? 'active' : ''}
            onClick={() => handleTabChange(ChessTabs.GAMES)}
          >
            Recent Games
          </button>
        </div>
      </div>

      <div className="chess-content">
        {activeTab === ChessTabs.STATS && <StatsView />}
        {activeTab === ChessTabs.GAMES && <GamesView />}
      </div>

      <div className="chess-footer">
        <button onClick={() => {
          trackExternalLink('chess', `https://www.chess.com/member/${username}`, 'Chess.com Profile');
          openChess(`/member/${username}`);
        }}>
          View full profile on Chess.com ↗
        </button>
      </div>
    </div>
  );
};

const ChessProfile = () => {
  return (
    <ChessProvider>
      <ChessProfileContent />
    </ChessProvider>
  );
};

export default ChessProfile;
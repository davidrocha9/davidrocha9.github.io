import { useState, useEffect } from 'react';
import './ChessProfile.css';

const ChessProfile = ({ username = 'davidrocha_9' }) => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch profile
        const profileRes = await fetch(`https://api.chess.com/pub/player/${username}`);
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch stats
        const statsRes = await fetch(`https://api.chess.com/pub/player/${username}/stats`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        // Fetch recent games
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const gamesRes = await fetch(
          `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
        );
        if (gamesRes.ok) {
          const gamesData = await gamesRes.json();
          setGames((gamesData.games || []).slice(-10).reverse());
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const openChess = (path = '') => {
    window.open(`https://www.chess.com${path}`, '_blank', 'noopener,noreferrer');
  };

  const formatRating = (gameType) => {
    if (!stats || !stats[gameType]) return null;
    const data = stats[gameType].last;
    return data ? data.rating : null;
  };

  const getGameResult = (game) => {
    const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
    const result = isWhite ? game.white.result : game.black.result;
    if (result === 'win') return { text: 'Won', class: 'win' };
    if (result === 'lose' || result === 'checkmated' || result === 'timeout' || result === 'resigned') {
      return { text: 'Lost', class: 'loss' };
    }
    return { text: 'Draw', class: 'draw' };
  };

  if (loading) {
    return (
      <div className="chess-profile chess-loading">
        <div className="chess-spinner"></div>
        <p>Loading chess stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chess-profile chess-error">
        <p>⚠️ {error}</p>
        <button onClick={() => openChess(`/member/${username}`)}>
          View on Chess.com
        </button>
      </div>
    );
  }

  return (
    <div className="chess-profile">
      <div className="chess-header">
        <h2>♟️ Chess.com</h2>
        <div className="chess-tabs">
          <button
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
          <button
            className={activeTab === 'games' ? 'active' : ''}
            onClick={() => setActiveTab('games')}
          >
            Recent Games
          </button>
        </div>
      </div>

      <div className="chess-content">
        {activeTab === 'stats' && (
          <div className="chess-stats-view">
            {/* Profile Card */}
            <div className="profile-section">
              <div className="chess-avatar">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt={username} />
                ) : (
                  <span>♟️</span>
                )}
              </div>
              <div className="chess-username">{profile?.username || username}</div>
              {profile?.title && <div className="chess-title">{profile.title}</div>}
              {profile?.country && (
                <div className="chess-country">
                  {profile.country.split('/').pop()}
                </div>
              )}
            </div>

            {/* Ratings */}
            <div className="ratings-grid">
              {[
                { key: 'chess_rapid', label: '⏱️ Rapid', icon: '⏱️' },
                { key: 'chess_blitz', label: '⚡ Blitz', icon: '⚡' },
                { key: 'chess_bullet', label: '🔥 Bullet', icon: '🔥' },
                { key: 'chess_daily', label: '📅 Daily', icon: '📅' },
                { key: 'puzzle_rush', label: '🧩 Puzzles', icon: '🧩' },
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

            {/* Win/Loss Stats */}
            {stats?.chess_rapid?.record && (
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
            )}
          </div>
        )}

        {activeTab === 'games' && (
          <div className="chess-games-view">
            {games.length === 0 ? (
              <div className="no-games">No recent games this month</div>
            ) : (
              <div className="games-list">
                {games.map((game, index) => {
                  const result = getGameResult(game);
                  const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
                  const opponent = isWhite ? game.black.username : game.white.username;
                  const timeClass = game.time_class;
                  const date = new Date(game.end_time * 1000).toLocaleDateString();

                  return (
                    <div
                      key={index}
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
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="chess-footer">
        <button onClick={() => openChess(`/member/${username}`)}>
          View full profile on Chess.com ↗
        </button>
      </div>
    </div>
  );
};

export default ChessProfile;

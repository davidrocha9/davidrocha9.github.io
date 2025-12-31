import { useState, useEffect } from 'react';

export const useChessProfile = (username = 'davidrocha_9') => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return {
    profile,
    stats,
    games,
    loading,
    error,
    openChess,
    formatRating,
    getGameResult,
  };
};
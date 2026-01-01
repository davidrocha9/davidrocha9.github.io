import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const DataPrefetchContext = createContext(null);

// Cache for storing fetched data
const dataCache = new Map();

// API configuration with fetch functions
const createApiConfig = () => ({
  github: {
    username: 'davidrocha9',
    fetchData: async (username) => {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
      ]);

      if (!profileRes.ok) throw new Error('Failed to fetch GitHub profile');
      
      const profile = await profileRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];
      const pinnedRepos = repos.slice(0, 6);

      return { profile, repos, pinnedRepos };
    }
  },
  chess: {
    username: 'davidrocha_9',
    fetchData: async (username) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');

      const [profileRes, statsRes, gamesRes] = await Promise.all([
        fetch(`https://api.chess.com/pub/player/${username}`),
        fetch(`https://api.chess.com/pub/player/${username}/stats`),
        fetch(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`)
      ]);

      if (!profileRes.ok) throw new Error('Failed to fetch Chess profile');

      const profile = await profileRes.json();
      const stats = statsRes.ok ? await statsRes.json() : null;
      const gamesData = gamesRes.ok ? await gamesRes.json() : { games: [] };
      const games = (gamesData.games || []).slice(-10).reverse();

      return { profile, stats, games };
    }
  },
  letterboxd: {
    username: 'davidrocha9',
    fetchData: async (username) => {
      const corsProxy = 'https://api.allorigins.win/raw?url=';
      const feedUrl = `https://letterboxd.com/${username}/rss/`;
      const res = await fetch(corsProxy + encodeURIComponent(feedUrl));

      if (!res.ok) throw new Error(`Failed to fetch Letterboxd feed: ${res.status}`);

      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');

      const items = xml.querySelectorAll('item');
      const films = Array.from(items).slice(0, 20).map((item) => {
        const title = item.querySelector('title')?.textContent || '';
        const link = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';

        const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
        const image = imgMatch ? imgMatch[1] : null;
        const ratingMatch = title.match(/★+½?/);
        const rating = ratingMatch ? ratingMatch[0] : null;
        const cleanTitle = title.replace(/,?\s*\d{4}\s*-?\s*★*½?\s*$/, '').trim();
        const yearMatch = title.match(/(\d{4})/);
        const year = yearMatch ? yearMatch[1] : null;

        return {
          title: cleanTitle,
          year,
          rating,
          link,
          pubDate: new Date(pubDate).toLocaleDateString(),
          image,
        };
      });

      return { films };
    }
  },
  discogs: {
    username: 'davidrocha9',
    fetchData: async (username, page = 1) => {
      const res = await fetch(
        `https://api.discogs.com/users/${username}/collection/folders/0/releases?page=${page}&per_page=25&sort=added&sort_order=desc`,
        {
          headers: {
            'User-Agent': 'PersonalPortfolio/1.0',
          },
        }
      );

      if (!res.ok) throw new Error(`Discogs API error: ${res.status}`);

      const data = await res.json();
      return {
        releases: data.releases || [],
        pagination: data.pagination || null,
      };
    }
  }
});

export const DataPrefetchProvider = ({ children }) => {
  const [dataState, setDataState] = useState({
    github: { data: null, loading: true, error: null },
    chess: { data: null, loading: true, error: null },
    letterboxd: { data: null, loading: true, error: null },
    discogs: { data: null, loading: true, error: null },
  });

  const [globalLoading, setGlobalLoading] = useState(true);

  const apiConfig = useMemo(() => createApiConfig(), []);

  const fetchServiceData = useCallback(async (service, extraParams = {}) => {
    const config = apiConfig[service];
    if (!config) return;

    const cacheKey = `${service}-${JSON.stringify(extraParams)}`;
    
    // Check cache first
    if (dataCache.has(cacheKey)) {
      setDataState(prev => ({
        ...prev,
        [service]: { data: dataCache.get(cacheKey), loading: false, error: null }
      }));
      return;
    }

    setDataState(prev => ({
      ...prev,
      [service]: { ...prev[service], loading: true, error: null }
    }));

    try {
      const data = await config.fetchData(config.username, extraParams.page);
      dataCache.set(cacheKey, data);
      setDataState(prev => ({
        ...prev,
        [service]: { data, loading: false, error: null }
      }));
    } catch (error) {
      setDataState(prev => ({
        ...prev,
        [service]: { data: null, loading: false, error: error.message }
      }));
    }
  }, [apiConfig]);

  const refetchService = useCallback((service, extraParams = {}) => {
    const cacheKey = `${service}-${JSON.stringify(extraParams)}`;
    dataCache.delete(cacheKey);
    return fetchServiceData(service, extraParams);
  }, [fetchServiceData]);

  // Prefetch all data on mount
  useEffect(() => {
    // Start all fetches in parallel (don't block on them)
    fetchServiceData('github');
    fetchServiceData('chess');
    fetchServiceData('letterboxd');
    fetchServiceData('discogs');

    const minLoadTime = setTimeout(() => {
      setGlobalLoading(false);
    }, 3000);

    return () => clearTimeout(minLoadTime);
  }, [fetchServiceData]);

  const value = useMemo(() => ({
    ...dataState,
    globalLoading,
    refetchService,
    fetchServiceData,
    apiConfig,
  }), [dataState, globalLoading, refetchService, fetchServiceData, apiConfig]);

  return (
    <DataPrefetchContext.Provider value={value}>
      {children}
    </DataPrefetchContext.Provider>
  );
};

export const useDataPrefetch = () => {
  const context = useContext(DataPrefetchContext);
  if (!context) {
    throw new Error('useDataPrefetch must be used within a DataPrefetchProvider');
  }
  return context;
};

// Individual hooks that use prefetched data
export const usePrefetchedGitHub = () => {
  const { github, refetchService } = useDataPrefetch();
  
  const openGitHub = useCallback((url) => {
    const target = url || 'https://github.com/davidrocha9';
    window.open(target, '_blank', 'noopener,noreferrer');
  }, []);

  return {
    profile: github.data?.profile || null,
    repos: github.data?.repos || [],
    pinnedRepos: github.data?.pinnedRepos || [],
    loading: github.loading,
    error: github.error,
    openGitHub,
    refetch: () => refetchService('github'),
  };
};

export const usePrefetchedChess = () => {
  const { chess, refetchService, apiConfig } = useDataPrefetch();
  const username = apiConfig.chess.username;

  const openChess = useCallback((path = '') => {
    window.open(`https://www.chess.com${path}`, '_blank', 'noopener,noreferrer');
  }, []);

  const formatRating = useCallback((gameType) => {
    const stats = chess.data?.stats;
    if (!stats || !stats[gameType]) return null;
    const data = stats[gameType].last;
    return data ? data.rating : null;
  }, [chess.data?.stats]);

  const getGameResult = useCallback((game) => {
    const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
    const result = isWhite ? game.white.result : game.black.result;
    if (result === 'win') return { text: 'Won', class: 'win' };
    if (result === 'lose' || result === 'checkmated' || result === 'timeout' || result === 'resigned') {
      return { text: 'Lost', class: 'loss' };
    }
    return { text: 'Draw', class: 'draw' };
  }, [username]);

  return {
    profile: chess.data?.profile || null,
    stats: chess.data?.stats || null,
    games: chess.data?.games || [],
    loading: chess.loading,
    error: chess.error,
    username,
    openChess,
    formatRating,
    getGameResult,
    refetch: () => refetchService('chess'),
  };
};

export const usePrefetchedLetterboxd = () => {
  const { letterboxd, refetchService, apiConfig } = useDataPrefetch();
  const username = apiConfig.letterboxd.username;

  const openLetterboxd = useCallback((url) => {
    const target = url || `https://letterboxd.com/${username}/`;
    window.open(target, '_blank', 'noopener,noreferrer');
  }, [username]);

  return {
    films: letterboxd.data?.films || [],
    loading: letterboxd.loading,
    error: letterboxd.error,
    openLetterboxd,
    refetch: () => refetchService('letterboxd'),
  };
};

export const usePrefetchedDiscogs = () => {
  const { discogs, fetchServiceData, apiConfig } = useDataPrefetch();
  const username = apiConfig.discogs.username;
  const [page, setPage] = useState(1);

  const openDiscogs = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  // Fetch new page when page changes
  useEffect(() => {
    if (page > 1) {
      fetchServiceData('discogs', { page });
    }
  }, [page, fetchServiceData]);

  return {
    releases: discogs.data?.releases || [],
    pagination: discogs.data?.pagination || null,
    loading: discogs.loading,
    error: discogs.error,
    page,
    setPage,
    openDiscogs,
    username,
  };
};

export default DataPrefetchContext;

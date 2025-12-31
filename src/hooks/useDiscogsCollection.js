import { useState, useEffect } from 'react';

export const useDiscogsCollection = (username = 'davidrocha9') => {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.discogs.com/users/${username}/collection/folders/0/releases?page=${page}&per_page=25&sort=added&sort_order=desc`,
          {
            headers: {
              'User-Agent': 'PersonalPortfolio/1.0',
            },
          }
        );
        if (!res.ok) {
          throw new Error(`Discogs API error: ${res.status}`);
        }
        const data = await res.json();
        setReleases(data.releases || []);
        setPagination(data.pagination || null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [username, page]);

  const openDiscogs = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return {
    releases,
    loading,
    error,
    page,
    setPage,
    pagination,
    openDiscogs,
  };
};
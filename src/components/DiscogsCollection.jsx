import { useState, useEffect } from 'react';
import './DiscogsCollection.css';

const DiscogsCollection = ({ username = 'davidrocha9' }) => {
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

  if (loading) {
    return (
      <div className="discogs-collection discogs-loading">
        <div className="discogs-spinner"></div>
        <p>Loading collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="discogs-collection discogs-error">
        <p>⚠️ {error}</p>
        <button onClick={() => openDiscogs(`https://www.discogs.com/user/${username}/collection`)}>
          View on Discogs
        </button>
      </div>
    );
  }

  return (
    <div className="discogs-collection">
      <div className="discogs-header">
        <h2>🎵 Vinyl Collection</h2>
        <span className="discogs-count">
          {pagination ? `${pagination.items} records` : ''}
        </span>
      </div>

      <div className="discogs-grid">
        {releases.map((release) => {
          const info = release.basic_information;
          return (
            <div
              key={release.id}
              className="discogs-item"
              onClick={() => openDiscogs(`https://www.discogs.com/release/${info.id}`)}
              title={`${info.artists?.[0]?.name} - ${info.title}`}
            >
              <div className="discogs-cover">
                {info.cover_image && info.cover_image !== '' ? (
                  <img src={info.cover_image} alt={info.title} loading="lazy" />
                ) : (
                  <div className="discogs-no-cover">🎵</div>
                )}
              </div>
              <div className="discogs-info">
                <div className="discogs-title">{info.title}</div>
                <div className="discogs-artist">
                  {info.artists?.map((a) => a.name).join(', ')}
                </div>
                <div className="discogs-year">{info.year || 'Unknown'}</div>
              </div>
            </div>
          );
        })}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="discogs-pagination">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Prev
          </button>
          <span>
            Page {page} of {pagination.pages}
          </span>
          <button
            disabled={page >= pagination.pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}

      <div className="discogs-footer">
        <button onClick={() => openDiscogs(`https://www.discogs.com/user/${username}/collection`)}>
          View full collection on Discogs ↗
        </button>
      </div>
    </div>
  );
};

export default DiscogsCollection;

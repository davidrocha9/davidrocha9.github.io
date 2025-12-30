import { useState, useEffect } from 'react';
import './LetterboxdFeed.css';

const LetterboxdFeed = ({ username = 'davidrocha9' }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use a CORS proxy to fetch the RSS feed
        const corsProxy = 'https://api.allorigins.win/raw?url=';
        const feedUrl = `https://letterboxd.com/${username}/rss/`;
        const res = await fetch(corsProxy + encodeURIComponent(feedUrl));
        
        if (!res.ok) {
          throw new Error(`Failed to fetch feed: ${res.status}`);
        }
        
        const text = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        
        const items = xml.querySelectorAll('item');
        const parsedFilms = Array.from(items).slice(0, 20).map((item) => {
          const title = item.querySelector('title')?.textContent || '';
          const link = item.querySelector('link')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          const description = item.querySelector('description')?.textContent || '';
          
          // Extract image from description
          const imgMatch = description.match(/<img[^>]+src="([^"]+)"/);
          const image = imgMatch ? imgMatch[1] : null;
          
          // Extract rating (stars) from title
          const ratingMatch = title.match(/★+½?/);
          const rating = ratingMatch ? ratingMatch[0] : null;
          
          // Clean title (remove rating and year)
          const cleanTitle = title.replace(/,?\s*\d{4}\s*-?\s*★*½?\s*$/, '').trim();
          
          // Extract year
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
        
        setFilms(parsedFilms);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeed();
  }, [username]);

  const openLetterboxd = (url) => {
    const target = url || `https://letterboxd.com/${username}/`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return <span className="film-rating">{rating}</span>;
  };

  if (loading) {
    return (
      <div className="letterboxd-feed letterboxd-loading">
        <div className="letterboxd-spinner"></div>
        <p>Loading films...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="letterboxd-feed letterboxd-error">
        <p>⚠️ {error}</p>
        <button onClick={() => openLetterboxd()}>
          View on Letterboxd
        </button>
      </div>
    );
  }

  return (
    <div className="letterboxd-feed">
      <div className="letterboxd-header">
        <h2>🎬 Recent Films</h2>
        <span className="letterboxd-user">@{username}</span>
      </div>

      <div className="films-grid">
        {films.map((film, index) => (
          <div
            key={index}
            className="film-card"
            onClick={() => openLetterboxd(film.link)}
            title={`${film.title} (${film.year})`}
          >
            <div className="film-poster">
              {film.image ? (
                <img src={film.image} alt={film.title} loading="lazy" />
              ) : (
                <div className="film-no-poster">🎬</div>
              )}
            </div>
            <div className="film-info">
              <div className="film-title">{film.title}</div>
              <div className="film-meta">
                <span className="film-year">{film.year}</span>
                {renderStars(film.rating)}
              </div>
              <div className="film-date">Watched {film.pubDate}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="letterboxd-footer">
        <button onClick={() => openLetterboxd()}>
          View full profile on Letterboxd ↗
        </button>
      </div>
    </div>
  );
};

export default LetterboxdFeed;

import React from 'react';
import { usePrefetchedLetterboxd } from '@contexts/DataPrefetchContext';
import { FilmCard, Loading, Error } from '@components/hobbies/movies';
import '@components/hobbies/movies/LetterboxdFeed.css';
import { trackExternalLink } from '@/utils/analytics';

const LetterboxdFeed = ({ username = 'davidrocha9' }) => {
  const { films, loading, error, openLetterboxd } = usePrefetchedLetterboxd();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={() => openLetterboxd()} />;
  }

  return (
    <div className="letterboxd-feed">
      <div className="letterboxd-header">
        <h2>🎬 Recent Films</h2>
        <span className="letterboxd-user">@{username}</span>
      </div>

      <div className="films-grid">
        {films.map((film, index) => (
          <FilmCard
            key={index}
            film={film}
            onFilmClick={openLetterboxd}
          />
        ))}
      </div>

      <div className="letterboxd-footer">
        <button onClick={() => {
          trackExternalLink('letterboxd', `https://letterboxd.com/${username}/`, 'Letterboxd Profile');
          openLetterboxd();
        }}>
          View full profile on Letterboxd ↗
        </button>
      </div>
    </div>
  );
};

export default LetterboxdFeed;

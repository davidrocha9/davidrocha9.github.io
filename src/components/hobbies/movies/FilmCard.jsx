import React from 'react';

const FilmCard = ({ film, onFilmClick }) => {
  const renderStars = (rating) => {
    if (!rating) return null;
    return <span className="film-rating">{rating}</span>;
  };

  return (
    <div
      className="film-card"
      onClick={() => onFilmClick(film.link)}
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
  );
};

export default FilmCard;
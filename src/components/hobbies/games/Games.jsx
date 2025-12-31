import gamesData from '@assets/data/hobbies/games.json';
import '@components/hobbies/movies/LetterboxdFeed.css';

const Games = () => {
    const games = gamesData;

    const openGame = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="letterboxd-feed">
            <div className="letterboxd-header">
                <h2>🎮 Favorite Games</h2>
            </div>

            <div className="films-grid">
                {games.map((game, idx) => (
                    <div key={idx} className="film-card" onClick={() => openGame(game.link)} title={`${game.title} (${game.year})`}>
                        <div className="film-poster">
                            <img src={game.image} alt={game.title} loading="lazy" />
                        </div>
                        <div className="film-info">
                            <div className="film-title">{game.title}</div>
                            <div className="film-meta">
                                <span className="film-year">{game.year}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="letterboxd-footer">
                <button onClick={() => openGame('https://store.steampowered.com/')}>Browse on Steam ↗</button>
            </div>
        </div>
    );
};

export default Games;

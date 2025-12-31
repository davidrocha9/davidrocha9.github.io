
import '@components/hobbies/music/SpotifyPlayer.css';
import artists from '@components/hobbies/music/artists.json';
import albums from '@components/hobbies/music/albums.json';

const SpotifyPlayer = ({ username = 'davidrocha9' }) => {
  const openSpotify = (path = '') => {
    window.open(`https://open.spotify.com${path}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="spotify-player">
      <div className="spotify-header">
        <h2>Spotify</h2>
      </div>

      <div className="spotify-content">
        <div className="spotify-profile">
          <div className="spotify-profile-layout">
            <div className="left-column">
              <div className="profile-card">
                <div className="profile-avatar">🎧</div>
                <h3>{username}</h3>
                <p>Spotify Profile</p>
                <div className="profile-actions">
                  <button onClick={() => openSpotify(`/user/${username}`)}>
                    View Profile ↗
                  </button>
                  <button onClick={() => openSpotify(`/user/${username}/playlists`)}>
                    My Playlists ↗
                  </button>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="half-box artists-box">
                <div className="box-header">Top 10 Artists</div>
                <div className="scrollable-row">
                  {artists.map((a, i) => (
                    <div key={a.name} className="grid-item">
                      <img src={a.img} alt={a.name} />
                      <div className="item-name">{i + 1}. {a.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="half-box albums-box">
                <div className="box-header">Top 10 Albums</div>
                <div className="scrollable-row">
                  {albums.map((al, i) => (
                    <div key={al.title} className="grid-item">
                      <img src={al.img} alt={al.title} />
                      <div className="item-name">{i + 1}. {al.title}</div>
                      <div className="item-sub">{al.artist}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="spotify-footer">
        <button onClick={() => openSpotify(`/user/${username}`)}>
          Open Spotify ↗
        </button>
      </div>
    </div>
  );
};

export default SpotifyPlayer;

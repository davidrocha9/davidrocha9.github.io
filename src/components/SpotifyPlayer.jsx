import { useState } from 'react';
import './SpotifyPlayer.css';

const SpotifyPlayer = ({ username = 'davidrocha9' }) => {
  // Sample top artists and albums (static). Replace with real data when available.
  const topArtists = [
    { name: 'Kendrick Lamar', img: 'https://i.scdn.co/image/ab6761610000e5eb39ba6dcd4355c03de0b50918' },
    { name: 'Kanye West', img: 'https://i.scdn.co/image/ab6761610000e5eb6e835a500e791bf9c27a422a' },
    { name: 'Mac Miller', img: 'https://i.scdn.co/image/ab6761610000e5ebed3b89aa602145fde71a163a' },
    { name: 'Bad Bunny', img: 'https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13' },
    { name: 'MF DOOM', img: 'https://i.scdn.co/image/ab6761610000e5eb6c8167ef48a872b6f190078f' },
    { name: 'Tyler, The Creator', img: 'https://i.scdn.co/image/ab6761610000e5ebdf2728294ff77dd11eeb18fb' },
    { name: 'Joey Bada$$', img: 'https://i.scdn.co/image/ab6761610000e5ebae01fe0d10cd8ebb4707c461' },
    { name: 'Drake', img: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9' },
    { name: 'KAYTRANADA', img: 'https://i.scdn.co/image/ab6761610000e5eb9b9d4fdf5e4cf58e2fa93167' },
    { name: 'Sam The Kid', img: 'https://i.scdn.co/image/ab6761610000e5ebeba156a6addf0c509cd2be36' },
  ];

  const topAlbums = [
    { title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', img: 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1' },
    { title: 'Graduation', artist: 'Kanye West', img: 'https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a' },
    { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', img: 'https://i.scdn.co/image/ab67616d0000b27378de8b28de36a74afc0348b5' },
    { title: 'The College Dropout', artist: 'Kanye West', img: 'https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78' },
    { title: 'Swimming', artist: 'Mac Miller', img: 'https://i.scdn.co/image/ab67616d0000b273175c577a61aa13d4fb4b6534' },
    { title: 'Un Verano Sin Ti', artist: 'Bad Bunny', img: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72' },
    { title: 'DAMN.', artist: 'Kendrick Lamar', img: 'https://open.spotify.com/album/4eLPsYPBmXABThSJ821sqY?si=bibSJI0JSYiXl4k7lhoxEA' },
    { title: 'MM... Food', artist: 'MF DOOM', img: 'https://i.scdn.co/image/ab67616d0000b27352f194d02c39909d1b284799' },
    { title: 'Pratica(mente)', artist: 'Sam The Kid', img: 'https://i.scdn.co/image/ab67616d0000b273ea6c12ea04f909647223289d' },
    { title: 'Mixtakes', artist: 'ProfJam', img: 'https://i.scdn.co/image/ab67616d0000b27362b92ee6901c13e59b071b88' },
  ];

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
                  {topArtists.map((a, i) => (
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
                  {topAlbums.map((al, i) => (
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

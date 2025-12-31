const Error = ({ error, username, openDiscogs }) => (
  <div className="discogs-collection discogs-error">
    <p>⚠️ {error}</p>
    <button onClick={() => openDiscogs(`https://www.discogs.com/user/${username}/collection`)}>
      View on Discogs
    </button>
  </div>
);

export default Error;
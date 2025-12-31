const Error = ({ error, username, openChess }) => (
  <div className="chess-profile chess-error">
    <p>⚠️ {error}</p>
    <button onClick={() => openChess(`/member/${username}`)}>
      View on Chess.com
    </button>
  </div>
);

export default Error;
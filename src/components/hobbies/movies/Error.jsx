import React from 'react';

const Error = ({ message, onRetry }) => {
  return (
    <div className="letterboxd-feed letterboxd-error">
      <p>⚠️ {message}</p>
      <button onClick={onRetry}>
        View on Letterboxd
      </button>
    </div>
  );
};

export default Error;
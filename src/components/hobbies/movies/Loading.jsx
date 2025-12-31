import React from 'react';

const Loading = () => {
  return (
    <div className="letterboxd-feed letterboxd-loading">
      <div className="letterboxd-spinner"></div>
      <p>Loading films...</p>
    </div>
  );
};

export default Loading;
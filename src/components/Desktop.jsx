import React from 'react';
import '@components/Desktop.css';

const Desktop = () => {
  return (
    <div className="desktop">
      <div className="window" style={{ width: 300, margin: 20 }}>
        <div className="title-bar">
          <div className="title-bar-text">Welcome</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <p>Welcome to my portfolio!</p>
        </div>
      </div>
    </div>
  );
};

export default Desktop;

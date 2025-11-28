import React, { useState, useEffect } from 'react';
import '@components/Taskbar.css';
import xpLogo from '@assets/xp-logo.png';

const Taskbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="taskbar">
      <button className="start-button">
        <img src={xpLogo} alt="Windows Logo" />
        <span>Start</span>
      </button>

      <div className="task-list">
        <div className="task-item active">
          <span>Welcome</span>
        </div>
      </div>
      <div className="system-tray">
        <div className="clock">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default Taskbar;

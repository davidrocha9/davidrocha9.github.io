import xpLogo from '@assets/xp-logo.png';
import '@components/Taskbar.css';
import { useEffect, useState } from 'react';

const Taskbar = ({ openWindows = [], activeWindowId, setActiveWindowId, minimizedWindows = new Set(), setMinimizedWindows }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleTaskClick = (id) => {
    // If minimized, restore it
    if (minimizedWindows.has(id)) {
      const newMinimized = new Set(minimizedWindows);
      newMinimized.delete(id);
      setMinimizedWindows(newMinimized);
      setActiveWindowId(id);
      return;
    }
    // If already active and not minimized, minimize it
    if (activeWindowId === id) {
      const newMinimized = new Set(minimizedWindows);
      newMinimized.add(id);
      setMinimizedWindows(newMinimized);
      // Set another window as active
      const nonMinimized = openWindows.filter(w => w.id !== id && !newMinimized.has(w.id));
      setActiveWindowId(nonMinimized.length > 0 ? nonMinimized[nonMinimized.length - 1].id : null);
      return;
    }
    setActiveWindowId(id);
  };

  return (
    <div className="taskbar">
      <button className="start-button">
        <img src={xpLogo} alt="Windows Logo" className="start-logo" />
        <span className="start-text">start</span>
      </button>

      <div className="task-list">
        {openWindows.map((window) => (
          <div
            key={window.id}
            className={`task-item ${activeWindowId === window.id && !minimizedWindows.has(window.id) ? 'active' : ''}`}
            onClick={() => handleTaskClick(window.id)}
          >
            <img src={window.icon} alt={window.label} className="task-icon" />
            <span className="task-label">{window.label}</span>
          </div>
        ))}
      </div>
      <div className="system-tray">
        <div className="clock">{formatTime(time)}</div>
      </div>
    </div>
  );
};

export default Taskbar;

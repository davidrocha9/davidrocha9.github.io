import startButton from '@assets/icons/start_btn.png';
import welcomeIcon from '@assets/icons/welcome.webp';
import volumeIcon from '@assets/icons/volume.png';
import '@components/desktop/Taskbar.css';
import { useEffect, useState } from 'react';

const Taskbar = ({ openWindows = [], activeWindowId, setActiveWindowId, minimizedWindows = new Set(), setMinimizedWindows, showNotification, setShowNotification }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleTaskClick = (id) => {
    if (minimizedWindows.has(id)) {
      const newMinimized = new Set(minimizedWindows);
      newMinimized.delete(id);
      setMinimizedWindows(newMinimized);
      setActiveWindowId(id);
      return;
    }

    if (activeWindowId === id) {
      const newMinimized = new Set(minimizedWindows);
      newMinimized.add(id);
      setMinimizedWindows(newMinimized);
      const nonMinimized = openWindows.filter(w => w.id !== id && !newMinimized.has(w.id));
      setActiveWindowId(nonMinimized.length > 0 ? nonMinimized[nonMinimized.length - 1].id : null);
      return;
    }

    setActiveWindowId(id);
  };

  const handleWelcomeClick = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="taskbar">
      <div className="start-button">
        <img src={startButton} alt="Start" />
      </div>

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
        <img src={welcomeIcon} alt="Welcome" className="tray-icon" onClick={handleWelcomeClick} />
        <img src={volumeIcon} alt="Volume" className="tray-icon" />
        <div className="clock">{formatTime(time)}</div>
      </div>

      {showNotification && (
        <div className="welcome-notification" role="alert">
          <div className="notification-header">
            <div className="notification-info">
              <img src={welcomeIcon} alt="" className="notification-icon" />
              <span className="notification-title">Welcome to my portfolio!</span>
            </div>
            <div 
              className="notification-close" 
              onClick={handleCloseNotification}
              aria-label="Close notification"
            >
              ×
            </div>
          </div>
          <div className="notification-body">
            <p>I'm David Rocha, a 25 year-old software engineer with a passion for building cool stuff.</p>
            <p>Feel free to explore my portfolio and get in touch with me.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;

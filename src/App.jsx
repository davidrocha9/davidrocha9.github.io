import 'xp.css/dist/XP.css';
import './index.css';
import Taskbar from '@components/Taskbar';
import Desktop from '@components/Desktop';
import { useState, useEffect } from 'react';

function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState(new Set());
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setShowNotification(true);
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000); // Show for 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <Desktop 
        openWindows={openWindows}
        setOpenWindows={setOpenWindows}
        activeWindowId={activeWindowId}
        setActiveWindowId={setActiveWindowId}
        minimizedWindows={minimizedWindows}
        setMinimizedWindows={setMinimizedWindows}
      />
      <Taskbar 
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        setActiveWindowId={setActiveWindowId}
        minimizedWindows={minimizedWindows}
        setMinimizedWindows={setMinimizedWindows}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </div>
  );
}

export default App;

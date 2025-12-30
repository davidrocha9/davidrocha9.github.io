import 'xp.css/dist/XP.css';
import './index.css';
import Taskbar from '@components/Taskbar';
import Desktop from '@components/Desktop';
import { useState } from 'react';

function App() {
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState(new Set());

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
      />
    </div>
  );
}

export default App;

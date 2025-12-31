import 'xp.css/dist/XP.css';
import './index.css';
import Taskbar from '@/components/desktop/Taskbar';
import Desktop from '@/components/desktop/Desktop';
import { WindowProvider } from '@contexts/WindowContext';

function App() {
  return (
    <div className="app-container">
      <WindowProvider>
        <Desktop />
        <Taskbar />
      </WindowProvider>
    </div>
  );
}

export default App;

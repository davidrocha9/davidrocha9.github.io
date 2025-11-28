import 'xp.css/dist/XP.css';
import './index.css';
import Taskbar from '@components/Taskbar';
import Desktop from '@components/Desktop';

function App() {
  return (
    <div className="app-container">
      <Desktop />
      <Taskbar />
    </div>
  );
}

export default App;

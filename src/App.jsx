import 'xp.css/dist/XP.css';
import './index.css';
import Taskbar from '@/components/desktop/Taskbar';
import Desktop from '@/components/desktop/Desktop';
import DesktopLoading from '@/components/desktop/DesktopLoading';
import { useDataPrefetch } from '@contexts/DataPrefetchContext';
import { WindowProvider } from '@contexts/WindowContext';
import { DataPrefetchProvider } from '@contexts/DataPrefetchContext';

function App() {
  return (
    <div className="app-container">
      <DataPrefetchProvider>
        <WindowProvider>
          <DesktopLoader />
          <TaskbarContainer />
        </WindowProvider>
      </DataPrefetchProvider>
    </div>
  );
}

export default App;

function DesktopLoader() {
  const { globalLoading } = useDataPrefetch();
  
  return globalLoading ? <DesktopLoading /> : <Desktop />;
}

function TaskbarContainer() {
  const { globalLoading } = useDataPrefetch();

  return globalLoading ? null : <Taskbar />;
}

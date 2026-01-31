import 'xp.css/dist/XP.css';
import './index.css';
import Taskbar from '@/components/desktop/Taskbar';
import Desktop from '@/components/desktop/Desktop';
import DesktopLoading from '@/components/desktop/DesktopLoading';
import { useDataPrefetch } from '@contexts/DataPrefetchContext';
import { WindowProvider } from '@contexts/WindowContext';
import { DataPrefetchProvider } from '@contexts/DataPrefetchContext';
import { trackPageAccess } from '@/utils/analytics';
import { useEffect } from 'react';

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
  
  useEffect(() => {
    // Track page access when portfolio loads
    if (!globalLoading) {
      trackPageAccess();
    }
  }, [globalLoading]);
  
  return globalLoading ? <DesktopLoading /> : <Desktop />;
}

function TaskbarContainer() {
  const { globalLoading } = useDataPrefetch();

  return globalLoading ? null : <Taskbar />;
}

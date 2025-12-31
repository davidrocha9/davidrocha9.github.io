import '@components/desktop/Desktop.css';
import '@components/browser/BrowserWindow.css';
import '@components/common/DocumentViewer.css';
import '@components/mail/MailWindow.css';

import Window from '@/components/desktop/Window';
import DesktopIcons from '@/components/desktop/DesktopIcons';
import WindowContent from '@/components/desktop/WindowContent';

import { DesktopProvider } from '@contexts/DesktopContext';
import { useDesktopContext } from '@contexts/DesktopContext';

const DesktopContent = () => {
  const {
    handleDesktopClick,
    openWindows,
    minimizedWindows,
  } = useDesktopContext();

    return (
      <div className="desktop" onClick={handleDesktopClick}>
        <DesktopIcons />

        {openWindows.filter(win => !minimizedWindows.has(win.id)).map((win, index) => {
          return (
            <Window
              key={win.id}
              id={win.id}
            >
              <WindowContent win={win} />
            </Window>
          );
        })}
      </div>
    );
  };

  const Desktop = () => {
    return (
      <DesktopProvider>
        <DesktopContent />
      </DesktopProvider>
    );
  };

export default Desktop;

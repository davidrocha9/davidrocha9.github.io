import { useBrowserWindow } from '@hooks';
import { MenuBar, Toolbar, AddressBar, Content } from '@components/browser';

const BrowserWindow = ({ url, title, icon }) => {
  const {
    currentUrl,
    inputUrl,
    setInputUrl,
    setIsLoading,
    maybeBlocked,
    setMaybeBlocked,
    iframeRef,
    handleGo,
    handleKeyDown,
    openExternally,
  } = useBrowserWindow(url);

  return (
    <div className="browser-window">
      <div className="window-toolbar-wrapper">
        <MenuBar />
        <Toolbar />
        <AddressBar
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          handleGo={handleGo}
          handleKeyDown={handleKeyDown}
          icon={icon}
        />
      </div>
      <Content
        currentUrl={currentUrl}
        title={title}
        iframeRef={iframeRef}
        setIsLoading={setIsLoading}
        setMaybeBlocked={setMaybeBlocked}
        maybeBlocked={maybeBlocked}
        openExternally={openExternally}
      />
    </div>
  );
};

export { BrowserWindow };

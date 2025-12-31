const Content = ({ currentUrl, title, iframeRef, setIsLoading, setMaybeBlocked, maybeBlocked, openExternally }) => {
  return (
    <div className="browser-content">
      <iframe
        ref={iframeRef}
        src={currentUrl}
        title={title || 'Browser'}
        onLoad={() => {
          setIsLoading(false);
          setMaybeBlocked(false);
        }}
        onError={() => {
          setIsLoading(false);
          setMaybeBlocked(true);
        }}
      />

      {maybeBlocked && (
        <div className="browser-blocked-overlay">
          <div className="browser-blocked-title">This site refused to be embedded</div>
          <div className="browser-blocked-message">Some websites prevent embedding for security reasons (X-Frame-Options or Content-Security-Policy). Open the site in a new tab instead.</div>
          <div className="browser-blocked-buttons">
            <button className="toolbar-btn" onClick={() => openExternally()}>Open in new tab</button>
            <button className="toolbar-btn" onClick={() => setMaybeBlocked(false)}>Continue trying</button>
          </div>
        </div>
      )}
    </div>
  );
};

export { Content };
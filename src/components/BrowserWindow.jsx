import { useState, useRef, useEffect } from 'react';
import xpIcon from '../assets/xp-logo.png';
import backIcon from '../assets/icons/back.png';
import forwardIcon from '../assets/icons/forward.png';
import searchIcon from '../assets/icons/search.png';
import goIcon from '../assets/icons/go.png';
import ieRefresh from '../assets/icons/ie-refresh.png';
import ieStop from '../assets/icons/ie-stop.png';
import ieHome from '../assets/icons/ie-home.png';
import favoritesIcon from '../assets/icons/favorites.png';
import ieHistory from '../assets/icons/ie-history.png';
import emailIcon from '../assets/icons/email.png';
import faxIcon from '../assets/icons/fax.png';
import windowsMessengerIcon from '../assets/icons/windows-messenger.png';

const BrowserWindow = ({ url, title, icon }) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [inputUrl, setInputUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);
  const [maybeBlocked, setMaybeBlocked] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleGo = () => {
    setCurrentUrl(inputUrl);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  const openExternally = (u) => {
    const target = u || currentUrl;
    try {
      window.open(target, '_blank', 'noopener,noreferrer');
    } catch (e) {
      // fallback
      window.location.href = target;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setMaybeBlocked(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // If the target explicitly disallows framing (e.g. sites with X-Frame-Options),
    // the timeout fallback below will handle it by opening externally.

    // If iframe hasn't loaded after 2500ms, show the "maybe blocked" overlay
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setMaybeBlocked(true);
        // auto-open externally when embedding appears blocked
        openExternally();
      }
    }, 2500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentUrl]);

  return (
    <div className="browser-window">
      <div className="window-toolbar-wrapper">
        {/* Menu bar - same as folder */}
        <div className="menu-bar">
          <div className="menu-items">
            <span>File</span>
            <span>View</span>
            <span>Favorites</span>
            <span>Tools</span>
            <span>Help</span>
          </div>
          <div className="menu-xp-icon">
            <img src={xpIcon} className="folder-icon-small" style={{ width: '22px', height: '22px' }} />
          </div>
        </div>

        {/* Toolbar - same as folder */}
        <div className="toolbar">
          <div className="nav-buttons-group">
            <div className="nav-btn back-btn">
              <img src={backIcon} style={{ width: '24px', height: '24px' }} />
              <span className="btn-text">Back</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            <div className="nav-btn-dropdown">
              <img src={forwardIcon} style={{ width: '24px', height: '24px' }} />
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>

          <div className="toolbar-separator"></div>

          <div className="toolbar-icon-btn">
            <img src={ieRefresh} style={{ width: '24px', height: '24px' }} />
          </div>

          <div className="toolbar-icon-btn">
            <img src={ieStop} style={{ width: '24px', height: '24px' }} />
          </div>

          <div className="toolbar-icon-btn">
            <img src={ieHome} style={{ width: '24px', height: '24px' }} />
          </div>

          <div className="toolbar-separator"></div>

          <div className="toolbar-icon-btn">
            <img src={searchIcon} style={{ width: '24px', height: '24px' }} />
            <span className="btn-text">Search</span>
          </div>

          <div className="toolbar-icon-btn">
            <img src={favoritesIcon} style={{ width: '24px', height: '24px' }} />
            <span className="btn-text">Favorites</span>
          </div>

          <div className="toolbar-icon-btn">
            <img src={ieHistory} style={{ width: '24px', height: '24px' }} />
          </div>

          <div className="toolbar-separator"></div>

          <div className="nav-btn back-btn">
            <img src={emailIcon} style={{ width: '24px', height: '24px' }} />
            <span className="dropdown-arrow">▼</span>
          </div>
          
          <div className="toolbar-icon-btn">
            <img src={faxIcon} style={{ width: '24px', height: '24px' }} />
          </div>

          <div className="toolbar-icon-btn">
            <img src={windowsMessengerIcon} style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        {/* Address bar - use same structure/classes as FolderToolbar */}
        <div className="address-bar">
          <span className="address-label">Address</span>
          <div className="address-input">
            <img src={icon || xpIcon} className="folder-icon-small" style={{ width: '20px', height: '20px' }} />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="address-text browser-address-text-input"
            />
          </div>
          <div className="go-button" onClick={handleGo}>
            <img src={goIcon} style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
      </div>

      {/* Browser content */}
      <div className="browser-content" style={{ position: 'relative' }}>
        <iframe
          ref={iframeRef}
          src={currentUrl}
          title={title || 'Browser'}
          onLoad={() => {
            setIsLoading(false);
            setMaybeBlocked(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onError={() => {
            setIsLoading(false);
            setMaybeBlocked(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />

        {maybeBlocked && (
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>This site refused to be embedded</div>
            <div style={{ maxWidth: 600, color: '#333' }}>Some websites prevent embedding for security reasons (X-Frame-Options or Content-Security-Policy). Open the site in a new tab instead.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="toolbar-btn" onClick={() => openExternally()} style={{ padding: '6px 10px' }}>Open in new tab</button>
              <button className="toolbar-btn" onClick={() => setMaybeBlocked(false)} style={{ padding: '6px 10px' }}>Continue trying</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserWindow;

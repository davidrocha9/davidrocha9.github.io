import {
  backIcon,
  forwardIcon,
  ieRefresh,
  ieStop,
  ieHome,
  searchIcon,
  favoritesIcon,
  ieHistory,
  emailIcon,
  faxIcon,
  windowsMessengerIcon,
} from '@assets';

const Toolbar = () => {
  return (
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
  );
};

export { Toolbar };
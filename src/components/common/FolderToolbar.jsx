import {
  xpIcon,
  backIcon,
  forwardIcon,
  folderUpIcon,
  searchIcon,
  folderViewIcon,
  folderViewClassicIcon,
  goIcon,
} from '@assets';

const FolderToolbar = ({ window }) => {
  return (
    <div className="window-toolbar-wrapper">
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
          <div className="nav-btn up-btn">
            <img src={folderUpIcon} style={{ width: '24px', height: '24px' }} />
          </div>
        </div>

        <div className="toolbar-separator"></div>

        <div className="toolbar-icon-btn">
          <img src={searchIcon} style={{ width: '24px', height: '24px' }} />
          <span className="btn-text">Search</span>
        </div>
        <div className="toolbar-icon-btn">
          <img src={folderViewIcon} style={{ width: '24px', height: '24px' }} />
          <span className="btn-text">Folders</span>
        </div>

        <div className="toolbar-separator"></div>

        <div className="views-btn">
          <img src={folderViewClassicIcon} style={{ width: '24px', height: '24px' }} />
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>

      <div className="address-bar">
        <span className="address-label">Address</span>
        <div className="address-input">
          <img src={window.icon} className="folder-icon-small" style={{ width: '20px', height: '20px' }} />
          <span className="address-text">C:\Desktop\{window.label}</span>
        </div>
        <div className="go-button">
          <img src={goIcon} style={{ width: '24px', height: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default FolderToolbar;

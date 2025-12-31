import {
  startMenuProgramsAltIcon,
  programsIcon,
  searchIcon,
  myComputerIcon,
  myPicturesIcon,
  myMusicIcon,
  myNetworkPlacesIcon,
  newFolderIcon,
  publishToWebIcon,
  sharedFolderIcon,
} from '@assets';

const FolderSidebar = () => {
  return (
    <div className="window-sidebar">
      <div className="sidebar-content-wrapper">
        <div className="sidebar-section">
          <div className="sidebar-header">
            <span className="sidebar-header-text">System Tasks</span>
            <div className="sidebar-header-icon">
              <div className="chevron-up"></div>
            </div>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-item">
              <img src={startMenuProgramsAltIcon} className="sidebar-item-icon"/>
              <span className="sidebar-item-text">Hide the contents of this drive</span>
            </div>
            <div className="sidebar-item">
              <img src={programsIcon} className="sidebar-item-icon"/>
              <span className="sidebar-item-text">Add or remove programs</span>
            </div>
            <div className="sidebar-item">
              <img src={searchIcon} className="sidebar-item-icon"/>
              <span className="sidebar-item-text">Search for files or folders</span>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-header">
            <span className="sidebar-header-text">Other Places</span>
            <div className="sidebar-header-icon">
              <div className="chevron-up"></div>
            </div>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-item">
              <img src={myComputerIcon} className="sidebar-item-icon"/>
              <span className="sidebar-item-text">My Computer</span>
            </div>
            <div className="sidebar-item">
              <img src={myPicturesIcon} className="sidebar-item-icon"/>
              <span className="sidebar-item-text">My Pictures</span>
            </div>
            <div className="sidebar-item">
              <img src={myMusicIcon} className="sidebar-item-icon"/>
              <span className="sidebar-item-text">My Music</span>
            </div>
            <div className="sidebar-item">
              <img src={myNetworkPlacesIcon} className="sidebar-item-icon"/>
              <span className="sidebar-item-text">My Network Places</span>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-header">
            <span className="sidebar-header-text">File and Folder Tasks</span>
            <div className="sidebar-header-icon">
              <div className="chevron-up"></div>
            </div>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-item">
              <img src={newFolderIcon} className="sidebar-item-icon" alt="New Folder" />
              <span className="sidebar-item-text">Make a new folder</span>
            </div>
            <div className="sidebar-item">
              <img src={publishToWebIcon} className="sidebar-item-icon" alt="Publish to Web" />
              <span className="sidebar-item-text">Publish this folder to the Web</span>
            </div>
            <div className="sidebar-item">
              <img src={sharedFolderIcon} className="sidebar-item-icon" alt="Share this folder" />
              <span className="sidebar-item-text">Share this folder</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderSidebar;

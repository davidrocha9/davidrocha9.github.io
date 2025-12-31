import { xpIcon } from '@assets';

const MenuBar = () => {
  return (
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
  );
};

export { MenuBar };
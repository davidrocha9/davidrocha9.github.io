import React from 'react';
import { useDesktopContext } from '@contexts/DesktopContext';

const DesktopIcons = () => {
  const { icons = [], selectedIconId, handleIconMouseDown, handleIconClick, handleIconDoubleClick } = useDesktopContext();

  return (
    <div className="desktop-icons">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`desktop-icon ${selectedIconId === icon.id ? 'selected' : ''}`}
          onMouseDown={handleIconMouseDown}
          onClick={(e) => handleIconClick(icon.id, e)}
          onDoubleClick={(e) => handleIconDoubleClick(icon, e)}
        >
          <div className="icon-image">
            <img src={icon.icon} alt={icon.label} draggable={false} />
          </div>
          <div className="icon-label">{icon.label}</div>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;

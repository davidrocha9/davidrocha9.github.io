import { useRef } from 'react';
import { useDesktopContext } from '@contexts/DesktopContext';
import { trackFolderFileOpen } from '@/utils/analytics';

const FolderFiles = ({ files, folderName = 'Unknown Folder' }) => {
  const { selectedIconId, handleIconMouseDown, handleIconClick, handleIconDoubleClick } = useDesktopContext();
  const mouseDownPos = useRef(null);
  const DRAG_THRESHOLD = 5;

  const handleMouseDown = (e) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
    if (typeof handleIconMouseDown === 'function') handleIconMouseDown(e);
  };

  const handleClick = (id, e) => {
    if (mouseDownPos.current) {
      const dx = Math.abs(e.clientX - mouseDownPos.current.x);
      const dy = Math.abs(e.clientY - mouseDownPos.current.y);
      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        mouseDownPos.current = null;
        return;
      }
    }
    if (typeof handleIconClick === 'function') handleIconClick(id, e);
  };

  const handleDoubleClick = (item, e) => {
    if (mouseDownPos.current) {
      const dx = Math.abs(e.clientX - mouseDownPos.current.x);
      const dy = Math.abs(e.clientY - mouseDownPos.current.y);
      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        mouseDownPos.current = null;
        return;
      }
    }
    // Track folder file open
    trackFolderFileOpen(folderName, item.label, item.type, item.id);
    if (typeof handleIconDoubleClick === 'function') handleIconDoubleClick(item, e);
  };

  return (
    <div className="window-main-view">
      <div className="window-icons">
        {files.map((item) => (
          <div
            key={item.id}
            className={`desktop-icon window-view-icon ${selectedIconId === item.id ? 'selected' : ''}`}
            onMouseDown={handleMouseDown}
            onClick={(e) => handleClick(item.id, e)}
            onDoubleClick={(e) => handleDoubleClick(item, e)}
          >
            <div className="icon-image">
              <img src={item.icon} alt={item.label} style={{ width: '50px', height: '50px' }} draggable={false} />
            </div>
            <div className="icon-info">
              <div className="icon-label" style={{ color: 'black', textShadow: 'none', textAlign: 'left' }}>
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderFiles;

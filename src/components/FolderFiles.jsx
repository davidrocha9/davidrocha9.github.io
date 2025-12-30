import { useRef } from 'react';

const FolderFiles = ({ files, selectedIconId, onIconClick, onIconDoubleClick }) => {
  const mouseDownPos = useRef(null);
  const DRAG_THRESHOLD = 5;

  const handleMouseDown = (e) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
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
    onIconClick(id, e);
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
    onIconDoubleClick(item, e);
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

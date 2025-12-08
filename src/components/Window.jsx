import React, { useState, useEffect, useRef } from 'react';

const Window = ({ 
  title, 
  icon, 
  onClose, 
  children, 
  initialPosition = { x: 200, y: 50 }, 
  initialSize = { width: 600, height: 500 }, 
  zIndex, 
  onFocus 
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowStartPos = useRef({ x: 0, y: 0 });
  const windowStartSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStartPos.current.x;
        const dy = e.clientY - dragStartPos.current.y;
        
        let newX = windowStartPos.current.x + dx;
        let newY = windowStartPos.current.y + dy;

        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - 30 - size.height;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setPosition({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const dx = e.clientX - dragStartPos.current.x;
        const dy = e.clientY - dragStartPos.current.y;
        
        let newWidth = windowStartSize.current.width;
        let newHeight = windowStartSize.current.height;
        let newX = windowStartPos.current.x;
        let newY = windowStartPos.current.y;

        if (resizeDirection.includes('e')) {
          newWidth += dx;
          if (newX + newWidth > window.innerWidth) {
            newWidth = window.innerWidth - newX;
          }
        }
        
        if (resizeDirection.includes('w')) {
          newWidth -= dx;
          const rightEdge = windowStartPos.current.x + windowStartSize.current.width;
          if (rightEdge - newWidth < 0) {
             newWidth = rightEdge;
          }
        }

        if (resizeDirection.includes('s')) {
          newHeight += dy;
          if (newY + newHeight > window.innerHeight - 30) {
            newHeight = (window.innerHeight - 30) - newY;
          }
        }
        
        if (resizeDirection.includes('n')) {
          newHeight -= dy;
          const bottomEdge = windowStartPos.current.y + windowStartSize.current.height;
          if (bottomEdge - newHeight < 0) {
            newHeight = bottomEdge;
          }
        }

        if (newWidth < 600) newWidth = 600;
        if (newHeight < 500) newHeight = 500;

        if (resizeDirection.includes('w')) {
          newX = (windowStartPos.current.x + windowStartSize.current.width) - newWidth;
        }
        if (resizeDirection.includes('n')) {
          newY = (windowStartPos.current.y + windowStartSize.current.height) - newHeight;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDirection, size]);

  const handleMouseDown = () => {
    if (onFocus) onFocus();
  };

  const startDrag = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = { ...position };
  };

  const startResize = (direction, e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = { ...position };
    windowStartSize.current = { ...size };
  };

  return (
    <div 
      className="window" 
      style={{ 
        left: position.x, 
        top: position.y, 
        width: size.width, 
        height: size.height,
        zIndex: zIndex,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="resize-handle n" onMouseDown={(e) => startResize('n', e)} />
      <div className="resize-handle s" onMouseDown={(e) => startResize('s', e)} />
      <div className="resize-handle e" onMouseDown={(e) => startResize('e', e)} />
      <div className="resize-handle w" onMouseDown={(e) => startResize('w', e)} />
      <div className="resize-handle ne" onMouseDown={(e) => startResize('ne', e)} />
      <div className="resize-handle nw" onMouseDown={(e) => startResize('nw', e)} />
      <div className="resize-handle se" onMouseDown={(e) => startResize('se', e)} />
      <div className="resize-handle sw" onMouseDown={(e) => startResize('sw', e)} />

      <div className="title-bar" onMouseDown={startDrag} style={{ userSelect: 'none', cursor: 'default' }}>
        <div className="title-bar-text" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={icon} alt={title} style={{ width: 25, height: 25 }} />
          {title}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '0px 3px' }}>
        {children}
      </div>
    </div>
  );
};

export default Window;

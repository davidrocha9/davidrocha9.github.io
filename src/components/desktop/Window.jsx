import React, { useState, useEffect, useRef } from 'react';
import { useDesktopContext } from '@contexts/DesktopContext';
import WindowTypes from '../../enums/WindowTypes';

const Window = ({ 
  id,
  children
}) => {
  const { openWindows, minimizedWindows, activeWindowId, closeWindow, minimizeWindow, handleWindowFocus } = useDesktopContext();

  const win = openWindows.find(w => w.id === id);
  if (!win) return null;

  const visibleWindows = openWindows.filter(w => !minimizedWindows.has(w.id));
  const index = visibleWindows.findIndex(w => w.id === id);

  const TASKBAR_HEIGHT = 30;
  const MARGIN = 20;

  const defaultWidth = win.type === WindowTypes.PDF ? 800 : 1000;
  const defaultHeight = win.type === WindowTypes.PDF ? 1000 : 800;
  const winWidth = (win.initialSize && win.initialSize.width) || defaultWidth;
  const winHeight = (win.initialSize && win.initialSize.height) || defaultHeight;

  const cascadeOffset = 40;
  const baseX = 100;
  const baseY = 30;
  const startX = baseX + index * cascadeOffset;
  const startY = baseY + index * cascadeOffset;

  const maxLeft = Math.max(0, window.innerWidth - winWidth - MARGIN);
  const maxTop = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - winHeight - MARGIN);

  const posX = Math.max(0, Math.min(startX, maxLeft));
  const posY = Math.max(0, Math.min(startY, maxTop));

  const initialPosition = { x: posX, y: posY };
  const initialSize = win.initialSize || { width: winWidth, height: winHeight };
  const maxSize = win.maxSize;
  const zIndex = activeWindowId === id ? 200 : 100 + index;
  const title = win.label;
  const icon = win.icon;
  const onClose = () => closeWindow(id);
  const onMinimize = () => minimizeWindow(id);
  const onFocus = () => handleWindowFocus(id);

  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowStartPos = useRef({ x: 0, y: 0 });
  const windowStartSize = useRef({ width: 0, height: 0 });
  const preMaximizeState = useRef({ position: null, size: null });

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
          if (maxSize && newWidth > maxSize.width) {
            newWidth = maxSize.width;
          }
          if (newX + newWidth > window.innerWidth) {
            newWidth = Math.min(newWidth, window.innerWidth - newX);
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
          if (maxSize && newHeight > maxSize.height) {
            newHeight = maxSize.height;
          }
          if (newY + newHeight > window.innerHeight - 30) {
            newHeight = Math.min(newHeight, (window.innerHeight - 30) - newY);
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

        if (maxSize) {
          if (newWidth > maxSize.width) newWidth = maxSize.width;
          if (newHeight > maxSize.height) newHeight = maxSize.height;
        }

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
  }, [isDragging, isResizing, resizeDirection, size, maxSize]);

  const handleMouseDown = () => {
    if (onFocus) onFocus();
  };

  const startDrag = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    if (isMaximized) return;
    e.preventDefault();
    
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = { ...position };
  };

  const startResize = (direction, e) => {
    if (isMaximized) return;
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    windowStartPos.current = { ...position };
    windowStartSize.current = { ...size };
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    if (onMinimize) onMinimize();
  };

  const handleMaximize = (e) => {
    e.stopPropagation();
    if (isMaximized) {
      // Restore
      if (preMaximizeState.current.position && preMaximizeState.current.size) {
        setPosition(preMaximizeState.current.position);
        setSize(preMaximizeState.current.size);
      }
      setIsMaximized(false);
    } else {
      preMaximizeState.current = { position: { ...position }, size: { ...size } };

      const desktopEl = document.querySelector('.desktop');
      if (desktopEl) {
        const availW = desktopEl.clientWidth - 20;
        const availH = desktopEl.clientHeight;
        
        setPosition({ x: 0, y: 0 });
        setSize({ width: availW, height: availH });
      } else {
        const maxW = maxSize ? Math.min(window.innerWidth, maxSize.width) : window.innerWidth;
        const maxH = maxSize ? Math.min(window.innerHeight - 30, maxSize.height) : window.innerHeight - 30;
        setPosition({ x: 0, y: 0 });
        setSize({ width: maxW, height: maxH });
      }
      setIsMaximized(true);
    }
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
        flexDirection: 'column',
        maxWidth: isMaximized ? undefined : (maxSize ? `${maxSize.width}px` : undefined),
        maxHeight: isMaximized ? undefined : (maxSize ? `${maxSize.height}px` : undefined),
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

      <div className="title-bar" onMouseDown={startDrag} onDoubleClick={handleMaximize} style={{ userSelect: 'none', cursor: 'default' }}>
        <div className="title-bar-text" style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Tahoma, sans-serif' }}>
          <img src={icon} alt={title} style={{ width: 16, height: 16 }} />
          {title}
        </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={handleMinimize}></button>
          <button aria-label={isMaximized ? "Restore" : "Maximize"} onClick={handleMaximize}></button>
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

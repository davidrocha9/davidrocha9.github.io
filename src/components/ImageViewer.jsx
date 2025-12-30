import '@components/ImageViewer.css';
import React, { useState } from 'react';

const ImageViewer = ({ src, title }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoom((prev) => Math.max(prev - 0.2, 0.2));
  };

  const handleRotateClockwise = (e) => {
    e.stopPropagation();
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleRotateCounterClockwise = (e) => {
    e.stopPropagation();
    setRotation((prev) => (prev - 90) % 360);
  };

  return (
    <div className="image-viewer">
      {/* Main Image Area */}
      <div className="image-viewer-main">
        <div 
          className="image-viewer-content"
          style={{ 
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        >
          <img 
            src={src} 
            alt={title} 
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom Toolbar - Windows XP Picture and Fax Viewer style */}
      <div className="image-viewer-toolbar">
        <div className="image-viewer-toolbar-container">
           {/* Zoom and Size */}
           <button 
             onClick={handleZoomIn}
             className="image-viewer-toolbar-button zoom-button"
             title="Zoom In"
             aria-label="Zoom In"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="11" cy="11" r="8"></circle>
               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
               <line x1="11" y1="8" x2="11" y2="14"></line>
               <line x1="8" y1="11" x2="14" y2="11"></line>
             </svg>
           </button>
           <button 
             onClick={handleZoomOut}
             className="image-viewer-toolbar-button zoom-button"
             title="Zoom Out"
             aria-label="Zoom Out"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <circle cx="11" cy="11" r="8"></circle>
               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
               <line x1="8" y1="11" x2="14" y2="11"></line>
             </svg>
           </button>

           <div className="image-viewer-toolbar-separator"></div>

           {/* Rotation */}
           <button 
             onClick={handleRotateCounterClockwise}
             className="image-viewer-toolbar-button zoom-button"
             title="Rotate Counter-clockwise"
             aria-label="Rotate Counter-clockwise"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
               <path d="M3 3v5h5"/>
             </svg>
           </button>
           <button 
             onClick={handleRotateClockwise}
             className="image-viewer-toolbar-button zoom-button"
             title="Rotate Clockwise"
             aria-label="Rotate Clockwise"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
               <path d="M21 3v5h-5"/>
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;


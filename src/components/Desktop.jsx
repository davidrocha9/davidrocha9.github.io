import '@components/Desktop.css';
import experienceIcon from '../assets/icons/experience.png';
import educationIcon from '../assets/icons/education.png';
import projectsIcon from '../assets/icons/projects.png';
import hobbiesIcon from '../assets/icons/hobbies.png';
import biographyIcon from '../assets/icons/biography.png';
import pdfIcon from '../assets/icons/pdf.png';
import arkadiumPdf from '../pdf/arkadium.pdf';
import beyourbestPdf from '../pdf/beyourbest.pdf';
import zerozeroPdf from '../pdf/zerozero.pdf';

import { useState } from 'react';
import Window from './Window';
import FolderWindow from './FolderWindow';
import PDFViewer from './PDFViewer';

const Desktop = () => {
  const icons = [
    { id: 1, label: 'Experience', icon: experienceIcon, type: 'folder' },
    { id: 2, label: 'Education', icon: educationIcon, type: 'folder' },
    { id: 3, label: 'Projects', icon: projectsIcon, type: 'folder' },
    { id: 4, label: 'Hobbies', icon: hobbiesIcon, type: 'folder' },
    { id: 5, label: 'Biography', icon: biographyIcon, type: 'folder' },
  ];

  const experienceContent = [
    { id: 'pdf-beyourbest', label: 'beyourbest.pdf', icon: pdfIcon, type: 'pdf', title: 'BeYourBest - Work Experience', pdfUrl: beyourbestPdf },
    { id: 'pdf-arkadium', label: 'arkadium.pdf', icon: pdfIcon, type: 'pdf', title: 'Arkadium - Work Experience', pdfUrl: arkadiumPdf },
    { id: 'pdf-zerozero', label: 'zerozero.pdf', icon: pdfIcon, type: 'pdf', title: 'ZeroZero - Work Experience', pdfUrl: zerozeroPdf },
  ];

  const [selectedIconId, setSelectedIconId] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);

  const [activeWindowId, setActiveWindowId] = useState(null);

  const handleIconClick = (id, e) => {
    e.stopPropagation();
    setSelectedIconId(id);
  };

  const handleIconDoubleClick = (item) => {
    if (!openWindows.find((w) => w.id === item.id)) {
      setOpenWindows([...openWindows, item]);
    }
    setActiveWindowId(item.id);
  };

  const handleWindowFocus = (id) => {
    setActiveWindowId(id);
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
  };

  return (
    <div className="desktop" onClick={handleDesktopClick}>
      <div className="desktop-icons">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIconId === icon.id ? 'selected' : ''}`}
            onClick={(e) => handleIconClick(icon.id, e)}
            onDoubleClick={() => handleIconDoubleClick(icon)}
          >
            <div className="icon-image">
              <img src={icon.icon} alt={icon.label} />
            </div>
            <div className="icon-label">{icon.label}</div>
          </div>
        ))}
      </div>

      {openWindows.map((window, index) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.label}
          icon={window.icon}
          onClose={() => closeWindow(window.id)}
          initialPosition={{ x: 200 + index * 30, y: 50 + index * 30 }}
          initialSize={window.type === 'pdf' ? { width: 800, height: 1000 } : { width: 1000, height: 800 }}
          zIndex={activeWindowId === window.id ? 200 : 100 + index}
          onFocus={() => handleWindowFocus(window.id)}
        >
          {window.type === 'folder' && (
            <FolderWindow
              window={window}
              files={experienceContent}
              selectedIconId={selectedIconId}
              onIconClick={handleIconClick}
              onIconDoubleClick={handleIconDoubleClick}
            />
          )}
          {window.type === 'pdf' && (
            <div className="window-body" style={{ margin: '0px' }}>
              <PDFViewer
                title={window.title}
                content={window.content}
                pdfUrl={window.pdfUrl}
              />
            </div>
          )}
        </Window>
      ))}
    </div>
  );
};

export default Desktop;

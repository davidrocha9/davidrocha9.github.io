import '@components/Desktop.css';
import experienceIcon from '../assets/icons/experience.png';
import educationIcon from '../assets/icons/education.png';
import projectsIcon from '../assets/icons/projects.png';
import hobbiesIcon from '../assets/icons/hobbies.png';
import biographyIcon from '../assets/icons/biography.png';
import pdfIcon from '../assets/icons/pdf.png';
import xpIcon from '../assets/xp-logo.png';
import backIcon from '../assets/icons/back.png';
import forwardIcon from '../assets/icons/forward.png';
import folderUpIcon from '../assets/icons/folder-up.png';
import searchIcon from '../assets/icons/search.png';
import folderViewIcon from '../assets/icons/folder-view.png';
import folderViewClassicIcon from '../assets/icons/folder-view-classic.png';
import goIcon from '../assets/icons/go.png';

import { useState } from 'react';

const Desktop = () => {
  const icons = [
    { id: 1, label: 'Experience', icon: experienceIcon, type: 'folder' },
    { id: 2, label: 'Education', icon: educationIcon, type: 'folder' },
    { id: 3, label: 'Projects', icon: projectsIcon, type: 'folder' },
    { id: 4, label: 'Hobbies', icon: hobbiesIcon, type: 'folder' },
    { id: 5, label: 'Biography', icon: biographyIcon, type: 'folder' },
  ];

  const experienceContent = [
    { id: 'pdf-beyourbest', label: 'beyourbest.pdf', icon: pdfIcon, type: 'pdf', title: 'BeYourBest - Work Experience', content: 'Software Engineer at BeYourBest.\n\nDeveloped high-performance VR training simulations...' },
    { id: 'pdf-arkadium', label: 'arkadium.pdf', icon: pdfIcon, type: 'pdf', title: 'Arkadium - Work Experience', content: 'Frontend Developer at Arkadium.\n\nBuilt engaging web games and interactive experiences...' },
    { id: 'pdf-zerozero', label: 'zerozero.pdf', icon: pdfIcon, type: 'pdf', title: 'ZeroZero - Work Experience', content: 'Full Stack Developer at ZeroZero.\n\nContributed to the leading sports statistics platform...' },
  ];

  const [selectedIconId, setSelectedIconId] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);

  const handleIconClick = (id, e) => {
    e.stopPropagation();
    setSelectedIconId(id);
  };

  const handleIconDoubleClick = (item) => {
    if (!openWindows.find((w) => w.id === item.id)) {
      setOpenWindows([...openWindows, item]);
    }
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id));
  };

  const renderWindowContent = () => {
    return (
      <div className="window-icons" style={{ backgroundColor: "#f8fafc" }}>
        {experienceContent.map((item) => (
          <div
            key={item.id}
            className={`desktop-icon ${selectedIconId === item.id ? 'selected' : ''}`}
            onClick={(e) => handleIconClick(item.id, e)}
            onDoubleClick={() => handleIconDoubleClick(item)}
          >
            <div className="icon-image">
              <img src={item.icon} alt={item.label} />
            </div>
            <div className="icon-label" style={{ color: 'black', textShadow: 'none' }}>{item.label}</div>
          </div>
        ))}
      </div>
    );
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
        <div
          key={window.id}
          className="window"
          style={{
            width: 600,
            height: 500,
            margin: 20,
            position: 'absolute',
            top: 50 + index * 30,
            left: 200 + index * 30,
            zIndex: 100 + index,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="title-bar">
            <div className="title-bar-text" style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src={window.icon} alt={window.label} style={{ width: 25, height: 25 }} />
              {window.label}
            </div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close" onClick={() => closeWindow(window.id)}></button>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'auto', padding: '0px 3px' }}>

            {window.type === 'folder' && (
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
                    <img src={xpIcon} alt="" className="folder-icon-small" style={{ width: '22px', height: '22px' }} />
                  </div>
                </div>
                <div className="toolbar">
                  <div className="nav-buttons-group">
                    <div className="nav-btn back-btn">
                      <img src={backIcon} alt="" style={{ width: '24px', height: '24px' }} />
                      <span className="btn-text">Back</span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    <div className="nav-btn-dropdown">
                      <img src={forwardIcon} alt="" style={{ width: '24px', height: '24px' }} />
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    <div className="nav-btn up-btn">
                      <img src={folderUpIcon} alt="" style={{ width: '24px', height: '24px' }} />
                    </div>
                  </div>

                  <div className="toolbar-separator"></div>

                  <div className="toolbar-icon-btn">
                    <img src={searchIcon} alt="" style={{ width: '24px', height: '24px' }} />
                    <span className="btn-text">Search</span>
                  </div>
                  <div className="toolbar-icon-btn">
                    <img src={folderViewIcon} alt="" style={{ width: '24px', height: '24px' }} />
                    <span className="btn-text">Folders</span>
                  </div>

                  <div className="toolbar-separator"></div>

                  <div className="views-btn">
                    <img src={folderViewClassicIcon} alt="" style={{ width: '24px', height: '24px' }} />
                    <span className="dropdown-arrow">▼</span>
                  </div>
                </div>
                <div className="address-bar">
                  <span className="address-label">Address</span>
                  <div className="address-input">
                    <img src={window.icon} alt="" className="folder-icon-small" style={{ width: '20px', height: '20px' }} />
                    <span className="address-text">C:\Desktop\{window.label}</span>
                  </div>
                  <div className="go-button">
                    <img src={goIcon} alt="" style={{ width: '24px', height: '24px' }} />
                  </div>
                </div>
              </div>
            )}

            <div className="window-body" style={{ overflow: 'auto', margin: '0px' }}>
              {renderWindowContent(window)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desktop;

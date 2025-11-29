import '@components/Desktop.css';
import experienceIcon from '../assets/icons/experience.png';
import educationIcon from '../assets/icons/education.png';
import projectsIcon from '../assets/icons/projects.png';
import hobbiesIcon from '../assets/icons/hobbies.png';
import biographyIcon from '../assets/icons/biography.png';

import { useState } from 'react';

const Desktop = () => {
  const icons = [
    { id: 1, label: 'Experience', icon: experienceIcon },
    { id: 2, label: 'Education', icon: educationIcon },
    { id: 3, label: 'Projects', icon: projectsIcon },
    { id: 4, label: 'Hobbies', icon: hobbiesIcon },
    { id: 5, label: 'Biography', icon: biographyIcon },
  ];

  const [selectedIconId, setSelectedIconId] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);

  const handleIconClick = (id, e) => {
    e.stopPropagation();
    setSelectedIconId(id);
  };

  const handleIconDoubleClick = (icon) => {
    if (!openWindows.find((w) => w.id === icon.id)) {
      setOpenWindows([...openWindows, icon]);
    }
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

      {openWindows.map((window) => (
        <div key={window.id} className="window" style={{ width: 300, margin: 20, position: 'absolute', top: 50 + window.id * 20, left: 200 + window.id * 20, zIndex: 100 + window.id }}>
          <div className="title-bar">
            <div className="title-bar-text">{window.label}</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close" onClick={() => closeWindow(window.id)}></button>
            </div>
          </div>
          <div className="window-body">
            <p>Content for {window.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desktop;

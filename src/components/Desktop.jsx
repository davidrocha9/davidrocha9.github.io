import '@components/Desktop.css';
import experienceIcon from '../assets/icons/experience.png';
import educationIcon from '../assets/icons/education.png';
import projectsIcon from '../assets/icons/projects.png';
import hobbiesIcon from '../assets/icons/hobbies.png';
import emailIcon from '../assets/icons/email.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import githubIcon from '../assets/icons/github.png';
import pdfIcon from '../assets/icons/pdf.png';
import myMusicIcon from '../assets/icons/my-music.png';
import gamesIcon from '../assets/icons/games.png';
import chessIcon from '../assets/icons/chess.png';
import urlIcon from '../assets/icons/url.png';
import mpcIcon from '../assets/icons/mpc.png';
import myPicturesIcon from '../assets/icons/my-pictures.png';
import dulceIcon from '../assets/projects/dulcecast.png';
import linhavivaIcon from '../assets/projects/linhaviva.png';

import arkadiumPdf from '../pdf/arkadium.pdf';
import beyourbestPdf from '../pdf/beyourbest.pdf';
import zerozeroPdf from '../pdf/zerozero.pdf';
import educationPdf from '../pdf/education.pdf';
import resumePdf from '../pdf/resume.pdf';

import { useState, useRef } from 'react';
import Window from './Window';
import FolderWindow from './FolderWindow';
import PDFViewer from './PDFViewer';
import BrowserWindow from './BrowserWindow';
import DocumentViewer from './DocumentViewer';
import MarkdownViewer from './MarkdownViewer';
import ImageViewer from '@components/ImageViewer';
import footballMd from '../assets/hobbies/football.md?raw';
import footballImg from '../assets/hobbies/football.png';
import map from '../assets/hobbies/map.png';
import DiscogsCollection from './DiscogsCollection';
import SpotifyPlayer from './SpotifyPlayer';
import LetterboxdFeed from './LetterboxdFeed';
import ChessProfile from './ChessProfile';
import Games from './Games';
import MailWindow from './MailWindow';
import GitHubProfile from './GitHubProfile';
import LinkedInProfile from './LinkedInProfile';
import '@components/BrowserWindow.css';
import '@components/DocumentViewer.css';
import '@components/MailWindow.css';

const Desktop = ({ openWindows, setOpenWindows, activeWindowId, setActiveWindowId, minimizedWindows, setMinimizedWindows }) => {
  const experienceContent = [
    { id: 'pdf-beyourbest', label: 'beyourbest.pdf', icon: pdfIcon, type: 'pdf', title: 'BeYourBest - Work Experience', pdfUrl: beyourbestPdf },
    { id: 'pdf-arkadium', label: 'arkadium.pdf', icon: pdfIcon, type: 'pdf', title: 'Arkadium - Work Experience', pdfUrl: arkadiumPdf },
    { id: 'pdf-zerozero', label: 'zerozero.pdf', icon: pdfIcon, type: 'pdf', title: 'ZeroZero - Work Experience', pdfUrl: zerozeroPdf },
  ];

  const projectsContent = [
    { id: 'browser-dulcecast', label: 'DulceCast', icon: dulceIcon, type: 'browser', title: 'DulceCast', url: 'https://dulcecast.vercel.app/' },
    { id: 'browser-linhaviva', label: 'Linha Viva', icon: linhavivaIcon, type: 'browser', title: 'Linha Viva', url: 'https://linha-viva.vercel.app/' },
  ];

  const footballContent = footballMd;
  const footballContentResolved = footballContent.replace(/src=["']football.png["']/g, `src="${footballImg}"`);

  const hobbiesContent = [
    { id: 'doc-football', label: 'Football.md', icon: pdfIcon, type: 'markdown', title: 'Football', content: footballContentResolved },
    { id: 'spotify-music', label: 'Music', icon: myMusicIcon, type: 'spotify', title: 'Spotify', username: 'davidrocha9' },
    { id: 'discogs-vinyl', label: 'Vinyl Records', icon: myMusicIcon, type: 'discogs', title: 'Discogs Collection', username: 'davidrocha9' },
    { id: 'games-favorites', label: 'Gaming', icon: gamesIcon, type: 'games', title: 'Games' },
    { id: 'letterboxd-movies', label: 'Movies & TV', icon: mpcIcon, type: 'letterboxd', title: 'Letterboxd', username: 'davidrocha9' },
    { id: 'browser-gym', label: 'Gym', icon: urlIcon, type: 'browser', title: 'Hevy', url: 'https://hevy.com/user/davidrocha9' },
    { id: 'chess-profile', label: 'Chess', icon: chessIcon, type: 'chess', title: 'Chess.com', username: 'davidrocha_9' },
    { id: 'folder-travelling', label: 'Travelling', icon: myPicturesIcon, type: 'image', title: 'Travelling Map', src: map },
  ];

  const icons = [
    { id: 1, label: 'Experience', icon: experienceIcon, type: 'folder', files: experienceContent },
    { id: 'education', label: 'Education', icon: educationIcon, type: 'pdf', title: 'Education', pdfUrl: educationPdf },
    { id: 'resume', label: 'Full Resumé', icon: pdfIcon, type: 'pdf', title: 'Full Resumé', pdfUrl: resumePdf },
    { id: 3, label: 'Projects', icon: projectsIcon, type: 'folder', files: projectsContent },
    { id: 4, label: 'Hobbies', icon: hobbiesIcon, type: 'folder', files: hobbiesContent },
    { id: 5, label: 'Mail', icon: emailIcon, type: 'mail', recipient: 'davidsoutorocha@gmail.com' },
    { id: 'linkedin', label: 'LinkedIn', icon: linkedinIcon, type: 'linkedin', username: 'davidrocha9' },
    { id: 'github', label: 'GitHub', icon: githubIcon, type: 'github', username: 'davidrocha9' },
  ];

  const [selectedIconId, setSelectedIconId] = useState(null);
  const mouseDownPos = useRef(null);
  const DRAG_THRESHOLD = 5;

  const handleIconMouseDown = (e) => {
    mouseDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleIconClick = (id, e) => {
    e.stopPropagation();
    if (mouseDownPos.current) {
      const dx = Math.abs(e.clientX - mouseDownPos.current.x);
      const dy = Math.abs(e.clientY - mouseDownPos.current.y);
      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        mouseDownPos.current = null;
        return;
      }
    }
    setSelectedIconId(id);
  };

  const handleIconDoubleClick = (item, e) => {
    if (e) e.stopPropagation();
    if (mouseDownPos.current) {
      const dx = Math.abs(e.clientX - mouseDownPos.current.x);
      const dy = Math.abs(e.clientY - mouseDownPos.current.y);
      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        mouseDownPos.current = null;
        return;
      }
    }
      const TASKBAR_HEIGHT = 30; // bottom taskbar
      const TAB_SIZE = 40; // approximate title/toolbar height to consider
      const MARGIN = 20;

      const maxWidth = Math.max(300, window.innerWidth - MARGIN);
      const maxHeight = Math.max(200, window.innerHeight - TASKBAR_HEIGHT - TAB_SIZE - MARGIN);

      const defaultWidth = item.type === 'pdf' ? 800 : 1000;
      const defaultHeight = item.type === 'pdf' ? 1000 : 800;

      const initialWidth = Math.min(defaultWidth, maxWidth);
      const initialHeight = Math.min(defaultHeight, maxHeight);

      const newWindow = {
        ...item,
        initialSize: { width: initialWidth, height: initialHeight },
        maxSize: { width: maxWidth, height: maxHeight },
      };

      if (!openWindows.find((w) => w.id === item.id)) {
        setOpenWindows([...openWindows, newWindow]);
      } else {
        // If already open, ensure its max/initial sizes are updated (in case of resize)
        setOpenWindows(openWindows.map((w) => (w.id === item.id ? { ...w, ...newWindow } : w)));
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
    if (activeWindowId === id) {
      const remaining = openWindows.filter((w) => w.id !== id);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
    // Also remove from minimized set if it was minimized
    if (minimizedWindows.has(id)) {
      const newMinimized = new Set(minimizedWindows);
      newMinimized.delete(id);
      setMinimizedWindows(newMinimized);
    }
  };

  const minimizeWindow = (id) => {
    const newMinimized = new Set(minimizedWindows);
    newMinimized.add(id);
    setMinimizedWindows(newMinimized);
    // Set active to another non-minimized window
    const nonMinimized = openWindows.filter(w => w.id !== id && !newMinimized.has(w.id));
    setActiveWindowId(nonMinimized.length > 0 ? nonMinimized[nonMinimized.length - 1].id : null);
  };

  const TASKBAR_HEIGHT = 30; // bottom taskbar
  const MARGIN = 20; // small margin from edges

  return (
    <div className="desktop" onClick={handleDesktopClick}>
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

      {openWindows.filter(win => !minimizedWindows.has(win.id)).map((win, index) => {
        const defaultWidth = win.type === 'pdf' ? 800 : 1000;
        const defaultHeight = win.type === 'pdf' ? 1000 : 800;
        const winWidth = (win.initialSize && win.initialSize.width) || defaultWidth;
        const winHeight = (win.initialSize && win.initialSize.height) || defaultHeight;

        // Cascade each window 40px right and 40px down from previous
        const cascadeOffset = 40;
        const baseX = 100;
        const baseY = 30;
        const startX = baseX + index * cascadeOffset;
        const startY = baseY + index * cascadeOffset;

        const maxLeft = Math.max(0, window.innerWidth - winWidth - MARGIN);
        const maxTop = Math.max(0, window.innerHeight - TASKBAR_HEIGHT - winHeight - MARGIN);

        // Clamp position to available space, keeping as much offset as possible
        const posX = Math.max(0, Math.min(startX, maxLeft));
        const posY = Math.max(0, Math.min(startY, maxTop));

        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.label}
            icon={win.icon}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            initialPosition={{ x: posX, y: posY }}
            initialSize={win.initialSize || { width: winWidth, height: winHeight }}
            maxSize={win.maxSize}
            zIndex={activeWindowId === win.id ? 200 : 100 + index}
            onFocus={() => handleWindowFocus(win.id)}
          >
            {win.type === 'folder' && (
              <FolderWindow
                window={win}
                files={win.files}
                selectedIconId={selectedIconId}
                onIconClick={handleIconClick}
                onIconDoubleClick={handleIconDoubleClick}
              />
            )}
            {win.type === 'pdf' && (
              <div className="window-body" style={{ margin: '0px' }}>
                <PDFViewer
                  title={win.title}
                  content={win.content}
                  pdfUrl={win.pdfUrl}
                />
              </div>
            )}
            {win.type === 'browser' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <BrowserWindow
                  url={win.url}
                  title={win.title}
                  icon={win.icon}
                />
              </div>
            )}
            {win.type === 'document' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <DocumentViewer
                  title={win.title}
                  content={win.content}
                />
              </div>
            )}
            {win.type === 'discogs' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <DiscogsCollection username={win.username} />
              </div>
            )}
            {win.type === 'spotify' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <SpotifyPlayer username={win.username} />
              </div>
            )}
            {win.type === 'letterboxd' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <LetterboxdFeed username={win.username} />
              </div>
            )}
            {win.type === 'markdown' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <MarkdownViewer title={win.title} content={win.content} />
              </div>
            )}
            {win.type === 'image' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <ImageViewer src={win.src || win.content} title={win.title || win.label} />
              </div>
            )}
            {win.type === 'games' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Games />
              </div>
            )}
            {win.type === 'chess' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <ChessProfile username={win.username} />
              </div>
            )}
            {win.type === 'mail' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <MailWindow recipient={win.recipient} />
              </div>
            )}
            {win.type === 'github' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <GitHubProfile username={win.username} />
              </div>
            )}
            {win.type === 'linkedin' && (
              <div className="window-body" style={{ margin: '0px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <LinkedInProfile username={win.username} />
              </div>
            )}
          </Window>
        );
      })}
    </div>
  );
};

export default Desktop;

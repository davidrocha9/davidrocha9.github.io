import { useRef, useState } from 'react';
import { useWindow } from '../contexts/WindowContext';
import WindowTypes from '../enums/WindowTypes';

import experienceIcon from '@assets/icons/experience.png';
import educationIcon from '@assets/icons/education.png';
import projectsIcon from '@assets/icons/projects.png';
import hobbiesIcon from '@assets/icons/hobbies.png';
import emailIcon from '@assets/icons/email.png';
import linkedinIcon from '@assets/icons/linkedin.png';
import githubIcon from '@assets/icons/github.png';
import pdfIcon from '@assets/icons/pdf.png';
import myMusicIcon from '@assets/icons/my-music.png';
import gamesIcon from '@assets/icons/games.png';
import chessIcon from '@assets/icons/chess.png';
import urlIcon from '@assets/icons/url.png';
import mpcIcon from '@assets/icons/mpc.png';
import myPicturesIcon from '@assets/icons/my-pictures.png';
import dulceIcon from '@assets/projects/dulcecast.png';
import linhavivaIcon from '@assets/projects/linhaviva.png';
import xpIcon from '@assets/xp-logo.png';

import arkadiumPdf from '../pdf/arkadium.pdf';
import beyourbestPdf from '../pdf/beyourbest.pdf';
import zerozeroPdf from '../pdf/zerozero.pdf';
import educationPdf from '../pdf/education.pdf';
import resumePdf from '../pdf/resume.pdf';

import footballMd from '@assets/hobbies/football.md?raw';
import footballImg from '@assets/hobbies/football.png';
import map from '@assets/hobbies/map.png';

const DRAG_THRESHOLD = 5;

export default function useDesktop() {
  const { openWindows, setOpenWindows, activeWindowId, setActiveWindowId, minimizedWindows, setMinimizedWindows } = useWindow();

  const [selectedIconId, setSelectedIconId] = useState(null);
  const mouseDownPos = useRef(null);

  const experienceContent = [
    { id: 'pdf-beyourbest', label: 'beyourbest.pdf', icon: pdfIcon, type: WindowTypes.PDF, title: 'BeYourBest - Work Experience', pdfUrl: beyourbestPdf },
    { id: 'pdf-arkadium', label: 'arkadium.pdf', icon: pdfIcon, type: WindowTypes.PDF, title: 'Arkadium - Work Experience', pdfUrl: arkadiumPdf },
    { id: 'pdf-zerozero', label: 'zerozero.pdf', icon: pdfIcon, type: WindowTypes.PDF, title: 'ZeroZero - Work Experience', pdfUrl: zerozeroPdf },
  ];

  const projectsContent = [
    { id: 'browser-dulcecast', label: 'DulceCast', icon: dulceIcon, type: WindowTypes.BROWSER, title: 'DulceCast', url: 'https://dulcecast.vercel.app/' },
    { id: 'browser-linhaviva', label: 'Linha Viva', icon: linhavivaIcon, type: WindowTypes.BROWSER, title: 'Linha Viva', url: 'https://linha-viva.vercel.app/' },
    { id: 'browser-portfolio-inception', label: 'Portfolio (Inception)', icon: xpIcon, type: WindowTypes.BROWSER, title: 'Portfolio (Inception)', url: 'https://davidrocha.tech' },
  ];

  const footballContent = footballMd;
  const footballContentResolved = footballContent.replace(/src=["']football.png["']/g, `src="${footballImg}"`);

  const hobbiesContent = [
    { id: 'doc-football', label: 'Football.md', icon: pdfIcon, type: WindowTypes.MARKDOWN, title: 'Football', content: footballContentResolved },
    { id: 'spotify-music', label: 'Music', icon: myMusicIcon, type: WindowTypes.SPOTIFY, title: 'Spotify', username: 'davidrocha9' },
    { id: 'discogs-vinyl', label: 'Vinyl Records', icon: myMusicIcon, type: WindowTypes.DISCOGS, title: 'Discogs Collection', username: 'davidrocha9' },
    { id: 'games-favorites', label: 'Gaming', icon: gamesIcon, type: WindowTypes.GAMES, title: 'Games' },
    { id: 'letterboxd-movies', label: 'Movies & TV', icon: mpcIcon, type: WindowTypes.LETTERBOXD, title: 'Letterboxd', username: 'davidrocha9' },
    { id: 'browser-gym', label: 'Gym', icon: urlIcon, type: WindowTypes.BROWSER, title: 'Hevy', url: 'https://hevy.com/user/davidrocha9' },
    { id: 'chess-profile', label: 'Chess', icon: chessIcon, type: WindowTypes.CHESS, title: 'Chess.com', username: 'davidrocha_9' },
    { id: 'folder-travelling', label: 'Travelling', icon: myPicturesIcon, type: WindowTypes.IMAGE, title: 'Travelling Map', src: map },
  ];

  const icons = [
    { id: 1, label: 'Experience', icon: experienceIcon, type: WindowTypes.FOLDER, files: experienceContent },
    { id: 'education', label: 'Education', icon: educationIcon, type: WindowTypes.PDF, title: 'Education', pdfUrl: educationPdf },
    { id: 'resume', label: 'Full Resumé', icon: pdfIcon, type: WindowTypes.PDF, title: 'Full Resumé', pdfUrl: resumePdf },
    { id: 3, label: 'Projects', icon: projectsIcon, type: WindowTypes.FOLDER, files: projectsContent },
    { id: 4, label: 'Hobbies', icon: hobbiesIcon, type: WindowTypes.FOLDER, files: hobbiesContent },
    { id: 5, label: 'Mail', icon: emailIcon, type: WindowTypes.MAIL, recipient: 'davidsoutorocha@gmail.com' },
    { id: 'linkedin', label: 'LinkedIn', icon: linkedinIcon, type: WindowTypes.LINKEDIN, username: 'davidrocha9' },
    { id: 'github', label: 'GitHub', icon: githubIcon, type: WindowTypes.GITHUB, username: 'davidrocha9' },
  ];

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

    const defaultWidth = item.type === WindowTypes.PDF ? 800 : 1000;
    const defaultHeight = item.type === WindowTypes.PDF ? 1000 : 800;

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
    const nonMinimized = openWindows.filter(w => w.id !== id && !newMinimized.has(w.id));
    setActiveWindowId(nonMinimized.length > 0 ? nonMinimized[nonMinimized.length - 1].id : null);
  };

  return {
    icons,
    selectedIconId,
    setSelectedIconId,
    handleIconMouseDown,
    handleIconClick,
    handleIconDoubleClick,
    handleDesktopClick,
    closeWindow,
    minimizeWindow,
    handleWindowFocus,
    // also expose window state for rendering
    openWindows,
    minimizedWindows,
    activeWindowId,
  };
}

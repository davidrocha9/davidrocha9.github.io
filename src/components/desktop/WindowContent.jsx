import FolderWindow from '../common/FolderWindow';
import PDFViewer from '../common/PDFViewer';
import { BrowserWindow } from '../browser';
import DocumentViewer from '../common/DocumentViewer';
import MarkdownViewer from '../common/MarkdownViewer';
import ImageViewer from '@components/common/ImageViewer';
import DiscogsCollection from '../hobbies/vinyl';
import SpotifyPlayer from '../hobbies/music/SpotifyPlayer';
import LetterboxdFeed from '../hobbies/movies/LetterboxdFeed';
import ChessProfile from '../hobbies/chess';
import Games from '../hobbies/games/Games';
import MailWindow from '../mail/MailWindow';
import GitHubProfile from '../github';
import LinkedInProfile from '../linkedin/LinkedInProfile';
import WindowTypes from '../../enums/WindowTypes';

const wrapInWindowBody = (component, extraStyle = {}) => (
  <div className="window-body" style={{ margin: '0px', ...extraStyle }}>
    {component}
  </div>
);

const flexStyle = { height: '100%', display: 'flex', flexDirection: 'column' };

const componentMap = {
  [WindowTypes.FOLDER]: (win) => <FolderWindow window={win} files={win.files} />,
  [WindowTypes.PDF]: (win) => wrapInWindowBody(
    <PDFViewer title={win.title} content={win.content} pdfUrl={win.pdfUrl} />
  ),
  [WindowTypes.BROWSER]: (win) => wrapInWindowBody(
    <BrowserWindow url={win.url} title={win.title} icon={win.icon} />, flexStyle
  ),
  [WindowTypes.DOCUMENT]: (win) => wrapInWindowBody(
    <DocumentViewer title={win.title} content={win.content} />, flexStyle
  ),
  [WindowTypes.DISCOGS]: (win) => wrapInWindowBody(
    <DiscogsCollection />, flexStyle
  ),
  [WindowTypes.SPOTIFY]: (win) => wrapInWindowBody(
    <SpotifyPlayer username={win.username} />, flexStyle
  ),
  [WindowTypes.LETTERBOXD]: (win) => wrapInWindowBody(
    <LetterboxdFeed username={win.username} />, flexStyle
  ),
  [WindowTypes.MARKDOWN]: (win) => wrapInWindowBody(
    <MarkdownViewer title={win.title} content={win.content} />, flexStyle
  ),
  [WindowTypes.IMAGE]: (win) => wrapInWindowBody(
    <ImageViewer src={win.src || win.content} title={win.title || win.label} />, flexStyle
  ),
  [WindowTypes.GAMES]: (win) => wrapInWindowBody(
    <Games />, flexStyle
  ),
  [WindowTypes.CHESS]: (win) => wrapInWindowBody(
    <ChessProfile username={win.username} />, flexStyle
  ),
  [WindowTypes.MAIL]: (win) => wrapInWindowBody(
    <MailWindow recipient={win.recipient} />, flexStyle
  ),
  [WindowTypes.GITHUB]: (win) => wrapInWindowBody(
    <GitHubProfile username={win.username} />, flexStyle
  ),
  [WindowTypes.LINKEDIN]: (win) => wrapInWindowBody(
    <LinkedInProfile username={win.username} />, flexStyle
  ),
};

const WindowContent = ({ win }) => {
  return componentMap[win.type]?.(win) || null;
};

export default WindowContent;
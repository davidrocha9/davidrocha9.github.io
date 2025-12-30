import { useState } from 'react';
import xpIcon from '../assets/xp-logo.png';
import './MailWindow.css';

const MailWindow = ({ recipient }) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="mail-window">
      <div className="menu-bar">
        <div className="menu-items">
          <span>File</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Tools</span>
          <span>Help</span>
        </div>
        <div className="menu-xp-icon">
          <img src={xpIcon} className="folder-icon-small" style={{ width: '22px', height: '22px' }} />
        </div>
      </div>
      <div className="mail-header">
        <div className="mail-header-field">
          <label>To:</label>
          <input type="text" value={recipient} readOnly />
        </div>
        <div className="mail-header-field">
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>
      <div className="mail-body">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your message here..."
        />
      </div>
      <div className="mail-footer">
        <button onClick={handleSend} className="mail-button send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default MailWindow;

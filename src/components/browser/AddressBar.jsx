import { xpIcon, goIcon } from '@assets';

const AddressBar = ({ inputUrl, setInputUrl, handleGo, handleKeyDown, icon }) => {
  return (
    <div className="address-bar">
      <span className="address-label">Address</span>
      <div className="address-input">
        <img src={icon || xpIcon} className="folder-icon-small" style={{ width: '20px', height: '20px' }} />
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="address-text browser-address-text-input"
        />
      </div>
      <div className="go-button" onClick={handleGo}>
        <img src={goIcon} style={{ width: '24px', height: '24px' }} />
      </div>
    </div>
  );
};

export { AddressBar };
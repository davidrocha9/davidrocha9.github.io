const FolderFiles = ({ files, selectedIconId, onIconClick, onIconDoubleClick }) => {
  return (
    <div className="window-main-view">
      <div className="window-icons">
        {files.map((item) => (
          <div
            key={item.id}
            className={`desktop-icon window-view-icon ${selectedIconId === item.id ? 'selected' : ''}`}
            onClick={(e) => onIconClick(item.id, e)}
            onDoubleClick={() => onIconDoubleClick(item)}
          >
            <div className="icon-image">
              <img src={item.icon} alt={item.label} style={{ width: '50px', height: '50px' }} />
            </div>
            <div className="icon-info">
              <div className="icon-label" style={{ color: 'black', textShadow: 'none', textAlign: 'left' }}>
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderFiles;

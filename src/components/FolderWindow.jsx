import FolderToolbar from './FolderToolbar';
import FolderSidebar from './FolderSidebar';
import FolderFiles from './FolderFiles';

const FolderWindow = ({ window, files, selectedIconId, onIconClick, onIconDoubleClick }) => {
  return (
    <>
      <FolderToolbar window={window} />
      <div className="window-body" style={{ margin: '0px' }}>
        <div className="window-content-container">
          <FolderSidebar />
          <FolderFiles 
            files={files}
            selectedIconId={selectedIconId}
            onIconClick={onIconClick}
            onIconDoubleClick={onIconDoubleClick}
          />
        </div>
      </div>
    </>
  );
};

export default FolderWindow;

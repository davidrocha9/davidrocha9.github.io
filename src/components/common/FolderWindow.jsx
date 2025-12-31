import { FolderToolbar, FolderSidebar, FolderFiles } from '@components/common/index';

const FolderWindow = ({ window, files }) => {
  return (
    <>
      <FolderToolbar window={window} />
      <div className="window-body" style={{ margin: '0px' }}>
        <div className="window-content-container">
          <FolderSidebar />
          <FolderFiles files={files} />
        </div>
      </div>
    </>
  );
};

export default FolderWindow;

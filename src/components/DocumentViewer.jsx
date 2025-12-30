import xpIcon from '../assets/xp-logo.png';

const DocumentViewer = ({ title, content }) => {
  return (
    <div className="document-viewer">
      <div className="pdf-menu-bar">
        <div className="menu-items">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Format</span>
          <span>Help</span>
        </div>
      </div>
      <div className="document-content">
        <div className="document-page">
          <h1>{title}</h1>
          <div className="document-body" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;

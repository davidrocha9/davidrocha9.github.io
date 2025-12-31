const PDFViewer = ({ title, content, pdfUrl }) => {
  return (
    <div className="pdf-viewer">
      <div className="pdf-menu-bar">
        <div className="menu-items">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Window</span>
          <span>Help</span>
        </div>
      </div>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            flexGrow: 1
          }}
          title={title || 'PDF Document'}
        />
      ) : (
        <div className="pdf-content">
          <h2>{title}</h2>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;

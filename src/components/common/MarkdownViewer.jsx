import '@components/common/DocumentViewer.css';

const mdToHtml = (md) => {
  if (!md) return '';
  let out = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  out = out.replace(/&lt;img([\s\S]*?)\/?&gt;/g, (m, attrs) => {
    const unescapedAttrs = attrs.replace(/&amp;/g, '&');
    return `<img${unescapedAttrs}>`;
  });

  out = out.replace(/```([\s\S]*?)```/g, (m, code) => `<pre><code>${code.replace(/</g, '&lt;')}</code></pre>`);

  out = out.replace(/^######\s?(.*$)/gim, '<h6>$1</h6>');
  out = out.replace(/^#####\s?(.*$)/gim, '<h5>$1</h5>');
  out = out.replace(/^####\s?(.*$)/gim, '<h4>$1</h4>');
  out = out.replace(/^###\s?(.*$)/gim, '<h3>$1</h3>');
  out = out.replace(/^##\s?(.*$)/gim, '<h2>$1</h2>');
  out = out.replace(/^#\s?(.*$)/gim, '<h1>$1</h1>');

  out = out.replace(/^---$/gim, '<hr/>');

  out = out.replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/gim, '<em>$1</em>');

  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  out = out.replace(/^(?:\s*[-*]\s+.+(?:\n|$))+?/gm, (m) => {
    const items = m.trim().split(/\n/).map((line) => line.replace(/^[-*]\s+/, ''));
    return `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  });

  const paragraphs = out.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  out = paragraphs.map(p => {
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<pre') || p.startsWith('<hr')) return p;
    const withBreaks = p.replace(/\n/g, '<br/>');
    return `<p>${withBreaks}</p>`;
  }).join('');

  return out;
};

const MarkdownViewer = ({ title, content }) => {
  const html = mdToHtml(content || '');

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
          <div className="document-body markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
};

export default MarkdownViewer;

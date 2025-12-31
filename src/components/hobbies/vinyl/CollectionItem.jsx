const CollectionItem = ({ release, openDiscogs }) => {
  const info = release.basic_information;
  return (
    <div
      className="discogs-item"
      onClick={() => openDiscogs(`https://www.discogs.com/release/${info.id}`)}
      title={`${info.artists?.[0]?.name} - ${info.title}`}
    >
      <div className="discogs-cover">
        {info.cover_image && info.cover_image !== '' ? (
          <img src={info.cover_image} alt={info.title} loading="lazy" />
        ) : (
          <div className="discogs-no-cover">🎵</div>
        )}
      </div>
      <div className="discogs-info">
        <div className="discogs-title">{info.title}</div>
        <div className="discogs-artist">
          {info.artists?.map((a) => a.name).join(', ')}
        </div>
        <div className="discogs-year">{info.year || 'Unknown'}</div>
      </div>
    </div>
  );
};

export default CollectionItem;
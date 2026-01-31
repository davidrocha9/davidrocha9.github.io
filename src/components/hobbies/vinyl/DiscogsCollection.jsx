import { Loading, Error, CollectionGrid, Pagination } from '@components/hobbies/vinyl/index';
import { DiscogsProvider, useDiscogsContext } from '@contexts/DiscogsContext';
import '@components/hobbies/vinyl/DiscogsCollection.css';
import { trackExternalLink } from '@/utils/analytics';

const DiscogsCollectionContent = () => {
  const { loading, error, pagination, username, openDiscogs } = useDiscogsContext();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} username={username} openDiscogs={openDiscogs} />;
  }

  return (
    <div className="discogs-collection">
      <div className="discogs-header">
        <h2>🎵 Vinyl Collection</h2>
        <span className="discogs-count">
          {pagination ? `${pagination.items} records` : ''}
        </span>
      </div>

      <CollectionGrid />

      <Pagination />

      <div className="discogs-footer">
        <button onClick={() => {
          trackExternalLink('discogs', `https://www.discogs.com/user/${username}/collection`, 'Discogs Collection');
          openDiscogs(`https://www.discogs.com/user/${username}/collection`);
        }}>
          View full collection on Discogs ↗
        </button>
      </div>
    </div>
  );
};

const DiscogsCollection = () => {
  return (
    <DiscogsProvider>
      <DiscogsCollectionContent />
    </DiscogsProvider>
  );
};

export default DiscogsCollection;

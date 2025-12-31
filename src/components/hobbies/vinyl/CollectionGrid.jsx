import CollectionItem from '@components/hobbies/vinyl/CollectionItem';
import { useDiscogsContext } from '@contexts/DiscogsContext';

const CollectionGrid = () => {
  const { releases, openDiscogs } = useDiscogsContext();

  return (
    <div className="discogs-grid">
      {releases.map((release) => (
        <CollectionItem
          key={release.id}
          release={release}
          openDiscogs={openDiscogs}
        />
      ))}
    </div>
  );
};

export default CollectionGrid;
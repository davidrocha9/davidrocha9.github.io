import { useDiscogsContext } from '@contexts/DiscogsContext';

const Pagination = () => {
  const { pagination, page, setPage } = useDiscogsContext();

  if (!pagination || pagination.pages <= 1) return null;

  return (
    <div className="discogs-pagination">
      <button
        disabled={page <= 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        ← Prev
      </button>
      <span>
        Page {page} of {pagination.pages}
      </span>
      <button
        disabled={page >= pagination.pages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
import { useGitHub } from '@contexts/GitHubContext';

const GitHubError = () => {
  const { error, openGitHub } = useGitHub();

  return (
    <div className="github-profile github-error">
      <p>⚠️ {error}</p>
      <button onClick={() => openGitHub()}>
        View on GitHub
      </button>
    </div>
  );
};

export default GitHubError;
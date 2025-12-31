import { useGitHub } from '@contexts/GitHubContext';

const GitHubRepoItem = ({ repo }) => {
  const { openGitHub } = useGitHub();

  return (
    <div className="github-repo-item" onClick={() => openGitHub(repo.html_url)}>
      <h4>{repo.name}</h4>
      <p>{repo.description}</p>
      <div className="github-repo-stats">
        <span>{repo.language}</span>
        <span>⭐ {repo.stargazers_count}</span>
      </div>
    </div>
  );
};

export default GitHubRepoItem;
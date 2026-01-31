import { useGitHub } from '@contexts/GitHubContext';
import { trackExternalLink } from '@/utils/analytics';

const GitHubRepoItem = ({ repo }) => {
  const { openGitHub } = useGitHub();

  const handleClick = () => {
    trackExternalLink('github_repo', repo.html_url, repo.name);
    openGitHub(repo.html_url);
  };

  return (
    <div className="github-repo-item" onClick={handleClick}>
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
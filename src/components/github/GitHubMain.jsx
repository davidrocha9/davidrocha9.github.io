import { useGitHub } from '@contexts/GitHubContext';
import GitHubRepoCard from '@components/github/GitHubRepoCard';
import GitHubRepoItem from '@components/github/GitHubRepoItem';
import Tabs from '@enums/Tabs';

const GitHubMain = ({ activeTab }) => {
  const { repos, pinnedRepos } = useGitHub();

  return (
    <div className="github-main">
      {activeTab === Tabs.OVERVIEW && (
        <div className="github-overview">
          <h3>Pinned Repositories</h3>
          <div className="github-repos-grid">
            {pinnedRepos.map((repo) => (
              <GitHubRepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
      {activeTab === Tabs.REPOS && (
        <div className="github-overview">
          <h3>All Repositories</h3>
          <div className="github-repos-list">
            {repos.map((repo) => (
              <GitHubRepoItem key={repo.id} repo={repo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubMain;
import { useState } from 'react';
import { GitHubProvider, useGitHub } from '@contexts/GitHubContext';
import { GitHubSidebar, GitHubMain, GitHubLoading, GitHubError } from './';
import Tabs from '@enums/Tabs';
import '@components/github/GitHubProfile.css';
import { trackTabSwitch } from '@/utils/analytics';

const GitHubProfileContent = () => {
  const { loading, error } = useGitHub();
  const [activeTab, setActiveTab] = useState(Tabs.OVERVIEW);

  const handleTabChange = (newTab) => {
    if (newTab !== activeTab) {
      trackTabSwitch('github', newTab === Tabs.OVERVIEW ? 'overview' : 'repositories', 
        activeTab === Tabs.OVERVIEW ? 'overview' : 'repositories');
      setActiveTab(newTab);
    }
  };

  if (loading) return <GitHubLoading />;
  if (error) return <GitHubError />;

  return (
    <div className="github-profile">
      <div className="github-header">
        <h2>GitHub</h2>
        <div className="github-tabs">
          <button
            className={activeTab === Tabs.OVERVIEW ? 'active' : ''}
            onClick={() => handleTabChange(Tabs.OVERVIEW)}
          >
            Overview
          </button>
          <button
            className={activeTab === Tabs.REPOS ? 'active' : ''}
            onClick={() => handleTabChange(Tabs.REPOS)}
          >
            Repositories
          </button>
        </div>
      </div>

      <div className="github-content">
        <GitHubSidebar />
        <GitHubMain activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

const GitHubProfile = ({ username = 'davidrocha9' }) => {
  return (
    <GitHubProvider username={username}>
      <GitHubProfileContent />
    </GitHubProvider>
  );
};

export default GitHubProfile;
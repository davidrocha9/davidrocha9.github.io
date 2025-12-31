import { useState, useEffect } from 'react';
import './GitHubProfile.css';

const GitHubProfile = ({ username = 'davidrocha9' }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]); // All repositories
  const [pinnedRepos, setPinnedRepos] = useState([]); // Subset for overview
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch all repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData);
          // For pinned, take a slice of the recently updated ones
          setPinnedRepos(reposData.slice(0, 6)); 
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const openGitHub = (url) => {
    const target = url || `https://github.com/${username}`;
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="github-profile github-loading">
        <div className="github-spinner"></div>
        <p>Loading GitHub profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-profile github-error">
        <p>⚠️ {error}</p>
        <button onClick={() => openGitHub()}>
          View on GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="github-profile">
      <div className="github-header">
        <h2>GitHub</h2>
        <div className="github-tabs">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'repos' ? 'active' : ''}
            onClick={() => setActiveTab('repos')}
          >
            Repositories
          </button>
        </div>
      </div>

      <div className="github-content">
        <div className="github-sidebar">
          <img src={profile.avatar_url} alt={username} className="github-avatar" />
          <h1 className="github-name">{profile.name}</h1>
          <h2 className="github-username">{profile.login}</h2>
          <p className="github-bio">{profile.bio}</p>
          <div className="github-stats">
            <span><strong>{profile.followers}</strong> Followers</span>
            <span>·</span>
            <span><strong>{profile.following}</strong> Following</span>
          </div>
          <div className="github-details">
            {profile.company && <span>🏢 {profile.company}</span>}
            {profile.location && <span>📍 {profile.location}</span>}
          </div>
          <button className="github-view-button" onClick={() => openGitHub()}>
            View on GitHub
          </button>
        </div>

        <div className="github-main">
          {activeTab === 'overview' && (
            <div className="github-overview">
              <h3>Pinned Repositories</h3>
              <div className="github-repos-grid">
                {pinnedRepos.map((repo) => (
                  <div key={repo.id} className="github-repo-card" onClick={() => openGitHub(repo.html_url)}>
                    <h4>{repo.name}</h4>
                    <p>{repo.description}</p>
                    <div className="github-repo-stats">
                      <span>{repo.language}</span>
                      <span>⭐ {repo.stargazers_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'repos' && (
             <div className="github-overview">
             <h3>All Repositories</h3>
             <div className="github-repos-list"> {/* Changed from grid to list for all repos */}
               {repos.map((repo) => (
                 <div key={repo.id} className="github-repo-item" onClick={() => openGitHub(repo.html_url)}>
                   <h4>{repo.name}</h4>
                   <p>{repo.description}</p>
                   <div className="github-repo-stats">
                     <span>{repo.language}</span>
                     <span>⭐ {repo.stargazers_count}</span>
                   </div>
                 </div>
               ))}
             </div>
           </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;

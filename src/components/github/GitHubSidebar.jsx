import { useGitHub } from '@contexts/GitHubContext';

const GitHubSidebar = () => {
  const { profile, openGitHub } = useGitHub();

  if (!profile) return null;

  return (
    <div className="github-sidebar">
      <img src={profile.avatar_url} alt={profile.login} className="github-avatar" />
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
  );
};

export default GitHubSidebar;
import { useState, useEffect } from 'react';

const useGitHubProfile = (username = 'davidrocha9') => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { profile, repos, pinnedRepos, loading, error };
};

export default useGitHubProfile;
import { useChessContext } from '@contexts/ChessContext';

const ProfileCard = () => {
  const { profile, username } = useChessContext();

  return (
    <div className="profile-section">
      <div className="chess-avatar">
        {profile?.avatar ? (
          <img src={profile.avatar} alt={username} />
        ) : (
          <span>♟️</span>
        )}
      </div>
      <div className="chess-username">{profile?.username || username}</div>
      {profile?.title && <div className="chess-title">{profile.title}</div>}
      {profile?.country && (
        <div className="chess-country">
          {profile.country.split('/').pop()}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
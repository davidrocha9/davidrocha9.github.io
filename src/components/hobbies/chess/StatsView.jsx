import ProfileCard from './ProfileCard';
import RatingsGrid from './RatingsGrid';
import RecordSection from './RecordSection';
import { useChessContext } from '@contexts/ChessContext';

const StatsView = () => {
  const { profile, stats, username, formatRating } = useChessContext();

  return (
    <div className="chess-stats-view">
      <ProfileCard profile={profile} username={username} />
      <RatingsGrid formatRating={formatRating} />
      <RecordSection stats={stats} />
    </div>
  );
};

export default StatsView;
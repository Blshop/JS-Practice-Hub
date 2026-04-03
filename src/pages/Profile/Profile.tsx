import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/AuthStore';
import mockUserServerProgress from 'data/mock-user-server-progress.json';
import LoadingOverlay from 'components/LoadingOverlay';
import UserCard from './components/UserCard';
import StatsCards from './components/StatsCards';
import AttemptsChart from './components/AttemptsChart';
import ModulesChart from './components/ModulesChart';
import LessonsTable from './components/LessonsTable';
import { useProfileStats } from './hooks/useProfileStats';
import type { UserServerProgress } from 'types/UserProgress';
import styles from './Profile.module.scss';

const Profile: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserServerProgress | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Заменить на реальный API запрос
      // const response = await fetch('/api/user/progress');
      // const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUserProgress(mockUserServerProgress as UserServerProgress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = useProfileStats(userProgress);

  if (!stats || !userProgress || !authStore.user) {
    return <LoadingOverlay isLoading={isLoading} error={error} onRetry={loadData} />;
  }

  return (
    <>
      <LoadingOverlay isLoading={isLoading} error={error} onRetry={loadData} />
      <div className={styles.profile}>
        <UserCard
          username={authStore.user.username}
          email={authStore.user.email}
          earnedXP={stats.earnedXP}
          totalXP={stats.totalXP}
          completedLessons={stats.completedLessons}
          totalLessons={stats.totalLessons}
        />

        <StatsCards
          totalAttempts={stats.totalAttempts}
          totalSuccess={stats.totalSuccess}
          totalFailed={stats.totalFailed}
          successRate={stats.successRate}
        />

        <AttemptsChart totalSuccess={stats.totalSuccess} totalFailed={stats.totalFailed} />

        <ModulesChart moduleStats={stats.moduleStats} />

        <LessonsTable lessonStats={stats.lessonStats} />
      </div>
    </>
  );
});

export default Profile;

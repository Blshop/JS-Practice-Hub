import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/AuthStore';
import mockUserServerProgress from 'data/mock-user-server-progress.json';
import type { UserProgress } from 'types/UserProgress';
import { assertUserProgress } from 'utils/validateUserProgress';
import LoadingOverlay from 'components/LoadingOverlay';
import UserCard from './components/UserCard';
import StatsCards from './components/StatsCards';
import AttemptsChart from './components/AttemptsChart';
import ModulesChart from './components/ModulesChart';
import LessonsTable from './components/LessonsTable';
import { useProfileStats } from './hooks/useProfileStats';
import styles from './Profile.module.scss';

const Profile: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Заменить на реальный API запрос
      // 1. Удалить строку ниже (имитация задержки):
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 2. Заменить строку ниже на реальный запрос:
      // const response = await fetch('/api/user/progress');
      // const data = await response.json();
      const data = mockUserServerProgress;

      assertUserProgress(data);
      setUserProgress(data);
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

  return (
    <>
      <LoadingOverlay isLoading={isLoading} error={error} onRetry={loadData} />
      {stats && userProgress && authStore.user && (
        <div className={styles.profile}>
          <UserCard
            username={authStore.user.username}
            email={authStore.user.email}
            earnedXP={stats.earnedXP}
            totalXP={stats.totalXP}
            completedLessons={stats.completedLessons}
            totalLessons={stats.totalLessons}
            completedModules={stats.modulesOverallStats.completedModules}
            totalModules={stats.modulesOverallStats.totalModules}
          />

          <ModulesChart moduleStats={stats.moduleStats} />

          <div className={styles.section}>
            <StatsCards
              totalAttempts={stats.totalAttempts}
              totalSuccess={stats.totalSuccess}
              totalFailed={stats.totalFailed}
              successRate={stats.successRate}
              labels={{
                total: 'Total Attempts',
                success: 'Successful',
                failed: 'Failed',
                rate: 'Success Rate',
              }}
            />
            <AttemptsChart
              totalSuccess={stats.totalSuccess}
              totalFailed={stats.totalFailed}
              title="Tests Distribution"
            />
          </div>

          <div className={styles.section}>
            <AttemptsChart
              totalSuccess={stats.questionsStats.totalCorrect}
              totalFailed={stats.questionsStats.totalIncorrect}
              title="Questions Distribution"
              labels={{ success: 'Correct', failed: 'Incorrect' }}
            />
            <StatsCards
              totalAttempts={stats.questionsStats.totalAnswered}
              totalSuccess={stats.questionsStats.totalCorrect}
              totalFailed={stats.questionsStats.totalIncorrect}
              successRate={stats.questionsStats.successRate}
              labels={{
                total: 'Total Answered',
                success: 'Correct',
                failed: 'Incorrect',
                rate: 'Success Rate',
              }}
            />
          </div>

          <LessonsTable lessonStats={stats.lessonStats} />
        </div>
      )}
    </>
  );
});

export default Profile;

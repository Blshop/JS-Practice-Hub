import React from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/AuthStore';
import { userProgressStore } from 'store/UserProgressStore';
import type { UserProgress } from 'types/UserProgress';
import LoadingOverlay from 'components/LoadingOverlay';
import UserCard from './components/UserCard';
import StatsCards from './components/StatsCards';
import AttemptsChart from './components/AttemptsChart';
import ModulesChart from './components/ModulesChart';
import LessonsTable from './components/LessonsTable';
import { useProfileStats } from './hooks/useProfileStats';
import styles from './Profile.module.scss';

const Profile: React.FC = observer(() => {
  const userProgress: UserProgress = userProgressStore.progress;
  const stats = useProfileStats(userProgress);

  return (
    <>
      <LoadingOverlay
        isLoading={userProgressStore.isLoading}
        error={userProgressStore.loadError}
        onRetry={() => userProgressStore.loadFromServer()}
      />
      {stats && authStore.user && (
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

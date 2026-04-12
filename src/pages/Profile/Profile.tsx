import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
                total: t('profile.stats.totalAttempts'),
                success: t('profile.stats.successful'),
                failed: t('profile.stats.failed'),
                rate: t('profile.stats.successRate'),
              }}
            />
            <AttemptsChart
              totalSuccess={stats.totalSuccess}
              totalFailed={stats.totalFailed}
              title={t('profile.charts.testsDistribution')}
            />
          </div>

          <div className={styles.section}>
            <AttemptsChart
              totalSuccess={stats.questionsStats.totalCorrect}
              totalFailed={stats.questionsStats.totalIncorrect}
              title={t('profile.charts.questionsDistribution')}
              labels={{ success: t('profile.stats.correct'), failed: t('profile.stats.incorrect') }}
            />
            <StatsCards
              totalAttempts={stats.questionsStats.totalAnswered}
              totalSuccess={stats.questionsStats.totalCorrect}
              totalFailed={stats.questionsStats.totalIncorrect}
              successRate={stats.questionsStats.successRate}
              labels={{
                total: t('profile.stats.totalAnswered'),
                success: t('profile.stats.correct'),
                failed: t('profile.stats.incorrect'),
                rate: t('profile.stats.successRate'),
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

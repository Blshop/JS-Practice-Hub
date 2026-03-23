import React, { useMemo, useState, useEffect } from 'react';
import learningPathData from 'data/js-learning-path-data.json';
import userLessonsProgress from 'data/mock-user-lessons-progress.json';
import {
  type Module,
  type UserProgress,
  type Status,
  type Lesson,
  STATUS,
} from 'types/LearningPath';
import Header from './components/Header';
import Footer from './components/Footer';
import LearningPath from './components/LearningPath';
import LoadingOverlay from 'components/LoadingOverlay';
import styles from './Main.module.scss';
import Badge from 'components/Badge';

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Имитация загрузки данных с сервера
  const loadData = () => {
    setIsLoading(true);
    setError(null);

    // TODO: заменить на реальный запрос к серверу
    setTimeout(() => {
      // Первая загрузка всегда с ошибкой, последующие - успешные
      if (isFirstLoad) {
        setError('Failed to load learning path data. Please try again.');
        setIsLoading(false);
        setIsFirstLoad(false);
      } else {
        setUserProgress(userLessonsProgress as UserProgress);
        setIsLoading(false);
      }
    }, 2000);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const learningModules = useMemo(() => {
    if (!userProgress) return [];

    const modules: Module[] = [];

    for (const module of learningPathData.modules) {
      const lessons: Lesson[] = [];

      for (const lesson of module.lessons) {
        const completedTasks = Math.min(userProgress.lessons[lesson.id] ?? 0, lesson.totalTasks);
        let status: Status;

        if (completedTasks === lesson.totalTasks) {
          status = STATUS.COMPLETED;
        } else if (completedTasks > 0) {
          status = STATUS.PROGRESS;
        } else {
          status = STATUS.WAIT;
        }

        lessons.push({
          ...lesson,
          status,
          completedTasks,
        });
      }

      const moduleTotalTasks = lessons.reduce((sum, lesson) => sum + lesson.totalTasks, 0);
      const moduleCompletedTasks = lessons.reduce(
        (sum, lesson) => sum + Math.min(lesson.completedTasks, lesson.totalTasks),
        0,
      );
      let moduleStatus: Status;

      if (moduleCompletedTasks === moduleTotalTasks) {
        moduleStatus = STATUS.COMPLETED;
      } else if (moduleCompletedTasks > 0) {
        moduleStatus = STATUS.PROGRESS;
      } else {
        moduleStatus = STATUS.WAIT;
      }

      modules.push({
        ...module,
        lessons,
        status: moduleStatus,
        completedTasks: moduleCompletedTasks,
        totalTasks: moduleTotalTasks,
      });
    }

    return modules;
  }, [userProgress]);

  const totalXp = useMemo(() => {
    if (!userProgress) return 0;

    return learningPathData.modules.reduce(
      (xp, module) =>
        xp +
        module.lessons.reduce((moduleXp, lesson) => {
          const completedTasks = userProgress.lessons[lesson.id] || 0;

          return moduleXp + (completedTasks >= lesson.totalTasks ? lesson.xpReward : 0);
        }, 0),
      0,
    );
  }, [userProgress]);

  return (
    <div className={styles.main}>
      <Header />
      <LoadingOverlay isLoading={isLoading} error={error} onRetry={loadData} />
      <section className={styles.main__content}>
        {userProgress && (
          <>
            <Badge variant="info" size="large">
              ⚡ {totalXp} XP
            </Badge>
            <LearningPath modules={learningModules} />
          </>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Main;

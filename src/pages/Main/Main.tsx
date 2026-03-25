import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import learningPathData from 'data/js-learning-path-data.json';
import userLessonsProgress from 'data/mock-user-lessons-progress.json';
import {
  type Module,
  type UserProgress,
  type Status,
  type Lesson,
  STATUS,
} from 'types/LearningPath';
import LearningPath from './components/LearningPath';
import LoadingOverlay from 'components/LoadingOverlay';
import Badge from 'components/Badge';

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const isFirstLoadRef = useRef(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Заменить на реальный API запрос
      // 1. Удалить строку ниже (имитация задержки):
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 2. Удалить блок имитации ошибки (строки ниже до setUserProgress):
      // Первая загрузка всегда с ошибкой, последующие - успешные
      if (isFirstLoadRef.current) {
        isFirstLoadRef.current = false;
        throw new Error('Failed to load learning path data. Please try again.');
      }
      // 3. Удалить isFirstLoadRef из компонента (объявление и useRef импорт если больше не используется)

      // 4. Заменить строку ниже на реальный запрос:
      // const response = await fetch('/api/user/progress');
      // const data = await response.json();
      // setUserProgress(data);
      setUserProgress(userLessonsProgress as UserProgress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
    <>
      <LoadingOverlay isLoading={isLoading} error={error} onRetry={loadData} />
      <section>
        {userProgress && (
          <>
            <Badge variant="info" size="large">
              ⚡ {totalXp} XP
            </Badge>
            <LearningPath modules={learningModules} />
          </>
        )}
      </section>
    </>
  );
};

export default Main;

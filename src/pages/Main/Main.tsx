import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import learningPathData from 'data/js-learning-path-data.json';
import { userProgressStore } from 'store/UserProgressStore';
import type { UserProgress } from 'types/UserProgress';
import { type Module, type Status, type Lesson, STATUS } from 'types/LearningPath';
import LearningPath from './components/LearningPath';
import LoadingOverlay from 'components/LoadingOverlay';
import Badge from 'components/Badge';

const Main: React.FC = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with real API request to sync with server
      // const response = await fetch('/api/user/progress');
      // const data = await response.json();
      // Sync with userProgressStore if needed

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const userProgress: UserProgress = userProgressStore.progress;

  const learningModules = useMemo(() => {
    const modules: Module[] = [];

    for (const module of learningPathData.modules) {
      const lessons: Lesson[] = [];

      for (const lesson of module.lessons) {
        const lessonProgress = userProgress.lessons[lesson.id];
        const completedTasks = lessonProgress
          ? Math.min(lessonProgress.successAttempt, lesson.totalTasks)
          : 0;
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
    return learningPathData.modules.reduce(
      (xp, module) =>
        xp +
        module.lessons.reduce((moduleXp, lesson) => {
          const lessonProgress = userProgress.lessons[lesson.id];
          const completedTasks = lessonProgress ? lessonProgress.successAttempt : 0;

          return moduleXp + (completedTasks >= lesson.totalTasks ? lesson.xpReward : 0);
        }, 0),
      0,
    );
  }, [userProgress]);

  return (
    <>
      <LoadingOverlay isLoading={isLoading} error={error} onRetry={loadData} />
      <section>
        <Badge variant="info" size="large">
          ⚡ {totalXp} XP
        </Badge>
        <LearningPath modules={learningModules} />
      </section>
    </>
  );
});

export default Main;

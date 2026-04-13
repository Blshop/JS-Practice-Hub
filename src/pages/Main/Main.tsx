import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import learningPathData from 'data/js-learning-path-data.json';
import { userProgressStore } from 'store/UserProgressStore';
import type { UserProgress } from 'types/UserProgress';
import { type Module, type Lesson } from 'types/LearningPath';
import {
  calculateLessonCompletedTasks,
  calculateLessonStatus,
  calculateModuleStatus,
  calculateTotalEarnedXP,
} from 'pages/Profile/utils/progressCalculations';
import LearningPath from './components/LearningPath';
import LoadingOverlay from 'components/LoadingOverlay';
import Badge from 'components/Badge';

const Main: React.FC = observer(() => {
  const userProgress: UserProgress = userProgressStore.progress;

  const learningModules = useMemo(() => {
    const modules: Module[] = [];

    for (const module of learningPathData.modules) {
      const lessons: Lesson[] = [];

      for (const lesson of module.lessons) {
        const lessonProgress = userProgress.lessons[lesson.id];
        const completedTasks = calculateLessonCompletedTasks(lessonProgress, lesson.totalTasks);
        const status = calculateLessonStatus(completedTasks, lesson.totalTasks);

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
      const moduleStatus = calculateModuleStatus(moduleCompletedTasks, moduleTotalTasks);

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
    return calculateTotalEarnedXP(userProgress, learningPathData.modules);
  }, [userProgress]);

  return (
    <>
      <LoadingOverlay
        isLoading={userProgressStore.isLoading}
        error={userProgressStore.loadError}
        onRetry={() => userProgressStore.loadFromServer()}
      />
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

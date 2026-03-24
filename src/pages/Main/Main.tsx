import React, { useMemo } from 'react';
import learningPathData from 'data/js-learning-path-data.json';
import userLessonsProgress from 'data/mock-user-lessons-progress.json';
import {
  type Module,
  type UserProgress,
  type Status,
  type Lesson,
  STATUS,
} from 'types/LearningPath';
import Header from 'components/Header';
import Footer from 'components/Footer';
import LearningPath from './components/LearningPath';
import styles from './Main.module.scss';
import Badge from 'components/Badge';

const Main: React.FC = () => {
  // TODO: заменить на реальный запрос к серверу
  const userProgress = useMemo(() => userLessonsProgress as UserProgress, []);

  const learningModules = useMemo(() => {
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

  const totalXp = useMemo(
    () =>
      learningPathData.modules.reduce(
        (xp, module) =>
          xp +
          module.lessons.reduce((moduleXp, lesson) => {
            const completedTasks = userProgress.lessons[lesson.id] || 0;

            return moduleXp + (completedTasks >= lesson.totalTasks ? lesson.xpReward : 0);
          }, 0),
        0,
      ),
    [userProgress],
  );

  return (
    <div className={styles.main}>
      <Header />
      <section className={styles.main__content}>
        <Badge variant="info" size="large">
          ⚡ {totalXp} XP
        </Badge>
        <LearningPath modules={learningModules} />
      </section>
      <Footer />
    </div>
  );
};

export default Main;

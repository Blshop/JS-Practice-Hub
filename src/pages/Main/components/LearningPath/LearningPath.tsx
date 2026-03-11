import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../../../../data/learningPath';
import type { Module, Lesson, LessonStatus } from '../../../../types/LearningPath';
import { useLearningProgress } from '../../../../hooks/useLearningProgress';
import { ProgressBar } from '../ProgressBar';
import { Achievement } from '../Achievement';
import styles from './LearningPath.module.scss';

const LearningPath: React.FC = () => {
  const navigate = useNavigate();
  const { userProgress, achievement, closeAchievement } = useLearningProgress();

  // Вычисляем статусы уроков и модулей на основе прогресса
  const learningModules = useMemo(() => {
    return modules.map((module) => {
      const updatedLessons = module.lessons.map((lesson) => {
        let status: LessonStatus = 'locked';

        if (userProgress.completedLessons.includes(lesson.id)) {
          status = 'completed';
        } else if (lesson.id === userProgress.currentLesson) {
          status = 'current';
        } else if (!lesson.requiredXp || userProgress.totalXp >= lesson.requiredXp) {
          status = 'available';
        }

        return { ...lesson, status };
      });

      // Определяем статус модуля
      const completedLessons = updatedLessons.filter((l) => l.status === 'completed').length;
      const totalLessons = updatedLessons.length;

      let moduleStatus = module.status;
      if (completedLessons === totalLessons) {
        moduleStatus = 'completed';
      } else if (updatedLessons.some((l) => l.status === 'available' || l.status === 'current')) {
        moduleStatus = 'available';
      }

      return {
        ...module,
        lessons: updatedLessons,
        status: moduleStatus,
      };
    });
  }, [userProgress]);

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.status === 'locked') return;

    // Переход к уроку (пока просто в demo, позже можно создать отдельную страницу урока)
    navigate('/demo', { state: { lessonId: lesson.id, questionIds: lesson.questionIds } });
  };

  const getModuleStatusText = (module: Module): string => {
    const completedCount = module.lessons.filter((l) => l.status === 'completed').length;
    const totalCount = module.lessons.length;

    if (module.status === 'completed') {
      return `Завершен (${completedCount}/${totalCount})`;
    } else if (module.status === 'available') {
      return `В процессе (${completedCount}/${totalCount})`;
    } else {
      return 'Заблокирован';
    }
  };

  return (
    <div className={styles.learningPath}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>Изучение JavaScript</h1>

        <div className={styles.header__progress}>
          <div className={styles.header__xp}>
            <span className={styles.header__xpIcon}>⚡</span>
            <span>{userProgress.totalXp} XP</span>
          </div>

          <div className={styles.header__streak}>
            <span className={styles.header__streakIcon}>🔥</span>
            <span>{userProgress.streak} дней</span>
          </div>
        </div>
      </div>

      {learningModules.map((module) => (
        <div key={module.id} className={styles.moduleContainer}>
          <div className={styles.moduleHeader}>
            <div
              className={`${styles.moduleHeader__badge} ${styles[`moduleHeader__badge--${module.status}`]}`}
            >
              <span>{module.icon}</span>
              <span>{getModuleStatusText(module)}</span>
            </div>

            <h2 className={styles.moduleHeader__title}>{module.title}</h2>
            <p className={styles.moduleHeader__description}>{module.description}</p>

            <ProgressBar
              current={module.lessons.filter((l) => l.status === 'completed').length}
              total={module.lessons.length}
              label="Прогресс модуля"
            />
          </div>

          <div className={styles.lessonsPath}>
            {module.lessons.map((lesson, lessonIndex) => (
              <div key={lesson.id} className={styles.lessonNode}>
                <button
                  className={`${styles.lessonButton} ${styles[`lessonButton--${lesson.status}`]}`}
                  onClick={() => handleLessonClick(lesson)}
                  disabled={lesson.status === 'locked'}
                  title={
                    lesson.status === 'locked'
                      ? `Требуется ${lesson.requiredXp} XP`
                      : lesson.description
                  }
                >
                  {lesson.status !== 'locked' ? lessonIndex + 1 : ''}
                </button>

                <div className={styles.lessonInfo}>
                  <div className={styles.lessonInfo__title}>{lesson.title}</div>
                  <div className={styles.lessonInfo__xp}>+{lesson.xpReward} XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {achievement && (
        <Achievement
          title={achievement.title}
          description={achievement.description}
          icon={achievement.icon}
          xpReward={achievement.xpReward}
          onClose={closeAchievement}
        />
      )}
    </div>
  );
};

export default LearningPath;

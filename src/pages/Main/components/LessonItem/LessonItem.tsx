import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Lesson } from 'types/LearningPath';
import { STATUS } from 'types/LearningPath';
import Button from 'components/Button';
import Badge from 'components/Badge';
import Text from 'components/Text';
import styles from './LessonItem.module.scss';
import { routes } from 'config/routes';

interface LessonItemProps {
  lesson: Lesson;
}

const STATUS_VARIANT = {
  [STATUS.COMPLETED]: 'success',
  [STATUS.PROGRESS]: 'warning',
  [STATUS.WAIT]: 'light',
} as const;

const LessonItem: React.FC<LessonItemProps> = ({ lesson }) => {
  const navigate = useNavigate();

  const handleLessonClick = (lesson: Lesson) => {
    navigate(routes.quiz.mask, { state: { lessonId: lesson.id, lessonTitle: lesson.title } });
  };

  return (
    <div className={styles.lessonItem}>
      <Badge variant={STATUS_VARIANT[lesson.status]} size="small">
        +{lesson.xpReward} XP
      </Badge>
      <Button
        className={styles.lessonButton}
        variant={STATUS_VARIANT[lesson.status]}
        onClick={() => handleLessonClick(lesson)}
        title={lesson.title}
      >
        {lesson.completedTasks}/{lesson.totalTasks}
      </Button>
      <Text tag="h4" className={styles.lessonTitle} uppercase bold>
        {lesson.title}
      </Text>
    </div>
  );
};

LessonItem.displayName = 'LessonItem';

export default LessonItem;

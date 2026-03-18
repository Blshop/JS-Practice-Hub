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

const getVariantByStatus = (status: Lesson['status']) => {
  switch (status) {
    case STATUS.COMPLETED:
      return 'success' as const;
    case STATUS.PROGRESS:
      return 'warning' as const;
    case STATUS.WAIT:
      return 'light' as const;
    default:
      return 'light' as const;
  }
};

const LessonItem: React.FC<LessonItemProps> = ({ lesson }) => {
  const navigate = useNavigate();

  const handleLessonClick = (lesson: Lesson) => {
    // TODO: заменить на страницу с заданием
    navigate(routes.main.mask, { state: { lessonId: lesson.id } });
  };

  return (
    <div className={styles.lessonItem}>
      <Badge variant={getVariantByStatus(lesson.status)} size="small">
        +{lesson.xpReward} XP
      </Badge>
      <Button
        className={styles.lessonButton}
        variant={getVariantByStatus(lesson.status)}
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

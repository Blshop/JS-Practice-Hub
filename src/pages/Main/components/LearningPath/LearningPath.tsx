import React from 'react';
import type { Module } from 'types/LearningPath';
import ModuleItem from '../ModuleItem';
import LessonItem from '../LessonItem';
import styles from './LearningPath.module.scss';
import Text from 'components/Text';
import { useTranslation } from 'react-i18next';

interface LearningPathProps {
  modules: Module[];
}

const LearningPath: React.FC<LearningPathProps> = ({ modules }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.learningPath}>
      <Text tag="h2" className={styles.learningPath__title} uppercase bold>
        {t('learningPath.title')}
      </Text>
      {modules.length === 0 ? (
        <Text className={styles.learningPath__emptyMessage} tag="p" bold error>
          {t('learningPath.empty')}
        </Text>
      ) : (
        modules.map((module) => (
          <ModuleItem key={module.id} module={module}>
            {module.lessons.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} />
            ))}
          </ModuleItem>
        ))
      )}
    </div>
  );
};

LearningPath.displayName = 'LearningPath';

export default LearningPath;

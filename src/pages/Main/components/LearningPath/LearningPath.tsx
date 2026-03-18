import React from 'react';
import type { Module } from 'types/LearningPath';
import ModuleItem from '../ModuleItem';
import LessonItem from '../LessonItem';
import styles from './LearningPath.module.scss';
import Text from 'components/Text';

interface LearningPathProps {
  modules: Module[];
}

const LearningPath: React.FC<LearningPathProps> = ({ modules }) => {
  return (
    <div className={styles.learningPath}>
      <Text tag="h2" className={styles.learningPath__title} uppercase bold>
        Learning JavaScript
      </Text>
      {modules.map((module) => (
        <ModuleItem key={module.id} module={module}>
          {module.lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </ModuleItem>
      ))}
    </div>
  );
};

LearningPath.displayName = 'LearningPath';

export default LearningPath;

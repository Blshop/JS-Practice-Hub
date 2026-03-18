import React from 'react';
import type { Module } from 'types/LearningPath';
import ProgressBar from 'components/ProgressBar';
import styles from './ModuleItem.module.scss';
import Text from 'components/Text';

interface ModuleItemProps {
  module: Module;
  children: React.ReactNode;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, children }) => {
  return (
    <div className={styles.moduleItem}>
      <div className={styles.moduleHeader}>
        <Text tag="h3" bold uppercase>
          {module.title}
        </Text>
        <Text tag="p">{module.description}</Text>
        <ProgressBar
          className={styles.moduleHeader__progress}
          current={module.completedTasks}
          total={module.totalTasks}
          label="Progress"
        />
      </div>
      <div className={styles.lessonsPath}>{children}</div>
    </div>
  );
};

ModuleItem.displayName = 'ModuleItem';

export default ModuleItem;

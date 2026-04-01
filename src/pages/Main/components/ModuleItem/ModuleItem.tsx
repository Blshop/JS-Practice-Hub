import React from 'react';
import type { Module } from 'types/LearningPath';
import ProgressBar from 'components/ProgressBar';
import styles from './ModuleItem.module.scss';
import Text from 'components/Text';
import { useTranslation } from 'react-i18next';
import { localize } from 'utils/localize';

interface ModuleItemProps {
  module: Module;
  children: React.ReactNode;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, children }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.moduleItem}>
      <div className={styles.moduleHeader}>
        <Text tag="h3" bold uppercase>
          {localize(module.title, i18n.language)}
        </Text>
        <Text tag="p">{localize(module.description, i18n.language)}</Text>
        <ProgressBar
          className={styles.moduleHeader__progress}
          current={module.completedTasks}
          total={module.totalTasks}
          label={t('learningPath.progress')}
        />
      </div>
      <div className={styles.lessonsPath}>{children}</div>
    </div>
  );
};

ModuleItem.displayName = 'ModuleItem';

export default ModuleItem;

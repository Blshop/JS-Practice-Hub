import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import styles from './StatsCards.module.scss';

export interface StatsCardsProps {
  totalAttempts: number;
  totalSuccess: number;
  totalFailed: number;
  successRate: number;
  labels?: {
    total?: string;
    success?: string;
    failed?: string;
    rate?: string;
  };
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalAttempts,
  totalSuccess,
  totalFailed,
  successRate,
  labels,
}) => {
  const { t } = useTranslation();

  const defaultLabels = {
    total: t('profile.stats.totalAttempts'),
    success: t('profile.stats.successful'),
    failed: t('profile.stats.failed'),
    rate: t('profile.stats.successRate'),
  };

  const finalLabels = { ...defaultLabels, ...labels };

  return (
    <div className={styles.statsCards}>
      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue}>
          {totalAttempts}
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          {finalLabels.total}
        </Text>
      </div>

      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue} success>
          {totalSuccess}
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          {finalLabels.success}
        </Text>
      </div>

      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue} error>
          {totalFailed}
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          {finalLabels.failed}
        </Text>
      </div>

      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue}>
          {successRate}%
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          {finalLabels.rate}
        </Text>
      </div>
    </div>
  );
};

StatsCards.displayName = 'StatsCards';

export default StatsCards;

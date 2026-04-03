import React from 'react';
import Text from 'components/Text';
import styles from './StatsCards.module.scss';

interface StatsCardsProps {
  totalAttempts: number;
  totalSuccess: number;
  totalFailed: number;
  successRate: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalAttempts,
  totalSuccess,
  totalFailed,
  successRate,
}) => {
  return (
    <div className={styles.statsCards}>
      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue}>
          {totalAttempts}
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          Total Attempts
        </Text>
      </div>

      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue} success>
          {totalSuccess}
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          Successful
        </Text>
      </div>

      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue} error>
          {totalFailed}
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          Failed
        </Text>
      </div>

      <div className={styles.card}>
        <Text tag="div" className={styles.cardValue}>
          {successRate}%
        </Text>
        <Text tag="p" muted className={styles.cardLabel}>
          Success Rate
        </Text>
      </div>
    </div>
  );
};

export default StatsCards;

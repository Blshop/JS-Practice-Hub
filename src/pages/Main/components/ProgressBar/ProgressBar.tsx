import React from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
      </div>

      {(label || showPercentage) && (
        <div className={styles.progressText}>
          <span className={styles.progressText__label}>{label || `${current} из ${total}`}</span>
          {showPercentage && <span className={styles.progressText__percentage}>{percentage}%</span>}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;

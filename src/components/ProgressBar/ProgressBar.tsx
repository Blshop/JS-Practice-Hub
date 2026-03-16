import React from 'react';
import styles from './ProgressBar.module.scss';
import classNames from 'classnames';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  positionInfo?: 'top' | 'bottom';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  positionInfo = 'top',
  ...props
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={classNames(styles.wrapper, styles[`${positionInfo}Info`])} {...props}>
      <div className={styles.progressInfo}>
        {label && <span className={styles.progressInfo__label}>{label}</span>}
        {showPercentage && <span className={styles.progressInfo__percentage}>{percentage}%</span>}
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;

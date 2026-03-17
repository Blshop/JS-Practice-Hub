import React from 'react';
import styles from './ProgressBar.module.scss';
import classNames from 'classnames';

export type ProgressBarVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  positionInfo?: 'top' | 'bottom';
  variant?: ProgressBarVariant;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  positionInfo = 'top',
  variant = 'primary',
  ...props
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={classNames(styles.wrapper, styles[`${positionInfo}Info`])} {...props}>
      <div className={styles.progressInfo}>
        {label && <span className={styles.progressInfo__label}>{label}</span>}
        {showPercentage && (
          <span className={classNames(styles.progressInfo__percentage, styles[variant])}>
            {percentage}%
          </span>
        )}
      </div>

      <div className={styles.progressBar}>
        <div
          className={classNames(styles.progressFill, styles[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;

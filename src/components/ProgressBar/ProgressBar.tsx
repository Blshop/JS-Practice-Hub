import React from 'react';
import Badge from 'components/Badge';
import Text from 'components/Text';
import styles from './ProgressBar.module.scss';
import classNames from 'classnames';

export type ProgressBarVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

type ProgressBarProps = React.HTMLAttributes<HTMLElement> & {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  positionInfo?: 'top' | 'bottom';
  variant?: ProgressBarVariant;
};

const ProgressBar = ({
  current,
  total,
  label,
  showPercentage = true,
  positionInfo = 'top',
  variant = 'primary',
  className,
  ...props
}: ProgressBarProps) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div
      className={classNames(styles.wrapper, styles[`${positionInfo}Info`], className)}
      {...props}
    >
      <div className={styles.progressInfo}>
        {label && (
          <Text uppercase bold>
            {label}
          </Text>
        )}
        {showPercentage && (
          <Badge className={styles.progressInfo__percentage} variant={variant}>
            {percentage}%
          </Badge>
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

import React from 'react';
import classNames from 'classnames';
import styles from './Badge.module.scss';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export type BadgeSize = 'small' | 'medium' | 'large';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

const Badge = ({
  children,
  className,
  variant = 'primary',
  size = 'medium',
  ...props
}: BadgeProps) => {
  return (
    <span className={classNames(styles.badge, styles[variant], styles[size], className)} {...props}>
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;

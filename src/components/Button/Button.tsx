import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link';

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const Button = ({
  children,
  className,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        { [styles.loading]: loading },
        className,
        type,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && <span className={styles.loader} />}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;

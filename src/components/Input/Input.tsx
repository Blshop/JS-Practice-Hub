import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputVariant = 'default' | 'error' | 'success';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  large?: boolean;
  variant?: InputVariant;
};

const Input = ({
  className,
  type = 'text',
  variant = 'default',
  large = false,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      className={classNames(styles.input, styles[variant], { [styles.large]: large }, className)}
      {...props}
    />
  );
};

Input.displayName = 'Input';

export default Input;

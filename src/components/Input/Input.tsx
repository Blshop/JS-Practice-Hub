import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import Text from 'components/Text';

export type InputSize = 'small' | 'medium' | 'large';

export type InputTypes =
  | 'text'
  | 'password'
  | 'email'
  | 'tel'
  | 'url'
  | 'search'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'week'
  | 'time';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: InputTypes;
  label?: string;
  error?: string;
  elementSize?: InputSize;
  success?: boolean;
};

const Input = ({
  className,
  label,
  error,
  elementSize = 'medium',
  success,
  id,
  type = 'text',
  ...props
}: InputProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId} className={classNames(styles.label, styles[elementSize])}>
          {label}
        </label>
      )}

      <div className={styles.wrapper}>
        <input
          id={inputId}
          type={type}
          className={classNames(
            styles.input,
            styles[elementSize],
            {
              [styles.error]: !!error,
              [styles.success]: success && !error,
            },
            className,
          )}
          {...props}
        />
      </div>

      {error && (
        <Text tag="span" error className={styles.message}>
          {error}
        </Text>
      )}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;

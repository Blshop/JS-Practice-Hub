import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';
import Text from 'components/Text';

export type InputSize = 'small' | 'medium' | 'large';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
  ...props
}: InputProps) => {
  return (
    <div className={styles.container}>
      {label && (
        <Text tag="label" className={classNames(styles.label, styles[elementSize])}>
          {label}
        </Text>
      )}

      <div className={styles.wrapper}>
        <input
          id={id}
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

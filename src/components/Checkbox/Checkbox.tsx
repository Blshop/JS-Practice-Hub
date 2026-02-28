import React from 'react';
import classNames from 'classnames';
import styles from './Checkbox.module.scss';

export type CheckboxSize = 'small' | 'medium' | 'large';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  elementSize?: CheckboxSize;
  label?: string;
  error?: string;
};

const Checkbox = ({
  className,
  label,
  error,
  elementSize = 'medium',
  id,
  ...props
}: CheckboxProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          id={inputId}
          type="checkbox"
          className={classNames(
            styles.input,
            styles[elementSize],
            {
              [styles.error]: !!error,
            },
            className,
          )}
          {...props}
        />
        {label && (
          <label htmlFor={inputId} className={classNames(styles.label, styles[elementSize])}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;

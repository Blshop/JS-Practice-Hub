import React from 'react';
import classNames from 'classnames';
import styles from './Radio.module.scss';

export type RadioSize = 'small' | 'medium' | 'large';

export type RadioProps = React.ComponentPropsWithRef<'input'> & {
  elementSize?: RadioSize;
  label?: string;
  error?: boolean;
  success?: boolean;
};

const Radio = ({
  className,
  label,
  error,
  success,
  elementSize = 'medium',
  id,
  disabled,
  ref,
  ...props
}: RadioProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          id={inputId}
          type="radio"
          disabled={disabled}
          ref={ref}
          aria-invalid={!!error}
          className={classNames(
            styles.input,
            styles[elementSize],
            { [styles.error]: !!error },
            { [styles.success]: !!success },
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={classNames(styles.label, styles[elementSize], {
              [styles.error]: !!error,
              [styles.success]: !!success,
              [styles.disabled]: !!disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

Radio.displayName = 'Radio';

export default Radio;

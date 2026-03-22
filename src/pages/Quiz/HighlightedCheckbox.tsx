import React from 'react';
import classNames from 'classnames';
import styles from 'components/Checkbox/Checkbox.module.scss';

export type CheckboxSize = 'small' | 'medium' | 'large';

export type CheckboxProps = React.ComponentPropsWithRef<'input'> & {
  elementSize?: CheckboxSize;
  label?: React.ReactNode;
  error?: boolean;
  success?: boolean;
};

const Checkbox = ({
  className,
  label,
  error,
  success,
  elementSize = 'medium',
  id,
  disabled,
  ref,
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;

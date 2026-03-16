import React from 'react';
import classNames from 'classnames';
import styles from 'components/Checkbox/Checkbox.module.scss';

export type CheckboxSize = 'small' | 'medium' | 'large';

export type HighlightedCheckboxProps = React.ComponentPropsWithRef<'input'> & {
  elementSize?: CheckboxSize;
  label?: React.ReactNode;
  error?: boolean;
};

const HighlightedCheckbox = ({
  className,
  label,
  error,
  elementSize = 'medium',
  id,
  disabled,
  ref,
  ...props
}: HighlightedCheckboxProps) => {
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
            className,
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={classNames(styles.label, styles[elementSize], {
              [styles.error]: !!error,
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

HighlightedCheckbox.displayName = 'Checkbox';

export default HighlightedCheckbox;

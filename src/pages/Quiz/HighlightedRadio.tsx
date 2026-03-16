import React from 'react';
import classNames from 'classnames';
import styles from 'components/Radio/Radio.module.scss';

export type RadioSize = 'small' | 'medium' | 'large';

export type HighlightedRadioProps = React.ComponentPropsWithRef<'input'> & {
  elementSize?: RadioSize;
  label?: React.ReactNode;
  error?: boolean;
};

const HighlightedRadio = ({
  className,
  label,
  error,
  elementSize = 'medium',
  id,
  disabled,
  ref,
  ...props
}: HighlightedRadioProps) => {
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

HighlightedRadio.displayName = 'Radio';

export default HighlightedRadio;

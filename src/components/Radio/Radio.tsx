import React from 'react';
import classNames from 'classnames';
import styles from './Radio.module.scss';

export type RadioSize = 'small' | 'medium' | 'large';

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  elementSize?: RadioSize;
  label?: string;
};

const Radio = ({ className, label, elementSize = 'medium', id, ...props }: RadioProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          id={inputId}
          type="radio"
          className={classNames(styles.input, styles[elementSize], className)}
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

Radio.displayName = 'Radio';

export default Radio;

import React from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputSize = 'small' | 'default';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  elementSize?: InputSize;
};

const Input = ({ className, elementSize = 'default', ...props }: InputProps) => {
  return <input className={classNames(styles.input, styles[elementSize], className)} {...props} />;
};

Input.displayName = 'Input';

export default Input;

import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ text, className, ...props }) => {
  const defaultClassName = {
    [styles.button]: true,
    [styles.button_disabled]: props.disabled,
    ...(typeof className === 'string' ? { [className]: true } : className),
  };

  return (
    <button className={classNames(defaultClassName)} disabled={props.disabled} {...props}>
      {text}
    </button>
  );
};

export default Button;

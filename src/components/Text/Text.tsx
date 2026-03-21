import React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label' | 'div' | 'span';

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  tag?: TextElement;
  muted?: boolean;
  bold?: boolean;
  error?: boolean;
  uppercase?: boolean;
  success?: boolean;
};

const Text = ({
  tag,
  className,
  children,
  muted,
  bold,
  error,
  success,
  uppercase,
  ...props
}: TextProps) => {
  const Tag = tag ?? 'div';

  return (
    <Tag
      className={classNames(
        styles.text,
        styles[Tag],
        { [styles.muted]: muted },
        { [styles.bold]: bold },
        { [styles.error]: !!error },
        { [styles.uppercase]: uppercase },
        { [styles.success]: success },
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

Text.displayName = 'Text';
export default Text;

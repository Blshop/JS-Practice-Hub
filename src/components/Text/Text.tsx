import React from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'label' | 'div' | 'span';

export type TextProps = React.HTMLAttributes<HTMLElement> & {
  tag?: TextElement;
  muted?: boolean;
  bold?: boolean;
  error?: boolean;
};

const Text = ({ tag, className, children, muted, bold, error, ...props }: TextProps) => {
  const Component = tag ?? 'div';

  return (
    <Component
      className={classNames(
        styles.text,
        styles[Component],
        { [styles.muted]: muted },
        { [styles.bold]: bold },
        { [styles.error]: error },
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';
export default Text;

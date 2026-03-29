import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.scss';

export type LoaderSize = 'small' | 'medium' | 'large';

export type LoaderProps = {
  size?: LoaderSize;
  loading?: boolean;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'medium', loading = true, className }) => {
  if (!loading) return null;

  return (
    <div
      className={classNames(styles.loader, styles[size], className)}
      role="status"
      aria-label="Loading"
    ></div>
  );
};

Loader.displayName = 'Loader';

export default Loader;

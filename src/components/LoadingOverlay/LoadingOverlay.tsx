import React, { useEffect } from 'react';
import classNames from 'classnames';
import Loader, { type LoaderSize } from 'components/Loader';
import Button from 'components/Button';
import Text from 'components/Text';
import styles from './LoadingOverlay.module.scss';

export type LoadingOverlayProps = {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
  loaderSize?: LoaderSize;
  className?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  error,
  onRetry,
  loaderSize = 'large',
  className,
}) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className={classNames(styles.overlay, className)}>
          <Loader size={loaderSize} loading={isLoading} />
        </div>
      )}

      {error && !isLoading && (
        <div className={classNames(styles.overlay, className)}>
          <div className={styles.error} role="alert">
            <div className={styles.errorIcon}>⚠️</div>
            <Text tag="p" error className={styles.errorMessage}>
              {error}
            </Text>
            {onRetry && (
              <Button variant="warning" size="large" onClick={onRetry}>
                Try Again
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';

export default LoadingOverlay;

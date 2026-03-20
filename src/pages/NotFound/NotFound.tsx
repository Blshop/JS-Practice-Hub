import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(routes.main.create());
  };

  return (
    <div className={styles.notFound}>
      <Text tag="h1" className={styles.notFound__title}>
        404
      </Text>
      <Text tag="p" className={styles.notFound__message}>
        Oops! The page you're looking for doesn't exist
      </Text>
      <Button variant="primary" size="large" onClick={handleGoHome}>
        Home
      </Button>
    </div>
  );
};

export default NotFound;

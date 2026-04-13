import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from 'config/routes';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate(routes.main.create());
  };

  return (
    <div className={styles.notFound}>
      <Text tag="h1" error className={styles.notFound__title}>
        404
      </Text>
      <Text tag="p" className={styles.notFound__message}>
        {t('notFound.message')}
      </Text>
      <Button variant="primary" size="large" onClick={handleGoHome}>
        {t('notFound.home')}
      </Button>
    </div>
  );
};

export default NotFound;

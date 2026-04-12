import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from 'config/routes';
import Text from 'components/Text';
import styles from './Auth.module.scss';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isLogin = location.pathname === routes.auth.login;

  const handleToggle = () => {
    const newPath = isLogin ? routes.auth.register : routes.auth.login;
    navigate(newPath);
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__wrapper}>
        <div className={styles.auth__banner} />
        <div className={styles.auth__content}>
          <Text tag="h1" className={styles.auth__title}>
            {isLogin ? t('auth.login') : t('auth.register')}
          </Text>

          <div className={styles.auth__formContainer}>
            <div key={`${i18n.language}-${location.pathname}`}>
              <Outlet />
            </div>
          </div>

          <Text className={styles.auth__switch}>
            {isLogin ? (
              <>
                {t('auth.noAccount')}{' '}
                <Text tag="span" onClick={handleToggle} className={styles.auth__switchLink}>
                  {t('auth.registerLink')}
                </Text>{' '}
                {t('auth.now')}
              </>
            ) : (
              <>
                {t('auth.hasAccount')}{' '}
                <Text tag="span" onClick={handleToggle} className={styles.auth__switchLink}>
                  {t('auth.loginLink')}
                </Text>{' '}
                {t('auth.now')}
              </>
            )}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Auth;

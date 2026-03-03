import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { routes } from 'config/routes';
import Text from 'components/Text';
import styles from './Auth.module.scss';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
            {isLogin ? 'Login' : 'Register'}
          </Text>

          <div className={styles.auth__formContainer}>
            <Outlet />
          </div>

          <Text className={styles.auth__switch}>
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <Text tag="span" onClick={handleToggle} className={styles.auth__switchLink}>
                  Register
                </Text>{' '}
                now!
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Text tag="span" onClick={handleToggle} className={styles.auth__switchLink}>
                  Login
                </Text>{' '}
                now!
              </>
            )}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Auth;

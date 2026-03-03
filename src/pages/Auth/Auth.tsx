import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Text from 'components/Text';
import styles from './Auth.module.scss';

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === routes.auth.create.login();

  const handleToggle = () => {
    const newPath = isLogin ? routes.auth.create.register() : routes.auth.create.login();
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
            {isLogin ? <LoginForm /> : <RegisterForm />}
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

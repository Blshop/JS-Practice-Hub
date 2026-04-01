import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Text from 'components/Text';
import { routes } from 'config/routes';
import { authStore } from 'store/AuthStore';
import styles from './Header.module.scss';
import Button from 'components/Button';
import Badge from 'components/Badge';

const NAV_ITEMS = [
  { label: 'Home', path: routes.main.mask },
  { label: 'Profile', path: routes.profile.mask },
  { label: 'About', path: routes.about.mask },
  { label: 'Demo', path: routes.demo.mask },
] as const;

export const Header: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    authStore.logout();
    navigate(routes.main.mask);
    closeMenu();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <Text className={styles.header__heading} tag="h1" bold>
        JS-Practice-Hub
      </Text>
      <nav
        className={classNames(styles.header__nav, {
          [styles.header__nav_open]: isOpen,
        })}
        role="navigation"
        aria-label="Main navigation"
      >
        {authStore.isAuthenticated && (
          <>
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.label}
                  variant="secondary"
                  onClick={() => handleNavigation(item.path)}
                  className={classNames(styles.header__link, styles.button)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Text uppercase bold>
                    {item.label}
                  </Text>
                </Button>
              );
            })}

            <Button
              variant="danger"
              onClick={handleLogout}
              className={classNames(styles.header__link, styles.button)}
            >
              <Text bold>Logout</Text>
            </Button>

            <Badge variant="info">🙂 {authStore.user?.username}</Badge>
          </>
        )}

        {!authStore.isAuthenticated && (
          <Button
            onClick={() => handleNavigation(routes.auth.mask)}
            className={classNames(styles.header__link, styles.button)}
          >
            <Text bold>Login</Text>
          </Button>
        )}
      </nav>

      <Button
        className={classNames(styles.burgerMenu__toggle)}
        onClick={toggleMenu}
        variant="secondary"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        aria-hidden="true"
      >
        <Text tag="span" bold>
          {isOpen ? '✖' : '☰'}
        </Text>
      </Button>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

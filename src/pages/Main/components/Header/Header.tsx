import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Text from 'components/Text';
import { routes } from 'config/routes';
import styles from './Header.module.scss';
import Button from 'components/Button';

const NAV_ITEMS = [
  { label: 'Home', path: routes.main.mask, disabled: false },
  { label: 'Profile', path: routes.main.mask, disabled: true },
  { label: 'About', path: routes.about.mask, disabled: true },
  { label: 'Demo', path: routes.demo.mask, disabled: false },
] as const;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigation = (path: string, disabled?: boolean) => {
    if (disabled) return;
    navigate(path);
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
      <div className={styles.header__container}>
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
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                variant="secondary"
                onClick={() => handleNavigation(item.path, item.disabled)}
                className={classNames(styles.header__link, styles.header__button, {
                  [styles.header__button_active]: isActive,
                  [styles.header__button_disabled]: item.disabled,
                })}
                disabled={item.disabled}
                aria-current={isActive ? 'page' : undefined}
              >
                <Text bold>{item.label}</Text>
              </Button>
            );
          })}
        </nav>
        <Button
          className={classNames(styles.burgerMenu__toggle, {
            [styles.burgerMenu__toggle_active]: isOpen,
          })}
          onClick={toggleMenu}
          variant="secondary"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
        >
          <span className={styles.burgerMenu__line}></span>
          <span className={styles.burgerMenu__line}></span>
          <span className={styles.burgerMenu__line}></span>
        </Button>
      </div>
      {isOpen && <div className={styles.overlay} onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
};

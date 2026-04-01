import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Text from 'components/Text';
import { routes } from 'config/routes';
import { authStore } from 'store/AuthStore';
import styles from './Header.module.scss';
import Button from 'components/Button';

type Theme = 'light' | 'dark';
const THEME_KEY = 'app-theme';
const getInitialTheme = (): Theme => (localStorage.getItem(THEME_KEY) as Theme) ?? 'light';

export const Header: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const isRu = i18n.language === 'ru';
  const showBurger = authStore.isAuthenticated;

  const NAV_ITEMS = [
    { label: t('nav.home'), path: routes.main.mask },
    { label: t('nav.about'), path: routes.about.mask },
    { label: t('nav.demo'), path: routes.demo.mask },
  ] as const;

  const closeMenu = () => setIsOpen(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
    setProfileOpen(false);
  };

  const handleLogout = () => {
    authStore.logout();
    navigate(routes.main.mask);
    closeMenu();
    setProfileOpen(false);
  };

  const toggleLanguage = () => i18n.changeLanguage(isRu ? 'en' : 'ru');

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        setProfileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    };
    if (profileOpen) document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [profileOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <Text className={styles.header__heading} tag="h1" bold>
        JS-Practice-Hub
      </Text>

      {showBurger && (
        <nav
          className={classNames(styles.header__nav, { [styles.header__nav_open]: isOpen })}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className={classNames(styles.burgerHeader, styles.mobileOnly)}>
            <Text bold>🙂 {authStore.user?.username}</Text>
            <Button
              variant="secondary"
              onClick={closeMenu}
              aria-label="Close menu"
              className={styles.burgerClose}
            >
              <Text tag="span" bold>
                ✖
              </Text>
            </Button>
          </div>

          {NAV_ITEMS.map((item) => (
            <Button
              key={item.label}
              variant="secondary"
              onClick={() => handleNavigation(item.path)}
              className={styles.button}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <Text uppercase bold>
                {item.label}
              </Text>
            </Button>
          ))}

          <Button
            variant="secondary"
            onClick={() => handleNavigation(routes.profile.mask)}
            className={classNames(styles.button, styles.mobileOnly)}
          >
            <Text uppercase bold>
              {t('nav.profile')}
            </Text>
          </Button>
          <Button
            variant="danger"
            onClick={handleLogout}
            className={classNames(styles.button, styles.mobileOnly)}
          >
            <Text bold>{t('nav.logout')}</Text>
          </Button>

          <div className={classNames(styles.burgerToggles, styles.showBelow720)}>
            <button className={styles.toggleBtn} onClick={toggleLanguage}>
              <span
                className={classNames(styles.toggleOption, { [styles.toggleOption_active]: isRu })}
              >
                RU
              </span>
              <span className={styles.toggleDivider}>/</span>
              <span
                className={classNames(styles.toggleOption, { [styles.toggleOption_active]: !isRu })}
              >
                EN
              </span>
            </button>
            <button className={styles.toggleBtn} onClick={toggleTheme}>
              <span
                className={classNames(styles.toggleOption, {
                  [styles.toggleOption_active]: theme === 'light',
                })}
              >
                ☀
              </span>
              <span className={styles.toggleDivider}>/</span>
              <span
                className={classNames(styles.toggleOption, {
                  [styles.toggleOption_active]: theme === 'dark',
                })}
              >
                ☾
              </span>
            </button>
          </div>
        </nav>
      )}

      <div className={styles.header__controls}>
        <div className={classNames(styles.controlGroup, styles.hideBelow720)}>
          <button
            className={styles.toggleBtn}
            onClick={toggleLanguage}
            aria-label={isRu ? 'Switch to English' : 'Переключить на русский'}
          >
            <span
              className={classNames(styles.toggleOption, { [styles.toggleOption_active]: isRu })}
            >
              RU
            </span>
            <span className={styles.toggleDivider}>/</span>
            <span
              className={classNames(styles.toggleOption, { [styles.toggleOption_active]: !isRu })}
            >
              EN
            </span>
          </button>
        </div>

        <div className={classNames(styles.controlGroup, styles.hideBelow720)}>
          <button
            className={styles.toggleBtn}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            <span
              className={classNames(styles.toggleOption, {
                [styles.toggleOption_active]: theme === 'light',
              })}
            >
              ☀
            </span>
            <span className={styles.toggleDivider}>/</span>
            <span
              className={classNames(styles.toggleOption, {
                [styles.toggleOption_active]: theme === 'dark',
              })}
            >
              ☾
            </span>
          </button>
        </div>

        {authStore.isAuthenticated && (
          <div
            className={classNames(styles.controlGroup, styles.profileGroup, styles.desktopOnly)}
            ref={profileRef}
          >
            <button
              className={classNames(styles.toggleBtn, styles.profileBtn)}
              onClick={() => setProfileOpen((p) => !p)}
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              <span>🙂</span>
              <span className={styles.usernameText}>{authStore.user?.username}</span>
              <span
                className={classNames(styles.profileArrow, {
                  [styles.profileArrow_open]: profileOpen,
                })}
              >
                ▾
              </span>
            </button>

            {profileOpen && (
              <div className={styles.profileDropdown}>
                <button
                  className={styles.profileDropdown__item}
                  onClick={() => handleNavigation(routes.profile.mask)}
                >
                  {t('nav.profile')}
                </button>
                <button
                  className={classNames(
                    styles.profileDropdown__item,
                    styles.profileDropdown__item_danger,
                  )}
                  onClick={handleLogout}
                >
                  {t('nav.logout')}
                </button>
              </div>
            )}
          </div>
        )}

        {!authStore.isAuthenticated && (
          <div className={styles.controlGroup}>
            <Button onClick={() => handleNavigation(routes.auth.mask)} className={styles.button}>
              <Text bold>{t('nav.login')}</Text>
            </Button>
          </div>
        )}
      </div>

      {showBurger && (
        <button
          className={classNames(styles.burgerMenu__toggle, {
            [styles.burgerMenu__toggle_hidden]: isOpen,
          })}
          onClick={() => setIsOpen((p) => !p)}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

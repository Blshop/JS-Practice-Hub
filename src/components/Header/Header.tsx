import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import Text from 'components/Text';
import { routes } from 'config/routes';
import { authStore } from 'store/AuthStore';
import { themeStore } from 'store/ThemeStore';
import styles from './Header.module.scss';
import Button from 'components/Button';
import { soundService } from 'services/soundService';

export const Header: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => soundService.isMuted());
  const profileRef = useRef<HTMLDivElement>(null);

  const isRu = i18n.language === 'ru';
  const isAuthenticated = authStore.isAuthenticated;
  const showBurger = true;

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

  const toggleSound = () => {
    const nowMuted = soundService.toggleMute();
    setIsMuted(nowMuted);
  };

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
          {isAuthenticated && (
            <div className={classNames(styles.burgerHeader, styles.mobileOnly)}>
              <Text bold>🙂 {authStore.user?.username}</Text>
            </div>
          )}

          {isAuthenticated &&
            NAV_ITEMS.map((item) => (
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

          {isAuthenticated && (
            <>
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
            </>
          )}

          {!isAuthenticated && (
            <div className={classNames(styles.burgerGuestItems, styles.mobileOnly)}>
              <button
                className={styles.iconBtn}
                onClick={() => handleNavigation(routes.about.mask)}
                title={t('nav.about')}
              >
                <span>i</span>
              </button>
              <button className={styles.iconBtn} onClick={toggleLanguage}>
                <span>{isRu ? 'RU' : 'EN'}</span>
              </button>
              <button className={styles.iconBtn} onClick={themeStore.toggleTheme}>
                <span>{themeStore.theme === 'light' ? '☀' : '☾'}</span>
              </button>
              <button
                className={styles.iconBtn}
                onClick={toggleSound}
                aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
              >
                <span>{isMuted ? '🔇' : '🔊'}</span>
              </button>
              <button
                className={styles.iconBtn}
                onClick={() => handleNavigation(routes.auth.login)}
                title={t('nav.login')}
              >
                <span>👤</span>
              </button>
            </div>
          )}

          {isAuthenticated && (
            <div className={classNames(styles.burgerToggles, styles.showBelow720)}>
              <button className={styles.toggleBtn} onClick={toggleLanguage}>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: isRu,
                  })}
                >
                  RU
                </span>
                <span className={styles.toggleDivider}>/</span>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: !isRu,
                  })}
                >
                  EN
                </span>
              </button>
              <button className={styles.toggleBtn} onClick={themeStore.toggleTheme}>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: themeStore.theme === 'light',
                  })}
                >
                  ☀
                </span>
                <span className={styles.toggleDivider}>/</span>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: themeStore.theme === 'dark',
                  })}
                >
                  ☾
                </span>
              </button>
              <button
                className={styles.toggleBtn}
                onClick={toggleSound}
                aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
              >
                <span className={styles.toggleOption_active}>{isMuted ? '🔇' : '🔊'}</span>
              </button>
            </div>
          )}
        </nav>
      )}
      <div className={styles.header__controls}>
        <div
          className={classNames(
            styles.controlGroup,
            isAuthenticated ? styles.hideBelow720 : styles.guestDesktopOnly,
          )}
        >
          <button
            className={isAuthenticated ? styles.toggleBtn : styles.iconBtn}
            onClick={toggleLanguage}
            aria-label={isRu ? 'Switch to English' : 'Переключить на русский'}
          >
            {isAuthenticated ? (
              <>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: isRu,
                  })}
                >
                  RU
                </span>
                <span className={styles.toggleDivider}>/</span>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: !isRu,
                  })}
                >
                  EN
                </span>
              </>
            ) : (
              <span className={styles.toggleOption_active}>{isRu ? 'RU' : 'EN'}</span>
            )}
          </button>
        </div>

        <div
          className={classNames(
            styles.controlGroup,
            isAuthenticated ? styles.hideBelow720 : styles.guestDesktopOnly,
          )}
        >
          <button
            className={isAuthenticated ? styles.toggleBtn : styles.iconBtn}
            onClick={themeStore.toggleTheme}
            aria-label={
              themeStore.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
            }
          >
            {isAuthenticated ? (
              <>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: themeStore.theme === 'light',
                  })}
                >
                  ☀
                </span>
                <span className={styles.toggleDivider}>/</span>
                <span
                  className={classNames(styles.toggleOption, {
                    [styles.toggleOption_active]: themeStore.theme === 'dark',
                  })}
                >
                  ☾
                </span>
              </>
            ) : (
              <span className={styles.toggleOption_active}>
                {themeStore.theme === 'light' ? '☀' : '☾'}
              </span>
            )}
          </button>
        </div>

        {!isAuthenticated && (
          <div className={classNames(styles.controlGroup, styles.guestDesktopOnly)}>
            <button
              className={styles.iconBtn}
              onClick={() => handleNavigation(routes.about.mask)}
              aria-label={t('nav.about')}
              title={t('nav.about')}
            >
              <span className={styles.toggleOption_active}>i</span>
            </button>
          </div>
        )}

        <div
          className={classNames(
            styles.controlGroup,
            isAuthenticated ? styles.hideBelow720 : styles.guestDesktopOnly,
          )}
        >
          <button
            className={isAuthenticated ? styles.toggleBtn : styles.iconBtn}
            onClick={toggleSound}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
          >
            <span className={styles.toggleOption_active}>{isMuted ? '🔇' : '🔊'}</span>
          </button>
        </div>

        {!isAuthenticated && (
          <div className={classNames(styles.controlGroup, styles.guestDesktopOnly)}>
            <button
              className={styles.iconBtn}
              onClick={() => handleNavigation(routes.auth.login)}
              aria-label={t('nav.login')}
              title={t('nav.login')}
            >
              <span className={styles.toggleOption_active}>👤</span>
            </button>
          </div>
        )}

        {isAuthenticated && (
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
      </div>
      {showBurger && (
        <button
          className={styles.burgerMenu__toggle}
          onClick={() => setIsOpen((p) => !p)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? '✖' : '☰'}
        </button>
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

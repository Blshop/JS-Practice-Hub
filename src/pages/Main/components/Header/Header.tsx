import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Text from 'components/Text';
import { routes } from 'config/routes';
import styles from './Header.module.scss';
import Button from 'components/Button';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

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
        >
          <Button
            variant="secondary"
            onClick={() => handleNavigation(routes.main.mask)}
            className={classNames(styles.header__link, styles.header__button)}
          >
            <Text bold>Home</Text>
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleNavigation('#')}
            className={classNames(styles.header__link, styles.header__button)}
          >
            <Text bold>Profile</Text>
          </Button>
          <Button
            className={classNames(styles.header__link, styles.header__button)}
            variant="secondary"
            onClick={() => handleNavigation(routes.about.mask)}
          >
            <Text bold>About</Text>
          </Button>
        </nav>
        <Button
          className={classNames(styles.burgerMenu__toggle, {
            [styles.burgerMenu__toggle_active]: isOpen,
          })}
          onClick={toggleMenu}
          variant="secondary"
          aria-label="Toggle menu"
        >
          <span className={styles.burgerMenu__line}></span>
          <span className={styles.burgerMenu__line}></span>
          <span className={styles.burgerMenu__line}></span>
        </Button>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import classNames from 'classnames';
import Text from '../../../../components/Text';
import { routes } from 'config/routes';
import styles from './Header.module.scss';
import Button from 'components/Button';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
          <a href={routes.main.mask} className={styles.header__link}>
            <Button variant="secondary" onClick={closeMenu}>
              <Text bold>Home</Text>
            </Button>
          </a>
          <a href={`#`} className={styles.header__link}>
            <Button variant="secondary" onClick={closeMenu}>
              <Text bold>Profile</Text>
            </Button>
          </a>
          <a href={routes.about.mask} className={styles.header__link}>
            <Button className={styles.header__button} variant="secondary" onClick={closeMenu}>
              <Text bold>About</Text>
            </Button>
          </a>
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

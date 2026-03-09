import React from 'react';
import Text from '../../../../components/Text';
import { routes } from 'config/routes';
import styles from './Header.module.scss';
import Button from 'components/Button';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Text className={styles.header__heading} tag="h1" bold>
          JS-Practice-Hub
        </Text>
        <nav className={styles.header__nav}>
          <a href={routes.main.mask} className={styles.header__link}>
            <Button variant="secondary">
              <Text bold>Home</Text>
            </Button>
          </a>
          <a href={`#`} className={styles.header__link}>
            <Button variant="secondary">
              <Text bold>Profile</Text>
            </Button>
          </a>
          <a href={routes.about.mask} className={styles.header__link}>
            <Button className={styles.header__button} variant="secondary">
              <Text bold>About</Text>
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
};

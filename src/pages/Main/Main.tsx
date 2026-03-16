import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <Header />
      <section className={styles.main__content}></section>
      <Footer />
    </div>
  );
};

export default Main;

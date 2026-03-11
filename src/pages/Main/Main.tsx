import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LearningPath } from './components/LearningPath';
import { Reference } from './components/Reference';
import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <Header />
      <section className={styles.main__content}>
        <LearningPath />
        <Reference />
      </section>
      <Footer />
    </div>
  );
};

export default Main;

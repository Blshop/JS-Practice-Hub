import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import 'styles/styles.css';
import styles from './App.module.scss';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={styles.app}>
      <main className={styles.app__main}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

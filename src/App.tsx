import { Outlet, useLocation, useMatches } from 'react-router';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { soundService } from 'services/soundService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'styles/styles.css';
import styles from './App.module.scss';
import Footer from 'components/Footer';
import Header from 'components/Header';

interface RouteHandle {
  hideHeaderFooter: boolean;
}

const App = observer(() => {
  const location = useLocation();
  const matches = useMatches();

  const hideHeaderFooter = matches.some(
    (match) => (match.handle as RouteHandle | undefined)?.hideHeaderFooter,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleClick = () => soundService.play('click');
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={styles.app}>
      {!hideHeaderFooter && <Header />}

      <main className={styles.app__main}>
        <Outlet />
      </main>

      {!hideHeaderFooter && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
});

export default App;

import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';
import App from '../App';
import { routes } from './routes';
import Auth from 'pages/Auth';
import LoginForm from 'pages/Auth/components/LoginForm';
import RegisterForm from 'pages/Auth/components/RegisterForm';
import Demo from 'pages/Demo';
import QuizPage from 'pages/Quiz';
import Main from 'pages/Main';
import Profile from 'pages/Profile';
import PrivateRoute from 'components/PrivateRoute';
import NotFound from 'pages/NotFound';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    errorElement: <>Ошибка</>,
    children: [
      {
        path: routes.main.mask,
        element: (
          <PrivateRoute>
            <Main />
          </PrivateRoute>
        ),
      },
      {
        path: routes.profile.mask,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: routes.about.mask,
        element: <>О приложении</>,
      },
      {
        path: routes.auth.mask,
        element: (
          <PrivateRoute inverted>
            <Auth />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={routes.auth.login} replace />,
          },
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: 'register',
            element: <RegisterForm />,
          },
          {
            path: '*',
            element: <Navigate to={routes.auth.login} replace />,
          },
        ],
      },
      {
        path: routes.demo.mask,
        element: <Demo />,
      },
      {
        path: routes.quiz.mask,
        element: (
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        handle: { hideHeaderFooter: true },
        element: <NotFound />,
      },
    ],
  },
];

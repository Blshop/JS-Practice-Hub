import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';
import App from '../App';
import { routes } from './routes';
import Auth from 'pages/Auth';
import LoginForm from 'pages/Auth/components/LoginForm';
import RegisterForm from 'pages/Auth/components/RegisterForm';
import Demo from 'pages/Demo';
import Main from 'pages/Main';
import PrivateRoute from 'components/PrivateRoute';

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
            <>Профиль пользователя</>
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
        ],
      },
      {
        path: routes.demo.mask,
        element: <Demo />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];

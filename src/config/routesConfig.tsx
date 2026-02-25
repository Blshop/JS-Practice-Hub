import { Navigate } from 'react-router';
import type { RouteObject } from 'react-router';
import App from '../App';
import { routes } from './routes';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    errorElement: <>Ошибка</>,
    children: [
      {
        path: routes.main.mask,
        element: <>Главная</>,
      },
      {
        path: routes.about.mask,
        element: <>О приложении</>,
      },
      {
        path: routes.auth.mask,
        element: <>Авторизация/Регистрация</>,
        children: [
          {
            index: true,
            element: <Navigate to={routes.auth.login} replace />,
          },
          {
            path: 'login',
            element: <>Форма логина</>,
          },
          {
            path: 'register',
            element: <>Форма регистрации</>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];

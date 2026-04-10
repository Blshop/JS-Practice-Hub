import ReactDOM from 'react-dom/client';
import 'i18n/i18n';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from 'config/routesConfig';

const router = createBrowserRouter(routesConfig, {
  basename: import.meta.env.BASE_URL,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);

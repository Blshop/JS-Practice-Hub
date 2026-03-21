import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from 'store/AuthStore';
import { routes } from 'config/routes';

export type PrivateRouteProps = {
  children: React.ReactNode;
  inverted?: boolean;
  redirectTo?: string;
};

const PrivateRoute: React.FC<PrivateRouteProps> = observer(
  ({ children, inverted = false, redirectTo }) => {
    const location = useLocation();
    const isAuthenticated = authStore.isAuthenticated;

    const allowed = inverted ? !isAuthenticated : isAuthenticated;

    if (!allowed) {
      const defaultRedirect = inverted ? routes.profile.create() : routes.auth.create.login();

      return <Navigate to={redirectTo || defaultRedirect} state={{ from: location }} replace />;
    }

    return <>{children}</>;
  },
);

export default PrivateRoute;

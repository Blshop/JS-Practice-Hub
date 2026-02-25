export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  about: {
    mask: '/about',
    create: () => `/about`,
  },
  auth: {
    mask: '/auth/*',
    login: '/auth/login',
    register: '/auth/register',
    create: {
      login: () => '/auth/login',
      register: () => '/auth/register',
    },
  },
};

export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  profile: {
    mask: '/profile',
    create: () => `/profile`,
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
  demo: {
    mask: '/demo',
    create: () => `/demo`,
  },
};

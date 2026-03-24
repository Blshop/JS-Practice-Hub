import type { User } from 'types/User';

export const MOCK_AUTH_ERROR_TRIGGER = 'Error1';

export const mockLogin = (
  email: string,
  password: string,
): Promise<{ user: User; jwt: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === MOCK_AUTH_ERROR_TRIGGER) {
        reject(new Error('Invalid credentials'));
      } else {
        resolve({
          user: {
            id: 1,
            username: email.split('@')[0] || 'user',
            email,
          },
          jwt: 'fake-jwt-token',
        });
      }
    }, 1000);
  });
};

export const mockRegister = (
  username: string,
  email: string,
  password: string,
): Promise<{ user: User; jwt: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === MOCK_AUTH_ERROR_TRIGGER) {
        reject(new Error('Registration failed'));
      } else {
        resolve({
          user: {
            id: 1,
            username,
            email,
          },
          jwt: 'fake-jwt-token',
        });
      }
    }, 1000);
  });
};

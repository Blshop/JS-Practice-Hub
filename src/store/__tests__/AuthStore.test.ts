import { authStore } from 'store/AuthStore';
import * as authService from 'services/authService';
import { setAccessToken } from 'services/api';
import { notifySuccess, notifyError, notifyInfo } from 'utils/notify';

jest.mock('services/authService');
jest.mock('utils/notify');

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockSetAccessToken = setAccessToken as jest.Mock;
const mockNotifySuccess = notifySuccess as jest.Mock;
const mockNotifyError = notifyError as jest.Mock;
const mockNotifyInfo = notifyInfo as jest.Mock;

describe('AuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    authStore.logout();
    authStore.clearSessionError();
  });

  describe('isAuthenticated', () => {
    it('возвращает false, если нет accessToken или user', () => {
      expect(authStore.isAuthenticated).toBe(false);
      authStore.accessToken = 'token';
      expect(authStore.isAuthenticated).toBe(false);
      authStore.user = { id: 1, username: 'test', email: 'test@example.com' };
      expect(authStore.isAuthenticated).toBe(true);
    });
  });

  describe('restoreSession', () => {
    it('успешно восстанавливает сессию', async () => {
      const mockResponse = {
        accessToken: 'newToken',
        user: { id: 1, username: 'test', email: 'test@example.com' },
      };
      mockAuthService.refresh.mockResolvedValue(mockResponse);

      const result = await authStore.restoreSession();

      expect(result).toBe(true);
      expect(authStore.accessToken).toBe('newToken');
      expect(authStore.user).toEqual(mockResponse.user);
      expect(mockSetAccessToken).toHaveBeenCalledWith('newToken');
      expect(authStore.isLoading).toBe(false);
      expect(authStore.sessionError).toBeNull();
    });

    it('обрабатывает 401 и возвращает false', async () => {
      const error = { response: { status: 401 }, isAxiosError: true };
      mockAuthService.refresh.mockRejectedValue(error);

      const result = await authStore.restoreSession();

      expect(result).toBe(false);
      expect(authStore.accessToken).toBeNull();
      expect(authStore.user).toBeNull();
      expect(authStore.isLoading).toBe(false);
      expect(authStore.sessionError).toBeNull();
    });

    it('обрабатывает сетевую ошибку и устанавливает sessionError', async () => {
      const error = { isAxiosError: true, message: 'Network Error' };
      mockAuthService.refresh.mockRejectedValue(error);

      const result = await authStore.restoreSession();

      expect(result).toBe(false);
      expect(authStore.sessionError).toBe('Network error. Cannot reach the server.');
      expect(authStore.isLoading).toBe(false);
    });
  });

  describe('login', () => {
    it('успешный вход', async () => {
      const mockResponse = {
        accessToken: 'token',
        user: { id: 1, username: 'test', email: 'test@example.com' },
      };
      mockAuthService.login.mockResolvedValue(mockResponse);

      const result = await authStore.login('test@example.com', 'password');

      expect(result).toBe(true);
      expect(authStore.accessToken).toBe('token');
      expect(authStore.user).toEqual(mockResponse.user);
      expect(mockSetAccessToken).toHaveBeenCalledWith('token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
      expect(mockNotifySuccess).toHaveBeenCalledWith('Welcome, test!');
    });

    it('ошибка при логине', async () => {
      const error = { response: { data: { message: 'Invalid credentials' } }, isAxiosError: true };
      mockAuthService.login.mockRejectedValue(error);

      const result = await authStore.login('test@example.com', 'wrong');

      expect(result).toBe(false);
      expect(authStore.error).toBe('Invalid credentials');
      expect(mockNotifyError).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  describe('register', () => {
    it('успешная регистрация', async () => {
      const mockResponse = {
        accessToken: 'token',
        user: { id: 1, username: 'newuser', email: 'new@example.com' },
      };
      mockAuthService.register.mockResolvedValue(mockResponse);

      const result = await authStore.register('newuser', 'new@example.com', 'password');

      expect(result).toBe(true);
      expect(authStore.accessToken).toBe('token');
      expect(authStore.user).toEqual(mockResponse.user);
      expect(mockSetAccessToken).toHaveBeenCalledWith('token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
      expect(mockNotifySuccess).toHaveBeenCalledWith('Account created! Welcome, newuser!');
    });

    it('ошибка регистрации', async () => {
      const error = { response: { data: { message: 'Email already exists' } }, isAxiosError: true };
      mockAuthService.register.mockRejectedValue(error);

      const result = await authStore.register('newuser', 'new@example.com', 'password');

      expect(result).toBe(false);
      expect(authStore.error).toBe('Email already exists');
      expect(mockNotifyError).toHaveBeenCalledWith('Email already exists');
    });
  });

  describe('logout', () => {
    it('успешный выход', async () => {
      authStore.user = { id: 1, username: 'test', email: 'test@example.com' };
      authStore.accessToken = 'token';
      localStorage.setItem('user', JSON.stringify(authStore.user));
      mockAuthService.logout.mockResolvedValue(undefined);

      await authStore.logout();

      expect(authStore.user).toBeNull();
      expect(authStore.accessToken).toBeNull();
      expect(mockSetAccessToken).toHaveBeenCalledWith(null);
      expect(localStorage.getItem('user')).toBeNull();
      expect(mockNotifyInfo).toHaveBeenCalledWith('You have been logged out.');
    });

    it('при ошибке logout все равно очищает состояние', async () => {
      authStore.user = { id: 1, username: 'test', email: 'test@example.com' };
      authStore.accessToken = 'token';
      mockAuthService.logout.mockRejectedValue(new Error('Network error'));

      await authStore.logout();

      expect(authStore.user).toBeNull();
      expect(authStore.accessToken).toBeNull();
      expect(mockSetAccessToken).toHaveBeenCalledWith(null);
      expect(mockNotifyError).toHaveBeenCalled();
      expect(mockNotifyInfo).toHaveBeenCalledWith('You have been logged out.');
    });
  });
});

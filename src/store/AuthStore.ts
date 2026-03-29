import { makeAutoObservable, runInAction } from 'mobx';
import type { User } from 'types/User';
import { notifySuccess, notifyError, notifyInfo } from 'utils/notify';
import * as authService from 'services/authService';
import axios from 'axios';
import { setAccessToken } from 'services/api';

class AuthStore {
  user: User | null = null;
  accessToken: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  sessionError: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.restoreSession();
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken && !!this.user;
  }

  clearSessionError() {
    this.sessionError = null;
  }

  async restoreSession(): Promise<boolean> {
    this.isLoading = true;
    this.sessionError = null;

    try {
      const response = await authService.refresh();

      runInAction(() => {
        this.accessToken = response.accessToken;
        if (response.user) this.user = response.user;
        setAccessToken(this.accessToken);
        this.isLoading = false;
      });

      return true;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        runInAction(() => {
          this.isLoading = false;
        });
        return false;
      }

      let message = 'Failed to connect to server. Please check your connection.';
      if (axios.isAxiosError(err) && err.message === 'Network Error') {
        message = 'Network error. Cannot reach the server.';
      } else if (err instanceof Error) {
        message = err.message;
      }

      runInAction(() => {
        this.sessionError = message;
        this.isLoading = false;
      });

      return false;
    }
  }

  async retryRestore() {
    await this.restoreSession();
  }

  saveToStorage(): void {
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  clearStorage(): void {
    localStorage.removeItem('user');
  }

  async login(email: string, password: string): Promise<boolean> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await authService.login(email, password);

      runInAction(() => {
        this.user = response.user;
        this.accessToken = response.accessToken;
        setAccessToken(this.accessToken);
        this.saveToStorage();
        this.isLoading = false;
      });

      notifySuccess(`Welcome, ${response.user.username}!`);

      return true;
    } catch (error) {
      let message = 'Login failed';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      runInAction(() => {
        this.error = message;
        this.isLoading = false;
      });

      notifyError(message);

      return false;
    }
  }

  async register(username: string, email: string, password: string): Promise<boolean> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await authService.register(username, email, password);

      runInAction(() => {
        this.user = response.user;
        this.accessToken = response.accessToken;
        setAccessToken(this.accessToken);
        this.saveToStorage();
        this.isLoading = false;
      });

      notifySuccess(`Account created! Welcome, ${username}!`);

      return true;
    } catch (error) {
      let message = 'Registration failed';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      runInAction(() => {
        this.error = message;
        this.isLoading = false;
      });

      notifyError(message);

      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await authService.logout();
    } catch (error) {
      notifyError(`Failed to logout: ${error}`);
    } finally {
      runInAction(() => {
        this.user = null;
        this.accessToken = null;
        setAccessToken(null);
        this.error = null;
        this.clearStorage();
      });

      notifyInfo('You have been logged out.');
    }
  }
}

export const authStore = new AuthStore();

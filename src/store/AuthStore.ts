import { makeAutoObservable, runInAction } from 'mobx';
import type { User } from 'types/User';
import { notifySuccess, notifyError, notifyInfo } from 'utils/notify';
import * as authService from 'services/authService';
import axios from 'axios';
import { setAccessToken } from 'services/api';
import i18n from 'i18n/i18n';

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
    return !(!!this.accessToken && !!this.user);
  }

  clearSessionError() {
    this.sessionError = null;
  }

  async restoreSession(): Promise<boolean> {
    // this.isLoading = true;
    // this.sessionError = null;

    // try {
    //   const response = await authService.refresh();

    //   runInAction(() => {
    //     this.accessToken = response.accessToken;
    //     if (response.user) this.user = response.user;
    //     setAccessToken(this.accessToken);
    //     this.isLoading = false;
    //   });

    //   return true;
    // } catch (err) {
    //   if (axios.isAxiosError(err) && err.response?.status === 401) {
    //     runInAction(() => {
    //       this.isLoading = false;
    //     });
    //     return false;
    //   }

    //   let message = i18n.t('auth.errors.connectionError');
    //   if (axios.isAxiosError(err) && err.message === 'Network Error') {
    //     message = i18n.t('auth.errors.networkError');
    //   } else if (err instanceof Error) {
    //     message = err.message;
    //   }

    //   runInAction(() => {
    //     this.sessionError = message;
    //     this.isLoading = false;
    //   });

    //   return false;
    // }
    return true;
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

      notifySuccess(i18n.t('auth.errors.welcome', { name: response.user.username }));

      return true;
    } catch (error) {
      let message = i18n.t('auth.errors.loginFailed');

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

      notifySuccess(i18n.t('auth.errors.accountCreated', { name: username }));

      return true;
    } catch (error) {
      let message = i18n.t('auth.errors.registerFailed');

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
      notifyError(`${i18n.t('auth.errors.logoutFailed')}: ${error}`);
    } finally {
      runInAction(() => {
        this.user = null;
        this.accessToken = null;
        setAccessToken(null);
        this.error = null;
        this.clearStorage();
      });

      notifyInfo(i18n.t('auth.errors.loggedOut'));
    }
  }
}

export const authStore = new AuthStore();

import { makeAutoObservable, runInAction } from 'mobx';
import type { User } from 'types/User';
import { notifySuccess, notifyError, notifyInfo } from 'utils/notify';
import { mockLogin, mockRegister } from '../__mocks__/mockAuth';

class AuthStore {
  user: User | null = null;
  jwt: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromStorage();
  }

  get isAuthenticated(): boolean {
    return !!this.jwt && !!this.user;
  }

  loadFromStorage(): void {
    try {
      const jwt = localStorage.getItem('jwt');
      const user = localStorage.getItem('user');

      if (jwt && user) {
        this.jwt = jwt;
        this.user = JSON.parse(user);
      }
    } catch (error) {
      notifyError(`Failed to load auth data: ${error}`);
    }
  }

  saveToStorage(): void {
    if (this.jwt && this.user) {
      localStorage.setItem('jwt', this.jwt);
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  clearStorage(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }

  async login(email: string, password: string): Promise<boolean> {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await mockLogin(email, password);

      runInAction(() => {
        this.user = response.user;
        this.jwt = response.jwt;
        this.saveToStorage();
        this.isLoading = false;
      });

      notifySuccess(`Welcome, ${response.user.username}!`);

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';

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
      const response = await mockRegister(username, email, password);

      runInAction(() => {
        this.user = response.user;
        this.jwt = response.jwt;
        this.saveToStorage();
        this.isLoading = false;
      });

      notifySuccess(`Account created successfully! Welcome, ${username}!`);

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';

      runInAction(() => {
        this.error = message;
        this.isLoading = false;
      });

      notifyError(message);

      return false;
    }
  }

  logout(): void {
    this.user = null;
    this.jwt = null;
    this.error = null;
    this.clearStorage();
    notifyInfo('You have been logged out.');
  }
}

export const authStore = new AuthStore();

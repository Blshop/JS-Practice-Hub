import { makeAutoObservable, runInAction } from 'mobx';
import type { User } from 'types/User';
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
    const jwt = localStorage.getItem('jwt');
    const user = localStorage.getItem('user');

    if (jwt && user) {
      this.jwt = jwt;
      this.user = JSON.parse(user);
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

      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Login failed';
        this.isLoading = false;
      });

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

      return true;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Registration failed';
        this.isLoading = false;
      });

      return false;
    }
  }

  logout(): void {
    this.user = null;
    this.jwt = null;
    this.error = null;
    this.clearStorage();
  }
}

export const authStore = new AuthStore();

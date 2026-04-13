import { makeAutoObservable } from 'mobx';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'app-theme';

export class ThemeStore {
  theme: Theme = 'light';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.initTheme();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme;
    this.theme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  setTheme(theme: Theme): void {
    this.theme = theme;
    localStorage.setItem(THEME_KEY, this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);
  }
}

export const themeStore = new ThemeStore();

import { themeStore, ThemeStore } from '../ThemeStore';

describe('ThemeStore', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  describe('initTheme', () => {
    it('должен инициализироваться со светлой темой по умолчанию', () => {
      const store = new ThemeStore();
      expect(store.theme).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('должен восстанавливать тему из localStorage', () => {
      localStorage.setItem('app-theme', 'dark');
      const store = new ThemeStore();
      expect(store.theme).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('должен переключать тему со светлой на темную', () => {
      themeStore.setTheme('light');
      themeStore.toggleTheme();
      expect(themeStore.theme).toBe('dark');
      expect(localStorage.getItem('app-theme')).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('должен переключать тему с темной на светлую', () => {
      themeStore.setTheme('dark');
      themeStore.toggleTheme();
      expect(themeStore.theme).toBe('light');
      expect(localStorage.getItem('app-theme')).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('должен устанавливать светлую тему', () => {
      themeStore.setTheme('light');
      expect(themeStore.theme).toBe('light');
      expect(localStorage.getItem('app-theme')).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('должен устанавливать темную тему', () => {
      themeStore.setTheme('dark');
      expect(themeStore.theme).toBe('dark');
      expect(localStorage.getItem('app-theme')).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });
});

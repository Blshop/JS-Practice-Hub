import { render, screen } from '@testing-library/react';
import Header from '../Header';

const mockNavigate = jest.fn();
const mockLocation = { pathname: '/' };

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

jest.mock('store/AuthStore', () => ({
  authStore: {
    isAuthenticated: false,
    user: null,
    logout: jest.fn(),
  },
}));

import { authStore } from 'store/AuthStore';

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(authStore, 'isAuthenticated', {
      writable: true,
      configurable: true,
      value: false,
    });
    Object.defineProperty(authStore, 'user', {
      writable: true,
      configurable: true,
      value: null,
    });
  });

  describe('Рендеринг', () => {
    it('рендерит заголовок', () => {
      render(<Header />);
      expect(screen.getByText('JS-Practice-Hub')).toBeInTheDocument();
    });

    it('рендерит навигационные ссылки', () => {
      render(<Header />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Demo')).toBeInTheDocument();
    });

    it('отображает кнопку Logout для авторизованного пользователя', () => {
      Object.defineProperty(authStore, 'isAuthenticated', {
        writable: true,
        configurable: true,
        value: true,
      });
      Object.defineProperty(authStore, 'user', {
        writable: true,
        configurable: true,
        value: { id: 1, username: 'testuser', email: 'test@example.com' },
      });

      render(<Header />);
      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    });

    it('не отображает кнопку Logout для неавторизованного пользователя', () => {
      render(<Header />);
      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });
});

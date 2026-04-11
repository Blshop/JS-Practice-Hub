import { render, screen } from '@testing-library/react';
import UserCard from '../UserCard';

describe('UserCard', () => {
  const defaultProps = {
    username: 'testuser',
    email: 'test@example.com',
    earnedXP: 150,
    totalXP: 500,
    completedLessons: 10,
    totalLessons: 50,
    completedModules: 2,
    totalModules: 9,
  };

  it('должен отобразить имя пользователя', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('должен отобразить email', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('должен отобразить первую букву имени в аватаре', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('должен отобразить XP статистику', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByText(/150 \/ 500 XP/)).toBeInTheDocument();
  });

  it('должен отобразить статистику уроков', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByText(/10 \/ 50 lessons/)).toBeInTheDocument();
  });

  it('должен отобразить статистику модулей', () => {
    render(<UserCard {...defaultProps} />);
    expect(screen.getByText(/2 \/ 9 modules/)).toBeInTheDocument();
  });

  it('должен отобразить аватар с заглавной буквой', () => {
    render(<UserCard {...defaultProps} username="john" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('должен корректно работать с нулевыми значениями', () => {
    const zeroProps = {
      ...defaultProps,
      earnedXP: 0,
      completedLessons: 0,
      completedModules: 0,
    };
    render(<UserCard {...zeroProps} />);
    expect(screen.getByText(/0 \/ 500 XP/)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ 50 lessons/)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ 9 modules/)).toBeInTheDocument();
  });
});

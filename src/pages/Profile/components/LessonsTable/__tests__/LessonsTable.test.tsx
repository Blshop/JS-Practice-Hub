import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LessonsTable from '../LessonsTable';
import type { LessonStat } from '../../../hooks/useProfileStats';

describe('LessonsTable', () => {
  const mockLessonStats: LessonStat[] = [
    {
      id: 'js-basics-1',
      title: 'Variables: let, const, var',
      moduleTitle: 'JavaScript Basics',
      xpReward: 10,
      successAttempts: 3,
      failedAttempts: 1,
      totalAttempts: 4,
      successRate: 75,
      questionsCorrect: 8,
      questionsIncorrect: 2,
      totalQuestions: 10,
      questionsSuccessRate: 80,
    },
    {
      id: 'js-basics-2',
      title: 'Data Types and typeof',
      moduleTitle: 'JavaScript Basics',
      xpReward: 10,
      successAttempts: 2,
      failedAttempts: 2,
      totalAttempts: 4,
      successRate: 50,
      questionsCorrect: 5,
      questionsIncorrect: 5,
      totalQuestions: 10,
      questionsSuccessRate: 50,
    },
    {
      id: 'js-adv-1',
      title: 'Hoisting with var',
      moduleTitle: 'Advanced Concepts',
      xpReward: 20,
      successAttempts: 1,
      failedAttempts: 3,
      totalAttempts: 4,
      successRate: 25,
      questionsCorrect: 3,
      questionsIncorrect: 7,
      totalQuestions: 10,
      questionsSuccessRate: 30,
    },
  ];

  it('должен отобразить заголовок', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    expect(screen.getByText('Lessons Statistics')).toBeInTheDocument();
  });

  it('должен отобразить все уроки', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    expect(screen.getByText('Variables: let, const, var')).toBeInTheDocument();
    expect(screen.getByText('Data Types and typeof')).toBeInTheDocument();
    expect(screen.getByText('Hoisting with var')).toBeInTheDocument();
  });

  it('должен отобразить названия модулей', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    expect(screen.getAllByText('JavaScript Basics')).toHaveLength(2);
    expect(screen.getByText('Advanced Concepts')).toBeInTheDocument();
  });

  it('должен отобразить пустое состояние для пустого массива', () => {
    render(<LessonsTable lessonStats={[]} />);
    expect(screen.getByText('No lessons attempted yet')).toBeInTheDocument();
  });

  it('должен фильтровать уроки по названию', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    const searchInput = screen.getByPlaceholderText('Search by lesson...');

    fireEvent.change(searchInput, { target: { value: 'Variables' } });

    expect(screen.getByText('Variables: let, const, var')).toBeInTheDocument();
    expect(screen.queryByText('Data Types and typeof')).not.toBeInTheDocument();
    expect(screen.queryByText('Hoisting with var')).not.toBeInTheDocument();
  });

  it('должен фильтровать уроки по модулю', async () => {
    const user = userEvent.setup();
    render(<LessonsTable lessonStats={mockLessonStats} />);
    const moduleSelect = screen.getByRole('combobox');

    await user.click(moduleSelect);
    const advancedOption = screen.getByRole('option', { name: 'Advanced Concepts' });
    await user.click(advancedOption);

    expect(screen.queryByText('Variables: let, const, var')).not.toBeInTheDocument();
    expect(screen.queryByText('Data Types and typeof')).not.toBeInTheDocument();
    expect(screen.getByText('Hoisting with var')).toBeInTheDocument();
  });

  it('должен показывать сообщение когда нет результатов фильтрации', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    const searchInput = screen.getByPlaceholderText('Search by lesson...');

    fireEvent.change(searchInput, { target: { value: 'NonExistentLesson' } });

    expect(screen.getByText('No lessons match the selected filters')).toBeInTheDocument();
  });

  it('должен отображать фильтры', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    expect(screen.getByPlaceholderText('Search by lesson...')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('должен сбрасывать фильтр при очистке поля поиска', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    const searchInput = screen.getByPlaceholderText('Search by lesson...');

    fireEvent.change(searchInput, { target: { value: 'Variables' } });
    expect(screen.queryByText('Data Types and typeof')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Data Types and typeof')).toBeInTheDocument();
  });

  it('должен применять оба фильтра одновременно', async () => {
    const user = userEvent.setup();
    render(<LessonsTable lessonStats={mockLessonStats} />);
    const searchInput = screen.getByPlaceholderText('Search by lesson...');
    const moduleSelect = screen.getByRole('combobox');

    await user.click(moduleSelect);
    const basicsOption = screen.getByRole('option', { name: 'JavaScript Basics' });
    await user.click(basicsOption);

    fireEvent.change(searchInput, { target: { value: 'Variables' } });

    expect(screen.getByText('Variables: let, const, var')).toBeInTheDocument();
    expect(screen.queryByText('Data Types and typeof')).not.toBeInTheDocument();
    expect(screen.queryByText('Hoisting with var')).not.toBeInTheDocument();
  });

  it('должен быть регистронезависимым при поиске', () => {
    render(<LessonsTable lessonStats={mockLessonStats} />);
    const searchInput = screen.getByPlaceholderText('Search by lesson...');

    fireEvent.change(searchInput, { target: { value: 'VARIABLES' } });

    expect(screen.getByText('Variables: let, const, var')).toBeInTheDocument();
  });
});

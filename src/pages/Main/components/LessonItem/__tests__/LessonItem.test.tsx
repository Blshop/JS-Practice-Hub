import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LessonItem from '../LessonItem';
import type { Lesson } from 'types/LearningPath';
import { STATUS } from 'types/LearningPath';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockLesson: Lesson = {
  id: 'js-basics-1',
  title: 'Variables: let, const, var',
  completedTasks: 2,
  totalTasks: 3,
  xpReward: 10,
  status: STATUS.PROGRESS,
};

describe('LessonItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Рендеринг', () => {
    it('рендерит заголовок урока', () => {
      render(<LessonItem lesson={mockLesson} />);
      expect(screen.getByText('Variables: let, const, var')).toBeInTheDocument();
    });

    it('отображает XP награду', () => {
      render(<LessonItem lesson={mockLesson} />);
      expect(screen.getByText('+10 XP')).toBeInTheDocument();
    });

    it('отображает прогресс выполнения задач', () => {
      render(<LessonItem lesson={mockLesson} />);
      expect(screen.getByText('2/3')).toBeInTheDocument();
    });

    it('применяет правильный вариант для статуса COMPLETED', () => {
      const completedLesson = { ...mockLesson, status: STATUS.COMPLETED };
      const { container } = render(<LessonItem lesson={completedLesson} />);
      const badge = container.querySelector('.success');
      expect(badge).toBeInTheDocument();
    });

    it('применяет правильный вариант для статуса PROGRESS', () => {
      const { container } = render(<LessonItem lesson={mockLesson} />);
      const badge = container.querySelector('.warning');
      expect(badge).toBeInTheDocument();
    });

    it('применяет правильный вариант для статуса WAIT', () => {
      const waitLesson = { ...mockLesson, status: STATUS.WAIT };
      const { container } = render(<LessonItem lesson={waitLesson} />);
      const badge = container.querySelector('.light');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Взаимодействие', () => {
    it('вызывает navigate при клике на кнопку урока', async () => {
      render(<LessonItem lesson={mockLesson} />);
      const button = screen.getByRole('button', { name: '2/3' });

      await userEvent.click(button);

      expect(mockNavigate).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith('/quiz', {
        state: { lessonId: 'js-basics-1', lessonTitle: 'Variables: let, const, var' },
      });
    });
  });
});

import { render, screen } from '@testing-library/react';
import LearningPath from '../LearningPath';
import type { Module } from 'types/LearningPath';
import { STATUS } from 'types/LearningPath';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockModules: Module[] = [
  {
    id: 'basics',
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals',
    status: STATUS.PROGRESS,
    completedTasks: 5,
    totalTasks: 15,
    lessons: [
      {
        id: 'js-basics-1',
        title: 'Variables: let, const, var',
        completedTasks: 3,
        totalTasks: 3,
        xpReward: 10,
        status: STATUS.COMPLETED,
      },
      {
        id: 'js-basics-2',
        title: 'Data Types and typeof',
        completedTasks: 2,
        totalTasks: 3,
        xpReward: 10,
        status: STATUS.PROGRESS,
      },
    ],
  },
];

describe('LearningPath Component', () => {
  describe('Рендеринг', () => {
    it('рендерит заголовок', () => {
      render(<LearningPath modules={mockModules} />);
      expect(screen.getByText('Learning JavaScript')).toBeInTheDocument();
    });

    it('рендерит модули', () => {
      render(<LearningPath modules={mockModules} />);
      expect(screen.getByText('JavaScript Basics')).toBeInTheDocument();
      expect(screen.getByText('Learn the fundamentals')).toBeInTheDocument();
    });

    it('рендерит уроки внутри модулей', () => {
      render(<LearningPath modules={mockModules} />);
      expect(screen.getByText('Variables: let, const, var')).toBeInTheDocument();
      expect(screen.getByText('Data Types and typeof')).toBeInTheDocument();
    });

    it('отображает сообщение при пустом списке модулей', () => {
      render(<LearningPath modules={[]} />);
      expect(screen.getByText('No modules available yet. Check back soon!')).toBeInTheDocument();
    });

    it('не отображает модули при пустом списке', () => {
      render(<LearningPath modules={[]} />);
      expect(screen.queryByText('JavaScript Basics')).not.toBeInTheDocument();
    });
  });

  describe('Множественные модули', () => {
    it('рендерит несколько модулей', () => {
      const multipleModules: Module[] = [
        ...mockModules,
        {
          id: 'control-flow',
          title: 'Control Flow',
          description: 'Conditions and loops',
          status: STATUS.WAIT,
          completedTasks: 0,
          totalTasks: 15,
          lessons: [],
        },
      ];

      render(<LearningPath modules={multipleModules} />);
      expect(screen.getByText('JavaScript Basics')).toBeInTheDocument();
      expect(screen.getByText('Control Flow')).toBeInTheDocument();
    });
  });
});

import { render, screen } from '@testing-library/react';
import ModuleItem from '../ModuleItem';
import type { Module } from 'types/LearningPath';
import { STATUS } from 'types/LearningPath';

const mockModule: Module = {
  id: 'basics',
  title: 'JavaScript Basics',
  description: 'Core syntax and data types',
  status: STATUS.PROGRESS,
  completedTasks: 5,
  totalTasks: 15,
  lessons: [],
};

describe('ModuleItem Component', () => {
  describe('Рендеринг', () => {
    it('рендерит заголовок модуля', () => {
      render(
        <ModuleItem module={mockModule}>
          <div>Children</div>
        </ModuleItem>,
      );
      expect(screen.getByText('JavaScript Basics')).toBeInTheDocument();
    });

    it('рендерит описание модуля', () => {
      render(
        <ModuleItem module={mockModule}>
          <div>Children</div>
        </ModuleItem>,
      );
      expect(screen.getByText('Core syntax and data types')).toBeInTheDocument();
    });

    it('рендерит прогресс-бар с правильными значениями', () => {
      render(
        <ModuleItem module={mockModule}>
          <div>Children</div>
        </ModuleItem>,
      );
      expect(screen.getByText('Progress')).toBeInTheDocument();
      expect(screen.getByText('33%')).toBeInTheDocument();
    });

    it('рендерит дочерние элементы', () => {
      render(
        <ModuleItem module={mockModule}>
          <div>Test Children</div>
        </ModuleItem>,
      );
      expect(screen.getByText('Test Children')).toBeInTheDocument();
    });
  });
});

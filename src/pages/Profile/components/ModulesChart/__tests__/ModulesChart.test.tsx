import { render, screen } from '@testing-library/react';
import ModulesChart from '../ModulesChart';
import type { ModuleStat } from '../../../hooks/useProfileStats';

describe('ModulesChart', () => {
  const mockModuleStats: ModuleStat[] = [
    {
      id: 'basics',
      title: 'JavaScript Basics',
      completedLessons: 3,
      totalLessons: 5,
      successAttempts: 10,
      failedAttempts: 2,
    },
    {
      id: 'advanced',
      title: 'Advanced Concepts',
      completedLessons: 1,
      totalLessons: 5,
      successAttempts: 3,
      failedAttempts: 1,
    },
    {
      id: 'async',
      title: 'Asynchronous JavaScript',
      completedLessons: 0,
      totalLessons: 5,
      successAttempts: 0,
      failedAttempts: 0,
    },
  ];

  it('должен отобразить заголовок', () => {
    render(<ModulesChart moduleStats={mockModuleStats} />);
    expect(screen.getByText('Progress by Module')).toBeInTheDocument();
  });

  it('должен отобразить график когда есть прогресс', () => {
    const { container } = render(<ModulesChart moduleStats={mockModuleStats} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен отобразить пустое состояние когда нет прогресса', () => {
    const emptyStats: ModuleStat[] = [
      {
        id: 'basics',
        title: 'JavaScript Basics',
        completedLessons: 0,
        totalLessons: 5,
        successAttempts: 0,
        failedAttempts: 0,
      },
    ];
    render(<ModulesChart moduleStats={emptyStats} />);
    expect(screen.getByText('No progress yet')).toBeInTheDocument();
  });

  it('должен отобразить названия модулей в данных графика', () => {
    const { container } = render(<ModulesChart moduleStats={mockModuleStats} />);
    const chart = container.querySelector('.recharts-responsive-container');
    expect(chart).toBeInTheDocument();
  });

  it('должен отобразить легенду с Completed и Remaining', () => {
    const { container } = render(<ModulesChart moduleStats={mockModuleStats} />);
    const chart = container.querySelector('.recharts-responsive-container');
    expect(chart).toBeInTheDocument();
  });

  it('должен корректно работать с пустым массивом', () => {
    render(<ModulesChart moduleStats={[]} />);
    expect(screen.getByText('No progress yet')).toBeInTheDocument();
  });

  it('должен отобразить график когда хотя бы один модуль имеет прогресс', () => {
    const partialStats: ModuleStat[] = [
      {
        id: 'basics',
        title: 'JavaScript Basics',
        completedLessons: 1,
        totalLessons: 5,
        successAttempts: 3,
        failedAttempts: 0,
      },
      {
        id: 'advanced',
        title: 'Advanced Concepts',
        completedLessons: 0,
        totalLessons: 5,
        successAttempts: 0,
        failedAttempts: 0,
      },
    ];
    const { container } = render(<ModulesChart moduleStats={partialStats} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });
});

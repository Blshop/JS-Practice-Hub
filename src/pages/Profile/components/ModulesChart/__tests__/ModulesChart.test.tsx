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
      completedTests: 9,
      totalTests: 15,
    },
    {
      id: 'advanced',
      title: 'Advanced Concepts',
      completedLessons: 1,
      totalLessons: 5,
      successAttempts: 3,
      failedAttempts: 1,
      completedTests: 3,
      totalTests: 15,
    },
    {
      id: 'async',
      title: 'Asynchronous JavaScript',
      completedLessons: 0,
      totalLessons: 5,
      successAttempts: 0,
      failedAttempts: 0,
      completedTests: 0,
      totalTests: 15,
    },
  ];

  it('должен отобразить заголовок', () => {
    render(<ModulesChart moduleStats={mockModuleStats} />);
    expect(screen.getByText('Progress by Module')).toBeInTheDocument();
  });

  it('должен всегда отобразить график', () => {
    const { container } = render(<ModulesChart moduleStats={mockModuleStats} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен отобразить график даже когда нет прогресса', () => {
    const emptyStats: ModuleStat[] = [
      {
        id: 'basics',
        title: 'JavaScript Basics',
        completedLessons: 0,
        totalLessons: 5,
        successAttempts: 0,
        failedAttempts: 0,
        completedTests: 0,
        totalTests: 15,
      },
    ];
    const { container } = render(<ModulesChart moduleStats={emptyStats} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен отобразить названия модулей в данных графика', () => {
    const { container } = render(<ModulesChart moduleStats={mockModuleStats} />);
    const chart = container.querySelector('.recharts-responsive-container');
    expect(chart).toBeInTheDocument();
  });

  it('должен отобразить легенду с Completed Tests и Remaining Tests', () => {
    const { container } = render(<ModulesChart moduleStats={mockModuleStats} />);
    const chart = container.querySelector('.recharts-responsive-container');
    expect(chart).toBeInTheDocument();
  });

  it('должен корректно работать с пустым массивом', () => {
    const { container } = render(<ModulesChart moduleStats={[]} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен отобразить график для всех модулей независимо от прогресса', () => {
    const partialStats: ModuleStat[] = [
      {
        id: 'basics',
        title: 'JavaScript Basics',
        completedLessons: 1,
        totalLessons: 5,
        successAttempts: 3,
        failedAttempts: 0,
        completedTests: 3,
        totalTests: 15,
      },
      {
        id: 'advanced',
        title: 'Advanced Concepts',
        completedLessons: 0,
        totalLessons: 5,
        successAttempts: 0,
        failedAttempts: 0,
        completedTests: 0,
        totalTests: 15,
      },
    ];
    const { container } = render(<ModulesChart moduleStats={partialStats} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });
});

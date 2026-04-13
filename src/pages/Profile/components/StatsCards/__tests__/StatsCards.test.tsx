import { render, screen } from '@testing-library/react';
import StatsCards from '../StatsCards';

describe('StatsCards', () => {
  const defaultProps = {
    totalAttempts: 100,
    totalSuccess: 75,
    totalFailed: 25,
    successRate: 75,
  };

  it('должен отобразить все статистические карточки', () => {
    render(<StatsCards {...defaultProps} />);
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('должен отобразить дефолтные лейблы', () => {
    render(<StatsCards {...defaultProps} />);
    expect(screen.getByText('Total Attempts')).toBeInTheDocument();
    expect(screen.getByText('Successful')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
  });

  it('должен отобразить кастомные лейблы', () => {
    const customLabels = {
      total: 'Total Questions',
      success: 'Correct',
      failed: 'Incorrect',
      rate: 'Accuracy',
    };
    render(<StatsCards {...defaultProps} labels={customLabels} />);
    expect(screen.getByText('Total Questions')).toBeInTheDocument();
    expect(screen.getByText('Correct')).toBeInTheDocument();
    expect(screen.getByText('Incorrect')).toBeInTheDocument();
    expect(screen.getByText('Accuracy')).toBeInTheDocument();
  });

  it('должен отобразить частичные кастомные лейблы', () => {
    const partialLabels = {
      success: 'Wins',
      failed: 'Losses',
    };
    render(<StatsCards {...defaultProps} labels={partialLabels} />);
    expect(screen.getByText('Total Attempts')).toBeInTheDocument();
    expect(screen.getByText('Wins')).toBeInTheDocument();
    expect(screen.getByText('Losses')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
  });

  it('должен корректно работать с нулевыми значениями', () => {
    const zeroProps = {
      totalAttempts: 0,
      totalSuccess: 0,
      totalFailed: 0,
      successRate: 0,
    };
    render(<StatsCards {...zeroProps} />);
    expect(screen.getAllByText('0')).toHaveLength(3);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('должен отобразить 100% success rate', () => {
    const perfectProps = {
      totalAttempts: 50,
      totalSuccess: 50,
      totalFailed: 0,
      successRate: 100,
    };
    render(<StatsCards {...perfectProps} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});

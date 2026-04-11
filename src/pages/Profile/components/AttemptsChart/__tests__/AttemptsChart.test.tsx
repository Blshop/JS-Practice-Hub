import { render, screen } from '@testing-library/react';
import AttemptsChart from '../AttemptsChart';

describe('AttemptsChart', () => {
  it('должен отобразить заголовок по умолчанию', () => {
    render(<AttemptsChart totalSuccess={10} totalFailed={5} />);
    expect(screen.getByText('Attempts Distribution')).toBeInTheDocument();
  });

  it('должен отобразить кастомный заголовок', () => {
    render(<AttemptsChart totalSuccess={10} totalFailed={5} title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('должен отобразить пустое состояние когда нет данных', () => {
    render(<AttemptsChart totalSuccess={0} totalFailed={0} />);
    expect(screen.getByText('No data yet')).toBeInTheDocument();
  });

  it('должен отобразить график когда есть данные', () => {
    const { container } = render(<AttemptsChart totalSuccess={10} totalFailed={5} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен использовать дефолтные лейблы', () => {
    const { container } = render(<AttemptsChart totalSuccess={10} totalFailed={5} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен использовать кастомные лейблы', () => {
    const customLabels = {
      success: 'Correct',
      failed: 'Incorrect',
    };
    const { container } = render(
      <AttemptsChart totalSuccess={10} totalFailed={5} labels={customLabels} />,
    );
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен отобразить график только с успешными попытками', () => {
    const { container } = render(<AttemptsChart totalSuccess={10} totalFailed={0} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('должен отобразить график только с неудачными попытками', () => {
    const { container } = render(<AttemptsChart totalSuccess={0} totalFailed={10} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });
});

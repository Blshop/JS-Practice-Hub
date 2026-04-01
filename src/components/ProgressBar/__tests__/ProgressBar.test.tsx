import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

describe('ProgressBar Component', () => {
  describe('Рендеринг', () => {
    it('рендерит с label', () => {
      render(<ProgressBar current={50} total={100} label="Progress" />);
      expect(screen.getByText('Progress')).toBeInTheDocument();
    });

    it('отображает процент', () => {
      render(<ProgressBar current={25} total={100} />);
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('скрывает процент при showPercentage=false', () => {
      render(<ProgressBar current={50} total={100} showPercentage={false} />);
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('применяет variant класс', () => {
      const { container } = render(<ProgressBar current={50} total={100} variant="success" />);
      const progressFill = container.querySelector('.success');
      expect(progressFill).toBeInTheDocument();
    });

    it('применяет positionInfo класс', () => {
      const { container } = render(<ProgressBar current={50} total={100} positionInfo="bottom" />);
      expect(container.querySelector('.bottomInfo')).toBeInTheDocument();
    });
  });

  describe('Вычисление процента', () => {
    it('вычисляет процент корректно', () => {
      render(<ProgressBar current={33} total={100} />);
      expect(screen.getByText('33%')).toBeInTheDocument();
    });

    it('округляет процент', () => {
      render(<ProgressBar current={33.7} total={100} />);
      expect(screen.getByText('34%')).toBeInTheDocument();
    });

    it('обрабатывает total=0', () => {
      render(<ProgressBar current={50} total={0} />);
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('обрабатывает current > total', () => {
      render(<ProgressBar current={150} total={100} />);
      expect(screen.getByText('150%')).toBeInTheDocument();
    });
  });
});

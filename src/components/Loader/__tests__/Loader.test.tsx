import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader Component', () => {
  describe('Рендеринг', () => {
    it('рендерит loader', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('применяет aria-label', () => {
      render(<Loader />);
      const loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('aria-label', 'Loading');
    });

    it('применяет size класс', () => {
      render(<Loader size="large" />);
      const loader = screen.getByRole('status');
      expect(loader).toHaveClass('large');
    });

    it('не рендерит при loading=false', () => {
      render(<Loader loading={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('применяет кастомный className', () => {
      render(<Loader className="custom" />);
      const loader = screen.getByRole('status');
      expect(loader).toHaveClass('custom');
    });
  });
});

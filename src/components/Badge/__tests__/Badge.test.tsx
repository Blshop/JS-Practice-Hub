import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge Component', () => {
  describe('Рендеринг', () => {
    it('рендерит содержимое', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('применяет variant класс', () => {
      render(<Badge variant="danger">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('danger');
    });

    it('применяет size класс', () => {
      render(<Badge size="large">Large</Badge>);
      const badge = screen.getByText('Large');
      expect(badge).toHaveClass('large');
    });

    it('применяет дефолтные значения', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('primary');
      expect(badge).toHaveClass('medium');
    });

    it('применяет кастомный className', () => {
      render(<Badge className="custom">Custom</Badge>);
      const badge = screen.getByText('Custom');
      expect(badge).toHaveClass('custom');
    });
  });
});

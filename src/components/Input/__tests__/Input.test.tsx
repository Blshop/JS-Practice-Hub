import { render, screen } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
  describe('Рендеринг', () => {
    it('рендерит input с label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('использует переданный type', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('применяет размер через elementSize', () => {
      const { container } = render(<Input elementSize="large" />);
      const input = container.querySelector('.large');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Валидация', () => {
    it('отображает сообщение об ошибке', () => {
      render(<Input error="Invalid email" />);
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('применяет aria-invalid при ошибке', () => {
      render(<Input error="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });
});

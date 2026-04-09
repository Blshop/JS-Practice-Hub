import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input Component', () => {
  describe('Рендеринг', () => {
    it('рендерит input с label', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('применяет размер через elementSize', () => {
      render(<Input elementSize="small" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('small');
    });

    it('отображает сообщение об ошибке', () => {
      render(<Input error="Field is required" />);
      expect(screen.getByText('Field is required')).toBeInTheDocument();
    });

    it('применяет класс success', () => {
      render(<Input success data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('success');
    });

    it('применяет тип input', () => {
      render(<Input type="email" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('Состояния', () => {
    it('применяет aria-invalid при error', () => {
      render(<Input error="Invalid" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('отключается при disabled', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Взаимодействие', () => {
    it('вызывает onChange при вводе', async () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('обновляет значение при вводе', async () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;

      await userEvent.type(input, 'hello');
      expect(input.value).toBe('hello');
    });
  });
});

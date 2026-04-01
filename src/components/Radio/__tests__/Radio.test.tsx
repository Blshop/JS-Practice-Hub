import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from '../Radio';

describe('Radio Component', () => {
  describe('Рендеринг', () => {
    it('рендерит radio с label', () => {
      render(<Radio label="Option A" />);
      expect(screen.getByLabelText('Option A')).toBeInTheDocument();
    });

    it('применяет размер через elementSize', () => {
      const { container } = render(<Radio elementSize="large" />);
      const radio = container.querySelector('.large');
      expect(radio).toBeInTheDocument();
    });
  });

  describe('Состояния', () => {
    it('применяет aria-invalid при error', () => {
      render(<Radio error />);
      const radio = screen.getByRole('radio');
      expect(radio).toHaveAttribute('aria-invalid', 'true');
    });

    it('отключается при disabled', () => {
      render(<Radio disabled />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeDisabled();
    });
  });

  describe('Взаимодействие', () => {
    it('можно выбрать', async () => {
      render(<Radio />);
      const radio = screen.getByRole('radio');

      await userEvent.click(radio);
      expect(radio).toBeChecked();
    });

    it('применяет checked при передаче defaultChecked', () => {
      render(<Radio defaultChecked />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });

    it('применяет checked при передаче checked', () => {
      render(<Radio checked onChange={() => {}} />);
      const radio = screen.getByRole('radio');
      expect(radio).toBeChecked();
    });
  });
});

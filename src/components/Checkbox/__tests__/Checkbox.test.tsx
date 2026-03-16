import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
  describe('Рендеринг', () => {
    it('рендерит checkbox с label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    });

    it('применяет размер через elementSize', () => {
      const { container } = render(<Checkbox elementSize="small" />);
      const checkbox = container.querySelector('.small');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Состояния', () => {
    it('применяет aria-invalid при error', () => {
      render(<Checkbox error />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('отключается при disabled', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });
  });

  describe('Взаимодействие', () => {
    it('можно отметить галочкой', async () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});

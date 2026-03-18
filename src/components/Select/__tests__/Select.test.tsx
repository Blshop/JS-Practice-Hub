import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Select Component', () => {
  describe('Рендеринг', () => {
    it('рендерит select с label', () => {
      render(<Select label="Choose option" options={mockOptions} />);
      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('отображает placeholder', () => {
      render(<Select options={mockOptions} placeholder="Select..." />);
      expect(screen.getByText('Select...')).toBeInTheDocument();
    });

    it('применяет размер через elementSize', () => {
      const { container } = render(<Select options={mockOptions} elementSize="small" />);
      const select = container.querySelector('.small');
      expect(select).toBeInTheDocument();
    });
  });

  describe('Взаимодействие', () => {
    it('открывает dropdown при клике', async () => {
      render(<Select options={mockOptions} />);
      const combobox = screen.getByRole('combobox');

      await userEvent.click(combobox);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('выбирает опцию', async () => {
      const handleChange = jest.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      const option = screen.getByText('Option 2');
      await userEvent.click(option);

      expect(handleChange).toHaveBeenCalledWith('2');
    });
  });
});

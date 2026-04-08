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

  describe('Состояния', () => {
    it('отключается при disabled', () => {
      render(<Select options={mockOptions} disabled />);
      const combobox = screen.getByRole('combobox');
      expect(combobox).toHaveAttribute('aria-disabled', 'true');
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

    it('рендерит с пустым списком опций', () => {
      render(<Select options={[]} />);
      const combobox = screen.getByRole('combobox');
      expect(combobox).toBeInTheDocument();
    });

    it('закрывает дропдаун при клике вне', async () => {
      render(
        <div>
          <Select options={mockOptions} />
          <button>Outside</button>
        </div>,
      );

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      const outsideButton = screen.getByText('Outside');
      await userEvent.click(outsideButton);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Клавиатурная навигация', () => {
    it('открывает дропдаун при нажатии Enter', async () => {
      render(<Select options={mockOptions} />);
      const combobox = screen.getByRole('combobox');

      combobox.focus();
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('закрывает дропдаун при нажатии Escape', async () => {
      render(<Select options={mockOptions} />);
      const combobox = screen.getByRole('combobox');

      await userEvent.click(combobox);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('навигация стрелками по опциям', async () => {
      render(<Select options={mockOptions} />);
      const combobox = screen.getByRole('combobox');

      await userEvent.click(combobox);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });
});

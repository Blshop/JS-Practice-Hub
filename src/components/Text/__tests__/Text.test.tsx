import { render, screen } from '@testing-library/react';
import Text from '../Text';

describe('Text Component', () => {
  describe('Рендеринг', () => {
    it('рендерит текст', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('использует переданный тег', () => {
      render(<Text tag="h1">Heading</Text>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Стили', () => {
    it('применяет класс muted', () => {
      const { container } = render(<Text muted>Muted text</Text>);
      const element = container.querySelector('.muted');
      expect(element).toBeInTheDocument();
    });

    it('применяет класс bold', () => {
      const { container } = render(<Text bold>Bold text</Text>);
      const element = container.querySelector('.bold');
      expect(element).toBeInTheDocument();
    });

    it('применяет класс error', () => {
      const { container } = render(<Text error>Error text</Text>);
      const element = container.querySelector('.error');
      expect(element).toBeInTheDocument();
    });
  });
});

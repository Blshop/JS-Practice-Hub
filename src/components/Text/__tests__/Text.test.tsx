import { render, screen } from '@testing-library/react';
import Text from '../Text';

describe('Text Component', () => {
  describe('Рендеринг', () => {
    it('рендерит текст', () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('рендерит с указанным тегом', () => {
      render(<Text tag="h1">Heading</Text>);
      const heading = screen.getByText('Heading');
      expect(heading.tagName).toBe('H1');
    });

    it('применяет класс muted', () => {
      render(<Text muted>Muted text</Text>);
      const text = screen.getByText('Muted text');
      expect(text).toHaveClass('muted');
    });

    it('применяет класс bold', () => {
      render(<Text bold>Bold text</Text>);
      const text = screen.getByText('Bold text');
      expect(text).toHaveClass('bold');
    });

    it('применяет класс error', () => {
      render(<Text error>Error text</Text>);
      const text = screen.getByText('Error text');
      expect(text).toHaveClass('error');
    });

    it('применяет класс success', () => {
      render(<Text success>Success text</Text>);
      const text = screen.getByText('Success text');
      expect(text).toHaveClass('success');
    });

    it('применяет класс uppercase', () => {
      render(<Text uppercase>Uppercase text</Text>);
      const text = screen.getByText('Uppercase text');
      expect(text).toHaveClass('uppercase');
    });

    it('применяет несколько классов одновременно', () => {
      render(
        <Text bold uppercase error>
          Multiple classes
        </Text>,
      );
      const text = screen.getByText('Multiple classes');
      expect(text).toHaveClass('bold');
      expect(text).toHaveClass('uppercase');
      expect(text).toHaveClass('error');
    });
  });
});

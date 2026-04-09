import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  describe('Рендеринг', () => {
    it('рендерит текст RS School', () => {
      render(<Footer />);
      expect(screen.getByText('RS School CodePain 2026')).toBeInTheDocument();
    });

    it('рендерит ссылки на разработчиков', () => {
      render(<Footer />);
      expect(screen.getByText('Blshop')).toBeInTheDocument();
      expect(screen.getByText('DmitryAstapenko')).toBeInTheDocument();
      expect(screen.getByText('GorodeN')).toBeInTheDocument();
    });

    it('ссылки имеют корректные атрибуты', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link');

      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('ссылки ведут на GitHub', () => {
      render(<Footer />);
      const blshopLink = screen.getByText('Blshop').closest('a');
      expect(blshopLink).toHaveAttribute('href', 'https://github.com/Blshop');
    });
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoadingOverlay from '../LoadingOverlay';

describe('LoadingOverlay Component', () => {
  describe('Рендеринг', () => {
    it('отображает loader при isLoading=true', () => {
      render(<LoadingOverlay isLoading={true} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('не отображает loader при isLoading=false', () => {
      render(<LoadingOverlay isLoading={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('отображает ошибку', () => {
      render(<LoadingOverlay isLoading={false} error="Something went wrong" />);
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('не отображает ошибку при isLoading=true', () => {
      render(<LoadingOverlay isLoading={true} error="Error" />);
      expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

    it('отображает кнопку retry при наличии onRetry', () => {
      const handleRetry = jest.fn();
      render(<LoadingOverlay isLoading={false} error="Error" onRetry={handleRetry} />);
      expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    });

    it('не отображает кнопку retry без onRetry', () => {
      render(<LoadingOverlay isLoading={false} error="Error" />);
      expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
    });
  });

  describe('Взаимодействие', () => {
    it('вызывает onRetry при клике на кнопку', async () => {
      const handleRetry = jest.fn();
      render(<LoadingOverlay isLoading={false} error="Error" onRetry={handleRetry} />);

      const button = screen.getByRole('button', { name: /try again/i });
      await userEvent.click(button);

      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('Блокировка скролла', () => {
    it('блокирует скролл при isLoading=true', () => {
      render(<LoadingOverlay isLoading={true} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('восстанавливает скролл при isLoading=false', () => {
      const { rerender } = render(<LoadingOverlay isLoading={true} />);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<LoadingOverlay isLoading={false} />);
      expect(document.body.style.overflow).toBe('');
    });
  });
});

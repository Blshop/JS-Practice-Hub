import { userProgressStore } from 'store/UserProgressStore';
import { authStore } from 'store/AuthStore';
import { api } from 'services/api';
import type { UserProgress } from 'types/UserProgress';

jest.mock('services/api');
jest.mock('store/AuthStore', () => ({
  authStore: {
    user: null,
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

describe('UserProgressStore', () => {
  const mockUserId = 123;
  const mockUserProgress: UserProgress = {
    lessons: {
      'js-basics-1': {
        successAttempt: 1,
        failedAttempt: 0,
        questions: [
          {
            questionId: 'var-let-001',
            successCount: 1,
            failedCount: 0,
          },
        ],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.clear();
    userProgressStore.progress = { lessons: {} };
    userProgressStore.isLoading = false;
    userProgressStore.loadError = null;
    authStore.user = { id: mockUserId, username: 'test', email: 'test@example.com' };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getStorageKey', () => {
    it('должен генерировать ключ с userId', () => {
      // @ts-expect-error - accessing private method for testing
      const key = userProgressStore.getStorageKey();
      expect(key).toBe(`userProgress_${mockUserId}`);
    });
  });

  describe('loadFromStorage', () => {
    it('должен загрузить прогресс из localStorage', () => {
      const storageKey = `userProgress_${mockUserId}`;
      localStorage.setItem(storageKey, JSON.stringify(mockUserProgress));

      // @ts-expect-error - accessing private method for testing
      const result = userProgressStore.loadFromStorage();

      expect(result).toBe(true);
      expect(userProgressStore.progress).toEqual(mockUserProgress);
    });

    it('должен вернуть false если нет данных в localStorage', () => {
      // @ts-expect-error - accessing private method for testing
      const result = userProgressStore.loadFromStorage();

      expect(result).toBe(false);
    });

    it('должен обработать невалидный JSON', () => {
      const storageKey = `userProgress_${mockUserId}`;
      localStorage.setItem(storageKey, 'invalid json');

      // @ts-expect-error - accessing private method for testing
      const result = userProgressStore.loadFromStorage();

      expect(result).toBe(false);
    });
  });

  describe('saveToStorage', () => {
    it('должен сохранить прогресс в localStorage', () => {
      userProgressStore.progress = mockUserProgress;

      // @ts-expect-error - accessing private method for testing
      userProgressStore.saveToStorage();

      const storageKey = `userProgress_${mockUserId}`;
      const stored = localStorage.getItem(storageKey);
      expect(stored).toBe(JSON.stringify(mockUserProgress));
    });
  });

  describe('recordQuestionAnswer', () => {
    it('должен записать правильный ответ на новый вопрос', () => {
      userProgressStore.recordQuestionAnswer('js-basics-1', 'var-let-001', true);

      expect(userProgressStore.progress.lessons['js-basics-1']).toBeDefined();
      expect(userProgressStore.progress.lessons['js-basics-1'].questions).toHaveLength(1);
      expect(userProgressStore.progress.lessons['js-basics-1'].questions[0]).toEqual({
        questionId: 'var-let-001',
        successCount: 1,
        failedCount: 0,
      });
    });

    it('должен записать неправильный ответ на новый вопрос', () => {
      userProgressStore.recordQuestionAnswer('js-basics-1', 'var-let-001', false);

      expect(userProgressStore.progress.lessons['js-basics-1'].questions[0]).toEqual({
        questionId: 'var-let-001',
        successCount: 0,
        failedCount: 1,
      });
    });

    it('должен обновить счетчик для существующего вопроса', () => {
      userProgressStore.progress.lessons['js-basics-1'] = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [
          {
            questionId: 'var-let-001',
            successCount: 1,
            failedCount: 0,
          },
        ],
      };

      userProgressStore.recordQuestionAnswer('js-basics-1', 'var-let-001', true);

      expect(userProgressStore.progress.lessons['js-basics-1'].questions[0].successCount).toBe(2);
    });
  });

  describe('recordLessonAttempt', () => {
    it('должен записать успешную попытку', () => {
      userProgressStore.recordLessonAttempt('js-basics-1', true);

      expect(userProgressStore.progress.lessons['js-basics-1'].successAttempt).toBe(1);
      expect(userProgressStore.progress.lessons['js-basics-1'].failedAttempt).toBe(0);
    });

    it('должен записать неудачную попытку', () => {
      userProgressStore.recordLessonAttempt('js-basics-1', false);

      expect(userProgressStore.progress.lessons['js-basics-1'].successAttempt).toBe(0);
      expect(userProgressStore.progress.lessons['js-basics-1'].failedAttempt).toBe(1);
    });

    it('должен увеличить счетчик для существующего урока', () => {
      userProgressStore.progress.lessons['js-basics-1'] = {
        successAttempt: 1,
        failedAttempt: 0,
        questions: [],
      };

      userProgressStore.recordLessonAttempt('js-basics-1', true);

      expect(userProgressStore.progress.lessons['js-basics-1'].successAttempt).toBe(2);
    });
  });

  describe('loadFromServer', () => {
    it('должен загрузить прогресс с сервера', async () => {
      mockApi.get.mockResolvedValue({ data: mockUserProgress });

      const result = await userProgressStore.loadFromServer();

      expect(result).toBe(true);
      expect(mockApi.get).toHaveBeenCalledWith('/progress');
      expect(userProgressStore.progress).toEqual(mockUserProgress);
      expect(userProgressStore.isLoading).toBe(false);
      expect(userProgressStore.loadError).toBeNull();
    });

    it('должен обработать ошибку загрузки', async () => {
      const error = {
        response: { data: { message: 'Server error' } },
        isAxiosError: true,
      };
      mockApi.get.mockRejectedValue(error);

      const result = await userProgressStore.loadFromServer();

      expect(result).toBe(false);
      expect(userProgressStore.loadError).toBe('Server error');
      expect(userProgressStore.isLoading).toBe(false);
    });

    it('должен вернуть пустой прогресс для нового пользователя', async () => {
      mockApi.get.mockResolvedValue({ data: { lessons: {} } });

      const result = await userProgressStore.loadFromServer();

      expect(result).toBe(true);
      expect(userProgressStore.progress).toEqual({ lessons: {} });
    });
  });

  describe('saveLessonProgressToServer', () => {
    beforeEach(() => {
      userProgressStore.progress = mockUserProgress;
    });

    it('должен сохранить прогресс урока на сервер', async () => {
      mockApi.post.mockResolvedValue({ data: { message: 'Success' } });

      await userProgressStore.saveLessonProgressToServer('js-basics-1');

      expect(mockApi.post).toHaveBeenCalledWith('/progress/lesson', {
        lessonId: 'js-basics-1',
        progress: mockUserProgress.lessons['js-basics-1'],
      });
    });

    it('должен выбросить ошибку если урок не найден', async () => {
      await expect(userProgressStore.saveLessonProgressToServer('non-existent')).rejects.toThrow(
        'No progress found for lesson: non-existent',
      );
    });

    it('должен обработать ошибку сервера', async () => {
      const error = {
        response: { data: { message: 'Server error' } },
        isAxiosError: true,
      };
      mockApi.post.mockRejectedValue(error);

      await expect(userProgressStore.saveLessonProgressToServer('js-basics-1')).rejects.toThrow(
        'Server error',
      );
    });
  });

  describe('getProgressStats', () => {
    it('должен вернуть статистику прогресса', () => {
      userProgressStore.progress = {
        lessons: {
          'js-basics-1': {
            successAttempt: 2,
            failedAttempt: 1,
            questions: [
              { questionId: 'q1', successCount: 1, failedCount: 0 },
              { questionId: 'q2', successCount: 1, failedCount: 1 },
            ],
          },
          'js-basics-2': {
            successAttempt: 1,
            failedAttempt: 0,
            questions: [{ questionId: 'q3', successCount: 1, failedCount: 0 }],
          },
        },
      };

      const stats = userProgressStore.getProgressStats();

      expect(stats).toEqual({
        totalLessons: 2,
        totalSuccessAttempts: 3,
        totalFailedAttempts: 1,
        totalQuestions: 3,
      });
    });

    it('должен вернуть нулевую статистику для пустого прогресса', () => {
      userProgressStore.progress = { lessons: {} };

      const stats = userProgressStore.getProgressStats();

      expect(stats).toEqual({
        totalLessons: 0,
        totalSuccessAttempts: 0,
        totalFailedAttempts: 0,
        totalQuestions: 0,
      });
    });
  });
});

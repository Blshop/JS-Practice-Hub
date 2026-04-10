import { makeAutoObservable } from 'mobx';
import type { UserProgress } from 'types/UserProgress';
import { authStore } from './AuthStore';
import axios from 'axios';
import mockUserServerProgress from 'data/mock-user-server-progress.json';
import { assertUserProgress } from 'utils/validateUserProgress';

class UserProgressStore {
  progress: UserProgress = { lessons: {} };
  isLoading: boolean = true;
  loadError: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.initializeProgress();
  }

  private getStorageKey(): string {
    const userId = authStore.user?.id;
    return userId ? `userProgress_${userId}` : 'userProgress';
  }

  private async initializeProgress(): Promise<void> {
    const hasStoredData = await this.loadFromStorage();
    if (!hasStoredData) {
      await this.loadFromServer();
    }
  }

  private async loadFromStorage(): Promise<boolean> {
    this.isLoading = true;
    this.loadError = null;

    try {
      const stored = localStorage.getItem(this.getStorageKey());
      if (!stored) {
        return false;
      }

      const parsed = JSON.parse(stored);
      assertUserProgress(parsed);

      this.progress = parsed;
      return true;
    } catch (err) {
      const message = 'Failed to load progress from storage';
      console.error(message, err);
      this.loadError = message;
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(this.progress));
    } catch (err) {
      const message = 'Failed to save progress to storage';
      console.error(message, err);
      this.loadError = message;
    }
  }

  private ensureLessonExists(lessonId: string): void {
    if (!this.progress.lessons[lessonId]) {
      this.progress.lessons[lessonId] = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [],
      };
    }
  }

  recordQuestionAnswer(lessonId: string, questionId: string, isCorrect: boolean): void {
    this.ensureLessonExists(lessonId);

    const lesson = this.progress.lessons[lessonId];
    const questionIndex = lesson.questions.findIndex((q) => q.questionId === questionId);

    if (questionIndex === -1) {
      lesson.questions.push({
        questionId,
        successCount: isCorrect ? 1 : 0,
        failedCount: isCorrect ? 0 : 1,
      });
    } else {
      const question = lesson.questions[questionIndex];
      if (isCorrect) {
        question.successCount += 1;
      } else {
        question.failedCount += 1;
      }
    }

    this.saveToStorage();
  }

  recordLessonAttempt(lessonId: string, passed: boolean): void {
    this.ensureLessonExists(lessonId);

    const lesson = this.progress.lessons[lessonId];
    if (passed) {
      lesson.successAttempt += 1;
    } else {
      lesson.failedAttempt += 1;
    }

    this.saveToStorage();
  }

  switchUser(): void {
    this.progress = { lessons: {} };
    this.loadError = null;
    this.initializeProgress();
  }

  async loadFromServer(): Promise<boolean> {
    this.isLoading = true;
    this.loadError = null;

    try {
      // TODO: Replace with real API request when server is ready
      // const response = await axios.get('/api/user/progress');
      // const serverData = response.data;

      // Simulate loading delay and use mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      const serverData = mockUserServerProgress;

      assertUserProgress(serverData);

      this.progress = serverData;
      this.saveToStorage();

      return true;
    } catch (err) {
      const message = 'Failed to load progress from server';
      console.error(message, err);

      if (axios.isAxiosError(err)) {
        this.loadError = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        this.loadError = err.message;
      } else {
        this.loadError = message;
      }

      return false;
    } finally {
      this.isLoading = false;
    }
  }

  getProgressStats() {
    const stats = {
      totalLessons: Object.keys(this.progress.lessons).length,
      totalSuccessAttempts: 0,
      totalFailedAttempts: 0,
      totalQuestions: 0,
    };

    Object.values(this.progress.lessons).forEach((lesson) => {
      stats.totalSuccessAttempts += lesson.successAttempt;
      stats.totalFailedAttempts += lesson.failedAttempt;
      stats.totalQuestions += lesson.questions.length;
    });

    return stats;
  }
}

export const userProgressStore = new UserProgressStore();

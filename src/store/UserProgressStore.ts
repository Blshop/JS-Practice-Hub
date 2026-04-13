import { makeAutoObservable, reaction, runInAction } from 'mobx';
import type { UserProgress } from 'types/UserProgress';
import { authStore } from './AuthStore';
import { getProgress, saveLessonProgress } from 'services/progressService';
import axios from 'axios';
import { assertUserProgress } from 'utils/validateUserProgress';

class UserProgressStore {
  progress: UserProgress = { lessons: {} };
  isLoading: boolean = true;
  loadError: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    reaction(
      () => authStore.user?.id,
      (userId) => {
        if (userId) this.initializeProgress();
      },
      { fireImmediately: true },
    );
  }

  private getStorageKey(): string {
    const userId = authStore.user?.id;
    return `userProgress_${userId}`;
  }

  private async initializeProgress(): Promise<void> {
    this.loadError = null;
    this.isLoading = true;

    const hasStoredData = this.loadFromStorage();
    if (!hasStoredData) {
      await this.loadFromServer();
    } else {
      this.isLoading = false;
    }
  }

  private loadFromStorage(): boolean {
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
      return false;
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(this.progress));
    } catch (err) {
      const message = 'Failed to save progress to storage';
      console.error(message, err);
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

  async loadFromServer(): Promise<boolean> {
    this.isLoading = true;
    this.loadError = null;

    try {
      const serverData = await getProgress();

      assertUserProgress(serverData);

      runInAction(() => {
        this.progress = serverData;
      });

      this.saveToStorage();

      return true;
    } catch (err) {
      const message = 'Failed to load progress from server';
      console.error(message, err);

      runInAction(() => {
        if (axios.isAxiosError(err)) {
          this.loadError = err.response?.data?.message || message;
        } else if (err instanceof Error) {
          this.loadError = err.message;
        } else {
          this.loadError = message;
        }
      });

      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
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

  async saveLessonProgressToServer(lessonId: string): Promise<void> {
    const lessonProgress = this.progress.lessons[lessonId];

    if (!lessonProgress) {
      throw new Error(`No progress found for lesson: ${lessonId}`);
    }

    try {
      await saveLessonProgress(lessonId, lessonProgress);
    } catch (err) {
      const message = 'Failed to save lesson progress to server';
      console.error(message, err);

      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || message);
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error(message);
      }
    }
  }
}

export const userProgressStore = new UserProgressStore();

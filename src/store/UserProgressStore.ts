import { makeAutoObservable } from 'mobx';
import type { UserProgress } from 'types/UserProgress';

class UserProgressStore {
  progress: UserProgress = { lessons: {} };
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('userProgress');
      if (stored) {
        this.progress = JSON.parse(stored);
      }
    } catch (err) {
      console.error('Failed to load progress from storage:', err);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('userProgress', JSON.stringify(this.progress));
    } catch (err) {
      console.error('Failed to save progress to storage:', err);
    }
  }

  recordQuestionAnswer(lessonId: string, questionId: string, isCorrect: boolean): void {
    if (!this.progress.lessons[lessonId]) {
      this.progress.lessons[lessonId] = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [],
      };
    }

    const lesson = this.progress.lessons[lessonId];
    const questionIndex = lesson.questions.findIndex((q) => q.questionId === questionId);

    if (questionIndex === -1) {
      lesson.questions.push({
        questionId,
        successCount: isCorrect ? 1 : 0,
        failedCount: isCorrect ? 0 : 1,
      });
    } else {
      if (isCorrect) {
        lesson.questions[questionIndex].successCount += 1;
      } else {
        lesson.questions[questionIndex].failedCount += 1;
      }
    }

    this.saveToStorage();
  }

  recordLessonAttempt(lessonId: string, passed: boolean): void {
    if (!this.progress.lessons[lessonId]) {
      this.progress.lessons[lessonId] = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [],
      };
    }

    const lesson = this.progress.lessons[lessonId];
    if (passed) {
      lesson.successAttempt += 1;
    } else {
      lesson.failedAttempt += 1;
    }

    this.saveToStorage();
  }

  resetAllProgress(): void {
    this.progress = { lessons: {} };
    this.saveToStorage();
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

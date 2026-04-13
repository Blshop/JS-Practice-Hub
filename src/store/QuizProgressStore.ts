import { makeAutoObservable } from 'mobx';

class QuizProgressStore {
  progress: Record<string, 'correct' | 'incorrect'> = {};

  lessonResults: Record<string, 'passed' | 'failed'> = {};

  constructor() {
    makeAutoObservable(this);
  }

  setQuestionResult(questionId: string, result: 'correct' | 'incorrect') {
    this.progress[questionId] = result;
  }

  resetQuestions() {
    this.progress = {};
  }

  get correctCount() {
    return Object.values(this.progress).filter((v) => v === 'correct').length;
  }

  get incorrectCount() {
    return Object.values(this.progress).filter((v) => v === 'incorrect').length;
  }

  setLessonResult(lessonId: string, passed: boolean) {
    this.lessonResults[lessonId] = passed ? 'passed' : 'failed';
  }

  getLessonResult(lessonId: string) {
    return this.lessonResults[lessonId];
  }
}

export const quizProgressStore = new QuizProgressStore();

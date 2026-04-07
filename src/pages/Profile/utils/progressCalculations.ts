import type { LessonProgress, UserServerProgress } from 'types/UserProgress';

export function getTotalAttempts(lesson: LessonProgress): number {
  return lesson.successAttempt + lesson.failedAttempt;
}

export function getSuccessRate(lesson: LessonProgress): number {
  const total = getTotalAttempts(lesson);
  return total > 0 ? (lesson.successAttempt / total) * 100 : 0;
}

export function getTotalQuestionAnswers(lesson: LessonProgress): {
  correct: number;
  incorrect: number;
  total: number;
  successRate: number;
} {
  let correct = 0;
  let incorrect = 0;

  for (const question of lesson.questions) {
    correct += question.successCount;
    incorrect += question.failedCount;
  }

  const total = correct + incorrect;
  const successRate = total > 0 ? (correct / total) * 100 : 0;

  return { correct, incorrect, total, successRate };
}

export function isLessonCompleted(
  lesson: LessonProgress,
  requiredSuccessAttempts: number,
): boolean {
  return lesson.successAttempt >= requiredSuccessAttempts;
}

export function getLessonProgress(
  progress: UserServerProgress,
  lessonId: string,
): LessonProgress | null {
  return progress.lessons[lessonId] ?? null;
}

export function hasLessonProgress(progress: UserServerProgress, lessonId: string): boolean {
  return lessonId in progress.lessons;
}

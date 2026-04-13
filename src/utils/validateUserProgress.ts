import type { UserProgress, LessonProgress, QuestionStat } from 'types/UserProgress';

function isQuestionStat(value: unknown): value is QuestionStat {
  if (!value || typeof value !== 'object') return false;

  const question = value as Record<string, unknown>;

  return (
    typeof question.questionId === 'string' &&
    typeof question.successCount === 'number' &&
    typeof question.failedCount === 'number'
  );
}

function isLessonProgress(value: unknown): value is LessonProgress {
  if (!value || typeof value !== 'object') return false;

  const lesson = value as Record<string, unknown>;

  if (
    typeof lesson.successAttempt !== 'number' ||
    typeof lesson.failedAttempt !== 'number' ||
    !Array.isArray(lesson.questions)
  ) {
    return false;
  }

  return lesson.questions.every(isQuestionStat);
}

export function validateUserProgress(data: unknown): data is UserProgress {
  if (!data || typeof data !== 'object') return false;

  const progress = data as Record<string, unknown>;

  if (!progress.lessons || typeof progress.lessons !== 'object') return false;

  const lessons = progress.lessons as Record<string, unknown>;

  return Object.values(lessons).every(isLessonProgress);
}

export function assertUserProgress(data: unknown): asserts data is UserProgress {
  if (!validateUserProgress(data)) {
    throw new Error('Invalid user progress data structure');
  }
}

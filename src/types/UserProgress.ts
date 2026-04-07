export interface QuestionStat {
  readonly questionId: string;
  readonly successCount: number;
  readonly failedCount: number;
}

export interface LessonProgress {
  readonly successAttempt: number;
  readonly failedAttempt: number;
  readonly questions: readonly QuestionStat[];
}

export interface UserProgress {
  readonly lessons: Record<string, LessonProgress>;
}

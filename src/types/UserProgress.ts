export interface QuestionStat {
  questionId: string;
  successCount: number;
  failedCount: number;
}

export interface LessonProgress {
  successAttempt: number;
  failedAttempt: number;
  questions: QuestionStat[];
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
}

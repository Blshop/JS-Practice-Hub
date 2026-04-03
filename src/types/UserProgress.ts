export interface QuestionStat {
  question_id: string;
  success_count: number;
  failed_count: number;
}

export interface LessonProgress {
  success_attempt: number;
  failed_attempt: number;
  questions: QuestionStat[];
}

export interface UserServerProgress {
  username: string;
  email: string;
  lessons: Record<string, LessonProgress>;
}

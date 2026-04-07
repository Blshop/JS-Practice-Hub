import type { UserServerProgress } from 'types/UserProgress';

export interface UserServerProgressDTO {
  lessons: Record<
    string,
    {
      success_attempt: number;
      failed_attempt: number;
      questions: Array<{
        question_id: string;
        success_count: number;
        failed_count: number;
      }>;
    }
  >;
}

export function mapUserProgressFromDTO(dto: UserServerProgressDTO): UserServerProgress {
  const lessons: Record<
    string,
    {
      successAttempt: number;
      failedAttempt: number;
      questions: Array<{ questionId: string; successCount: number; failedCount: number }>;
    }
  > = {};

  for (const [lessonId, lessonData] of Object.entries(dto.lessons)) {
    lessons[lessonId] = {
      successAttempt: lessonData.success_attempt,
      failedAttempt: lessonData.failed_attempt,
      questions: lessonData.questions.map((q) => ({
        questionId: q.question_id,
        successCount: q.success_count,
        failedCount: q.failed_count,
      })),
    };
  }

  return { lessons };
}

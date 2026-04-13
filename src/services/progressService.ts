import { api } from 'services/api';
import type { UserProgress, LessonProgress } from 'types/UserProgress';

export interface SaveLessonProgressResponse {
  message: string;
}

export const getProgress = async (): Promise<UserProgress> => {
  const response = await api.get<UserProgress>('/progress');
  return response.data;
};

export const saveLessonProgress = async (
  lessonId: string,
  progress: LessonProgress,
): Promise<SaveLessonProgressResponse> => {
  const response = await api.post<SaveLessonProgressResponse>('/progress/lesson', {
    lessonId,
    progress,
  });
  return response.data;
};

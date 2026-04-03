import axios from 'axios';

export const sendQuizProgress = async ({
  lessonId,
  progress,
  result,
  correct,
  total,
}: {
  lessonId: string;
  progress: Record<string, 'correct' | 'incorrect'>;
  result: 'passed' | 'failed';
  correct: number;
  total: number;
}) => {
  return axios.post('/api/progress/save', {
    lessonId,
    progress,
    result,
    correct,
    total,
  });
};

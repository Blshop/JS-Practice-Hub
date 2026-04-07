import axios from 'axios';

export const sendQuizProgress = async ({
  lessonId,
  progress,
  result,
}: {
  lessonId: string;
  progress: Record<string, 'correct' | 'incorrect'>;
  result: 'passed' | 'failed';
}) => {
  return axios.post('/api/progress/save', {
    lessonId,
    progress,
    result,
  });
};

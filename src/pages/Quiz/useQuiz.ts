import { useState } from 'react';
import { useQuestions } from 'hooks/useQuestions';
import { useMemo } from 'react';
import type {
  Question,
  SingleCorrectQuestion,
  MultipleCorrectQuestion,
  YesNoQuestion,
  PredictOutputQuestion,
} from 'types/Questions';

export type AnswerType = string | string[] | 'yes' | 'no';

interface QuizSummary {
  correct: number;
  total: number;
}

export const useQuiz = (lessonId?: string, onComplete?: (summary: QuizSummary) => void) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerType>>({});

  const [checkState, setCheckState] = useState({
    isChecked: false,
    isCorrect: null as boolean | null,
    showExplanation: false,
  });

  const { isChecked, isCorrect, showExplanation } = checkState;

  const { questions, loading, error } = useQuestions('JavaScript', lessonId ?? null) as {
    questions: Question[];
    loading: boolean;
    error: string | null;
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const isFinished = currentIndex >= totalQuestions;

  const correctCount = useMemo(() => {
    return questions.reduce((acc, q) => {
      const userAns = userAnswers[q.id];
      let correct = false;

      switch (q.type) {
        case 'single-correct':
          correct = userAns === (q as SingleCorrectQuestion).correctId;
          break;

        case 'multiple-correct': {
          const mcq = q as MultipleCorrectQuestion;
          correct =
            Array.isArray(userAns) &&
            userAns.length === mcq.correctIds.length &&
            userAns.every((id) => mcq.correctIds.includes(id));
          break;
        }

        case 'yes-no':
          correct = userAns === (q as YesNoQuestion).answer;
          break;

        case 'predict-output':
          correct =
            typeof userAns === 'string' &&
            userAns.trim() === (q as PredictOutputQuestion).answer.trim();
          break;
      }

      return acc + (correct ? 1 : 0);
    }, 0);
  }, [questions, userAnswers]);

  const handleAnswer = (answer: AnswerType) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
  };

  const handleCheck = () => {
    if (!currentQuestion) return;
    const userAns = userAnswers[currentQuestion.id];

    let correct = false;

    switch (currentQuestion.type) {
      case 'single-correct':
        correct = userAns === (currentQuestion as SingleCorrectQuestion).correctId;
        break;

      case 'multiple-correct': {
        const mcq = currentQuestion as MultipleCorrectQuestion;
        correct =
          Array.isArray(userAns) &&
          userAns.length === mcq.correctIds.length &&
          userAns.every((id) => mcq.correctIds.includes(id));
        break;
      }

      case 'yes-no':
        correct = userAns === (currentQuestion as YesNoQuestion).answer;
        break;

      case 'predict-output':
        correct =
          typeof userAns === 'string' &&
          userAns.trim() === (currentQuestion as PredictOutputQuestion).answer.trim();
        break;
    }

    setCheckState({
      isChecked: true,
      isCorrect: correct,
      showExplanation: true,
    });
  };

  const handleNext = () => {
    setCheckState({
      isChecked: false,
      isCorrect: null,
      showExplanation: false,
    });

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setCurrentIndex(totalQuestions);

    onComplete?.({
      correct: correctCount,
      total: totalQuestions,
    });
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setCheckState({
      isChecked: false,
      isCorrect: null,
      showExplanation: false,
    });
  };

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions,
    loading,
    error,

    userAnswers,
    isChecked,
    isCorrect,
    showExplanation,

    handleAnswer,
    handleCheck,
    handleNext,
    resetQuiz,

    isFinished,
    correctCount,
  };
};

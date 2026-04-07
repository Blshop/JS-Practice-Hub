import { useState, useMemo, useEffect } from 'react';
import { useQuestions } from './useQuestions';
import type {
  AnswerType,
  QuizSummary,
  Question,
  SingleCorrectQuestion,
  MultipleCorrectQuestion,
  YesNoQuestion,
  PredictOutputQuestion,
} from 'types/Questions';
import { quizProgressStore } from 'store/QuizProgressStore';
import { sendQuizProgress } from 'services/progressService';

const normalize = (str: string) => str.replace(/`/g, '').trim();

export const useQuiz = (lessonId?: string, onComplete?: (summary: QuizSummary) => void) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerType>>({});
  const [completedCount, setCompletedCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  useEffect(() => {
    quizProgressStore.resetQuestions();
  }, [lessonId]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const isFinished = currentIndex >= totalQuestions && !isSaving && !saveError;

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
            normalize(userAns) === normalize((q as PredictOutputQuestion).answer);
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
          normalize(userAns) === normalize((currentQuestion as PredictOutputQuestion).answer);
        break;
    }

    quizProgressStore.setQuestionResult(currentQuestion.id, correct ? 'correct' : 'incorrect');

    setCompletedCount((prev) => prev + 1);

    setCheckState({
      isChecked: true,
      isCorrect: correct,
      showExplanation: true,
    });
  };

  const handleNext = async () => {
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

    const mistakes = Object.values(quizProgressStore.progress).filter(
      (v) => v === 'incorrect',
    ).length;

    const passed = mistakes <= 2;
    if (!lessonId) {
      return;
    }

    quizProgressStore.setLessonResult(lessonId, passed);

    quizProgressStore.setLessonResult(lessonId!, passed);

    try {
      setIsSaving(true);
      setSaveError(null);

      await sendQuizProgress({
        lessonId: lessonId!,
        progress: quizProgressStore.progress,
        result: passed ? 'passed' : 'failed',
        correct: correctCount,
        total: totalQuestions,
      });
    } catch (err) {
      console.error(err);
      setSaveError('Не удалось сохранить прогресс. Проверьте интернет и попробуйте снова.');
    } finally {
      setIsSaving(false);
    }

    onComplete?.({
      correct: correctCount,
      total: totalQuestions,
    });
  };

  const retrySave = async () => {
    setSaveError(null);
    await handleNext();
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setCompletedCount(0);
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
    completedCount,
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

    isSaving,
    saveError,
    retrySave,
  };
};

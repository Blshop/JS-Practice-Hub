import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import HighlightedText from 'components/HighlightedText';
import ProgressBar from 'components/ProgressBar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Quiz.module.scss';
import { useQuiz } from './hooks/useQuiz';
import QuestionRenderer from './renderers/QuestionRenderer';
import { routes } from 'config/routes';

const QuizPage: React.FC = () => {
  const { state } = useLocation();
  const lessonId = state?.lessonId ?? null;
  const lessonTitle = state?.lessonTitle ?? null;
  const { t } = useTranslation();

  const {
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
  } = useQuiz(lessonId);

  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const isAnswerEmpty =
    currentAnswer === undefined ||
    (Array.isArray(currentAnswer) && currentAnswer.length === 0) ||
    (typeof currentAnswer === 'string' && currentAnswer.trim() === '');
  const navigate = useNavigate();

  if (totalQuestions === 0) {
    return (
      <div className={styles.quiz}>
        <Text tag="h1" bold className={styles.title}>
          {t('quiz.noQuestions')}
        </Text>

        <Text className={styles.percentage}>{t('quiz.noQuestionsDesc')}</Text>

        <Button variant="primary" size="large" onClick={() => navigate(routes.main.mask)}>
          {t('quiz.goToStart')}
        </Button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className={styles.quiz}>
        <Text tag="h1" bold className={styles.title}>
          {t('quiz.completed')}
        </Text>

        <div className={styles.resultsCard}>
          <div className={styles.header}>
            <Text tag="h2" bold>
              {t('quiz.yourScore')}
            </Text>
          </div>

          <Text className={styles.score}>
            {correctCount} / {totalQuestions}
          </Text>

          <ProgressBar
            current={correctCount}
            total={totalQuestions}
            variant="success"
            label={t('quiz.correctAnswers')}
            positionInfo="top"
          />

          <Text className={styles.percentage}>
            {t('quiz.accuracy', {
              value: totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0,
            })}
          </Text>

          <Button variant="primary" size="large" onClick={resetQuiz}>
            {t('quiz.tryAgain')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      <Text tag="h1" bold className={styles.title}>
        {lessonTitle}
      </Text>

      <ProgressBar
        current={currentIndex + 1}
        total={totalQuestions}
        label={t('quiz.question', { current: currentIndex + 1, total: totalQuestions })}
        variant="info"
        positionInfo="top"
      />

      {loading && <Text>{t('quiz.loading')}</Text>}
      {error && <Text error>{error}</Text>}

      {currentQuestion && (
        <div className={styles.questionContainer}>
          <div className={styles.questionHeader}>
            <Text tag="h2" bold className={styles.questionText}>
              <HighlightedText text={currentQuestion.question} />
            </Text>

            {currentQuestion.code && (
              <pre className={styles.codeBlock}>
                <HighlightedText text={currentQuestion.code} />
              </pre>
            )}
          </div>

          <div className={styles.optionsContainer}>
            <QuestionRenderer
              question={currentQuestion}
              userAnswer={currentAnswer}
              isChecked={isChecked}
              onAnswer={handleAnswer}
            />
          </div>

          {showExplanation && (
            <div
              className={`${styles.explanation} ${isCorrect ? styles.correct : styles.incorrect}`}
            >
              <Text bold>{isCorrect ? t('quiz.correct') : t('quiz.incorrect')}</Text>
              <Text>
                <HighlightedText text={currentQuestion.explanation} />
              </Text>
            </div>
          )}

          <div className={styles.actions}>
            {!isChecked && (
              <Button variant="info" size="large" onClick={handleCheck} disabled={isAnswerEmpty}>
                {t('quiz.checkAnswer')}
              </Button>
            )}

            {isChecked && (
              <>
                <Button variant="primary" size="large" onClick={handleNext}>
                  {currentIndex < totalQuestions - 1
                    ? t('quiz.nextQuestion')
                    : t('quiz.finishQuiz')}
                </Button>

                <Button variant="secondary" size="large" onClick={() => navigate(routes.main.mask)}>
                  {t('quiz.returnToStart')}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import HighlightedText from 'components/HighlightedText';
import ProgressBar from 'components/ProgressBar';
import { useLocation } from 'react-router-dom';

import styles from './Quiz.module.scss';
import { useQuiz } from './useQuiz';
import QuestionRenderer from './renderers/QuestionRenderer';

const QuizPage: React.FC = () => {
  const { state } = useLocation();
  const lessonId = state?.lessonId ?? null;

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
    isFinished,
    correctCount,
  } = useQuiz(lessonId);

  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const isAnswerEmpty =
    currentAnswer === undefined ||
    (Array.isArray(currentAnswer) && currentAnswer.length === 0) ||
    (typeof currentAnswer === 'string' && currentAnswer.trim() === '');

  if (isFinished) {
    return (
      <div className={styles.quiz}>
        <Text tag="h1" bold className={styles.title}>
          Quiz Completed!
        </Text>

        <div className={styles.results}>
          <Text tag="h2" bold>
            Your Score
          </Text>

          <Text className={styles.score}>
            {correctCount} / {totalQuestions}
          </Text>

          <ProgressBar
            current={correctCount}
            total={totalQuestions}
            variant="success"
            label="Correct Answers"
            positionInfo="top"
          />

          <Text className={styles.percentage}>
            Accuracy: {Math.round((correctCount / totalQuestions) * 100)}%
          </Text>

          <Button variant="primary" size="large" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      <Text tag="h1" bold className={styles.title}>
        JavaScript Quiz
      </Text>

      <ProgressBar
        current={currentIndex + 1}
        total={totalQuestions}
        label={`Question ${currentIndex + 1} of ${totalQuestions}`}
        variant="info"
        positionInfo="top"
      />

      {loading && <Text>Loading questions...</Text>}
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

          <div className={styles.actions}>
            {!isChecked && (
              <Button variant="info" size="large" onClick={handleCheck} disabled={isAnswerEmpty}>
                Check Answer
              </Button>
            )}

            {showExplanation && (
              <div
                className={`${styles.explanation} ${isCorrect ? styles.correct : styles.incorrect}`}
              >
                <Text bold>{isCorrect ? 'Correct!' : 'Incorrect'}</Text>
                <Text>
                  <HighlightedText text={currentQuestion.explanation} />
                </Text>
              </div>
            )}

            {isChecked && (
              <Button variant="primary" size="large" onClick={handleNext}>
                {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

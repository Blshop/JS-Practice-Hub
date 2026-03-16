import React, { useState, useEffect } from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import HighlightedCheckbox from './HighlightedCheckbox';
import HighlightedRadio from './HighlightedRadio';
import Input from 'components/Input';
import { useQuestions } from 'hooks/useQuestions';
import styles from 'pages/Quiz/Quiz.module.scss';
import classNames from 'classnames';
import HighlightedText from 'components/HighlightedText';
import type {
  Question,
  SingleCorrectQuestion,
  MultipleCorrectQuestion,
  YesNoQuestion,
  PredictOutputQuestion,
} from 'types/Questions';

// type AnswerType = string | string[] | 'yes' | 'no';

const QuizPage: React.FC = () => {
  const [category, setCategory] = useState<'JavaScript' | 'typescript' | 'css' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, AnswerType>>({});
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { questions, loading, error } = useQuestions(category) as {
    questions: Question[];
    loading: boolean;
    error: string | null;
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    const resetState = () => {
      setIsChecked(false);
      setIsCorrect(null);
      setShowExplanation(false);
    };

    resetState();
  }, [currentIndex]);

  type AnswerType = string | string[] | 'yes' | 'no';

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
          userAns.every((id: string) => mcq.correctIds.includes(id));
        break;
      }
      case 'yes-no':
        correct = userAns === (currentQuestion as YesNoQuestion).correct;
        break;
      case 'predict-output':
        correct =
          typeof userAns === 'string' &&
          userAns.trim() === (currentQuestion as PredictOutputQuestion).answer.trim();
        break;
      default:
        correct = false;
    }

    setIsCorrect(correct);
    setIsChecked(true);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex((prev) => prev + 1);
    else alert('Quiz completed!');
  };

  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const renderOptions = () => {
    if (!currentQuestion) return null;
    const userAns = userAnswers[currentQuestion.id];

    switch (currentQuestion.type) {
      case 'single-correct': {
        const scq = currentQuestion as SingleCorrectQuestion;
        const userAnsId = userAns;

        return (
          <div className={styles.options}>
            {scq.options.map((opt) => {
              const isSelected = userAnsId === opt.id;
              const isCorrectOption = scq.correctId === opt.id;

              return (
                <div
                  key={opt.id}
                  className={classNames({
                    [styles.checkedCorrect]: isChecked && isCorrectOption,
                    [styles.checkedIncorrect]: isChecked && isSelected && !isCorrectOption,
                  })}
                >
                  <HighlightedRadio
                    label={<HighlightedText text={opt.text} />}
                    name={scq.id}
                    elementSize="medium"
                    checked={isSelected}
                    onChange={() => handleAnswer(opt.id)}
                    disabled={isChecked}
                  />
                </div>
              );
            })}
          </div>
        );
      }

      case 'multiple-correct': {
        const mcq = currentQuestion as MultipleCorrectQuestion;
        const selected: string[] = Array.isArray(userAns) ? userAns : [];

        return (
          <div className={styles.options}>
            {mcq.options.map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isCorrectOption = mcq.correctIds.includes(opt.id);
              const showError =
                isChecked && ((isSelected && !isCorrectOption) || (!isSelected && isCorrectOption));

              return (
                <div
                  key={opt.id}
                  className={classNames({
                    [styles.checkedCorrect]: isChecked && isSelected && isCorrectOption,
                    [styles.checkedIncorrect]: isChecked && showError,
                  })}
                >
                  <HighlightedCheckbox
                    label={<HighlightedText text={opt.text} />}
                    elementSize="medium"
                    checked={isSelected}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked;
                      const next = checked
                        ? [...selected, opt.id]
                        : selected.filter((id) => id !== opt.id);
                      handleAnswer(next);
                    }}
                    disabled={isChecked}
                  />
                </div>
              );
            })}
          </div>
        );
      }

      case 'yes-no': {
        const ynq = currentQuestion as YesNoQuestion;

        const getVariant = (value: 'yes' | 'no') => {
          if (!isChecked) {
            return userAns === value ? 'info' : 'light';
          }
          if (ynq.correct === value) return 'success';
          if (userAns === value && ynq.correct !== value) return 'danger';
          return 'light';
        };

        return (
          <div className={styles.yesNo}>
            <Button
              variant={getVariant('yes')}
              onClick={() => handleAnswer('yes')}
              disabled={isChecked}
            >
              Yes
            </Button>
            <Button
              variant={getVariant('no')}
              onClick={() => handleAnswer('no')}
              disabled={isChecked}
            >
              No
            </Button>
          </div>
        );
      }

      case 'predict-output': {
        if (currentQuestion.type !== 'predict-output') {
          return <div>Invalid question type</div>;
        }

        const poq = currentQuestion;
        const userValue = typeof userAns === 'string' ? userAns : '';
        const trimmedUser = userValue.trim();
        const trimmedAnswer = poq.answer.trim();
        const isUserCorrect = trimmedUser === trimmedAnswer;

        return (
          <div className={styles.predict}>
            <Input
              type="text"
              label="Your answer"
              value={userValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswer(e.target.value)}
              disabled={isChecked}
              error={isChecked && !isUserCorrect ? 'Incorrect answer' : undefined}
              success={isChecked && isUserCorrect}
              elementSize="medium"
            />

            {isChecked && (
              <div
                className={classNames(
                  styles.explanation,
                  isUserCorrect ? styles.correct : styles.incorrect,
                )}
              >
                {!isUserCorrect && poq.answer && (
                  <Text tag="p" className={styles.correctAnswer}>
                    Expected output: <code>{poq.answer}</code>
                  </Text>
                )}
              </div>
            )}
          </div>
        );
      }
      default:
        return <div>Unsupported question type</div>;
    }
  };

  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const isAnswerEmpty =
    currentAnswer === undefined ||
    (Array.isArray(currentAnswer) && currentAnswer.length === 0) ||
    (typeof currentAnswer === 'string' && currentAnswer.trim() === '');

  return (
    <div className={styles.quiz}>
      <Text tag="h1" bold className={styles.title}>
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz` : 'Quiz'}
      </Text>

      <div className={styles.progress}>
        <div className={styles.progressInfo}>
          <span>
            Question {currentIndex + 1} of {totalQuestions || '?'}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {!category && !loading && !error && (
        <div className={styles.categorySelector}>
          <Text tag="h2" bold className={styles.sectionTitle}>
            Choose a category
          </Text>
          <div className={styles.categoryButtons}>
            {(['JavaScript', 'typescript', 'css'] as const).map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? 'primary' : 'secondary'}
                size="large"
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <Text tag="p" className={styles.loadingText}>
          Loading questions...
        </Text>
      )}
      {error && (
        <Text tag="p" error className={styles.errorText}>
          {error}
        </Text>
      )}

      {questions.length > 0 && currentQuestion && (
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

          <div className={styles.optionsContainer}>{renderOptions()}</div>

          <div className={styles.actions}>
            {!isChecked && (
              <div className={styles.checkButton}>
                <Button variant="info" size="large" onClick={handleCheck} disabled={isAnswerEmpty}>
                  Check Answer
                </Button>
              </div>
            )}

            {showExplanation && (
              <div
                className={`${styles.explanation} ${isCorrect ? styles.correct : styles.incorrect}`}
              >
                <Text tag="p" bold className={styles.feedbackTitle}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </Text>
                <Text tag="p" className={styles.explanationText}>
                  <HighlightedText text={currentQuestion.explanation} />
                </Text>
              </div>
            )}

            {isChecked && (
              <div className={styles.nextButton}>
                <Button variant="primary" size="large" onClick={handleNext}>
                  {currentIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

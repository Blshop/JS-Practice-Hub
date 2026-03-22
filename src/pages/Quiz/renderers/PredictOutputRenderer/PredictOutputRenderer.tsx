import React from 'react';
import classNames from 'classnames';
import Input from 'components/Input';
import Text from 'components/Text';
import styles from './PredictOutputRenderer.module.scss';

import type { PredictOutputQuestion } from 'types/Questions';
import type { AnswerType } from 'pages/Quiz/useQuiz';

interface Props {
  question: PredictOutputQuestion;
  userAnswer?: AnswerType;
  isChecked: boolean;
  onAnswer: (value: string) => void;
}

const PredictOutputRenderer: React.FC<Props> = ({ question, userAnswer, isChecked, onAnswer }) => {
  const userValue = typeof userAnswer === 'string' ? userAnswer : '';
  const trimmedUser = userValue.trim();
  const trimmedAnswer = question.answer.trim();
  const isUserCorrect = trimmedUser === trimmedAnswer;

  return (
    <div className={styles.predict}>
      <Input
        type="text"
        label="Your answer"
        value={userValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAnswer(e.target.value)}
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
          {!isUserCorrect && question.answer && (
            <Text tag="p" className={styles.correctAnswer}>
              Expected output: <code>{question.answer}</code>
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictOutputRenderer;

import React from 'react';
import classNames from 'classnames';
import Radio from 'components/Radio';
import HighlightedText from 'components/HighlightedText';
import styles from './SingleCorrectRenderer.module.scss';

import type { SingleCorrectQuestion } from 'types/Questions';
import type { AnswerType } from 'pages/Quiz/useQuiz';

interface Props {
  question: SingleCorrectQuestion;
  userAnswer?: AnswerType;
  isChecked: boolean;
  onAnswer: (value: string) => void;
}

const SingleCorrectRenderer: React.FC<Props> = ({ question, userAnswer, isChecked, onAnswer }) => {
  return (
    <div className={styles.options}>
      {question.options.map((opt) => {
        const isSelected = userAnswer === opt.id;
        const isCorrectOption = question.correctId === opt.id;

        return (
          <div
            key={opt.id}
            className={classNames(styles.option, {
              [styles.selected]: isSelected && !isChecked,
              [styles.correct]: isChecked && isCorrectOption,
              [styles.incorrect]: isChecked && isSelected && !isCorrectOption,
            })}
          >
            <Radio
              label={<HighlightedText text={opt.text} />}
              name={question.id}
              elementSize="medium"
              checked={isSelected}
              onChange={() => onAnswer(opt.id)}
              disabled={isChecked}
              success={isChecked && isCorrectOption}
              error={isChecked && isSelected && !isCorrectOption}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SingleCorrectRenderer;

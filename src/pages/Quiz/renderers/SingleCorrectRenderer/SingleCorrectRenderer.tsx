import React from 'react';
import classNames from 'classnames';
import Radio from 'components/Radio';
import HighlightedText from 'components/HighlightedText';
import { useTranslation } from 'react-i18next';
import { localize } from 'utils/localize';
import styles from './SingleCorrectRenderer.module.scss';

import type { SingleCorrectQuestion, AnswerType } from 'types/Questions';

interface Props {
  question: SingleCorrectQuestion;
  userAnswer?: AnswerType;
  isChecked: boolean;
  onAnswer: (value: string) => void;
}

const SingleCorrectRenderer: React.FC<Props> = ({ question, userAnswer, isChecked, onAnswer }) => {
  const { i18n } = useTranslation();
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
              label={<HighlightedText text={localize(opt.text, i18n.language)} />}
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

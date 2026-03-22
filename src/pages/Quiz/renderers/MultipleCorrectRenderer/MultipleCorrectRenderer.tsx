import React from 'react';
import classNames from 'classnames';
import HighlightedCheckbox from '../../HighlightedCheckbox';
import HighlightedText from 'components/HighlightedText';
import styles from './MultipleCorrectRenderer.module.scss';

import type { MultipleCorrectQuestion } from 'types/Questions';
import type { AnswerType } from 'pages/Quiz/useQuiz';

interface Props {
  question: MultipleCorrectQuestion;
  userAnswer?: AnswerType;
  isChecked: boolean;
  onAnswer: (value: string[]) => void;
}

const MultipleCorrectRenderer: React.FC<Props> = ({
  question,
  userAnswer,
  isChecked,
  onAnswer,
}) => {
  const selected = Array.isArray(userAnswer) ? userAnswer : [];

  return (
    <div className={styles.options}>
      {question.options.map((opt) => {
        const isSelected = selected.includes(opt.id);
        const isCorrectOption = question.correctIds.includes(opt.id);

        const showError =
          isChecked && ((isSelected && !isCorrectOption) || (!isSelected && isCorrectOption));

        return (
          <div
            key={opt.id}
            className={classNames(styles.option, {
              [styles.selected]: isSelected && !isChecked,
              [styles.correct]: isChecked && isSelected && isCorrectOption,
              [styles.incorrect]: isChecked && showError,
            })}
          >
            <HighlightedCheckbox
              label={<HighlightedText text={opt.text} />}
              elementSize="medium"
              checked={isSelected}
              onChange={(e) => {
                const checked = e.target.checked;
                const next = checked
                  ? [...selected, opt.id]
                  : selected.filter((id) => id !== opt.id);
                onAnswer(next);
              }}
              disabled={isChecked}
              success={isChecked && isSelected && isCorrectOption}
              error={isChecked && showError}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MultipleCorrectRenderer;

import React from 'react';
import classNames from 'classnames';
import Checkbox from 'components/Checkbox';
import HighlightedText from 'components/HighlightedText';
import { useTranslation } from 'react-i18next';
import { localize } from 'utils/localize';
import styles from './MultipleCorrectRenderer.module.scss';

import type { MultipleCorrectQuestion, AnswerType } from 'types/Questions';

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
  const { i18n } = useTranslation();
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
            <Checkbox
              label={<HighlightedText text={localize(opt.text, i18n.language)} />}
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

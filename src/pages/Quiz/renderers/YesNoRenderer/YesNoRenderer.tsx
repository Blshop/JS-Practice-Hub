import React from 'react';
import Button from 'components/Button';
import HighlightedText from 'components/HighlightedText';
import styles from './YesNoRenderer.module.scss';

import type { YesNoQuestion, AnswerType } from 'types/Questions';

interface Props {
  question: YesNoQuestion;
  userAnswer?: AnswerType;
  isChecked: boolean;
  onAnswer: (value: 'yes' | 'no') => void;
}

const YesNoRenderer: React.FC<Props> = ({ question, userAnswer, isChecked, onAnswer }) => {
  const getVariant = (value: 'yes' | 'no') => {
    if (!isChecked) {
      return userAnswer === value ? 'info' : 'light';
    }
    if (question.answer === value) return 'success';
    if (userAnswer === value && question.answer !== value) return 'danger';
    return 'light';
  };

  return (
    <div className={styles.yesNo}>
      <Button variant={getVariant('yes')} onClick={() => onAnswer('yes')} disabled={isChecked}>
        <HighlightedText text="Yes" />
      </Button>

      <Button variant={getVariant('no')} onClick={() => onAnswer('no')} disabled={isChecked}>
        <HighlightedText text="No" />
      </Button>
    </div>
  );
};

export default YesNoRenderer;

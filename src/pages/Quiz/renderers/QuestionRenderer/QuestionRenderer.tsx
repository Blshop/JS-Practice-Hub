import React from 'react';
import type { Question, AnswerType } from 'types/Questions';

import SingleCorrectRenderer from '../SingleCorrectRenderer';
import MultipleCorrectRenderer from '../MultipleCorrectRenderer';
import YesNoRenderer from '../YesNoRenderer';
import PredictOutputRenderer from '../PredictOutputRenderer';

interface Props {
  question: Question;
  userAnswer?: AnswerType;
  isChecked: boolean;
  onAnswer: (a: AnswerType) => void;
}

const QuestionRenderer: React.FC<Props> = ({ question, userAnswer, isChecked, onAnswer }) => {
  switch (question.type) {
    case 'single-correct':
      return (
        <SingleCorrectRenderer
          question={question}
          userAnswer={userAnswer}
          isChecked={isChecked}
          onAnswer={onAnswer}
        />
      );

    case 'multiple-correct':
      return (
        <MultipleCorrectRenderer
          question={question}
          userAnswer={userAnswer}
          isChecked={isChecked}
          onAnswer={onAnswer}
        />
      );

    case 'yes-no':
      return (
        <YesNoRenderer
          question={question}
          userAnswer={userAnswer}
          isChecked={isChecked}
          onAnswer={onAnswer}
        />
      );

    case 'predict-output':
      return (
        <PredictOutputRenderer
          question={question}
          userAnswer={userAnswer}
          isChecked={isChecked}
          onAnswer={onAnswer}
        />
      );

    default:
      return <Text tag='div' error>Unsupported question type</Text>;
  }
};

export default QuestionRenderer;

export type QuestionType = 'single-correct' | 'multiple-correct' | 'yes-no' | 'predict-output';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  theme: string;
  question: string;
  code?: string;
  explanation: string;
}

export interface SingleCorrectQuestion extends BaseQuestion {
  type: 'single-correct';
  options: { id: string; text: string }[];
  correctId: string;
}

export interface MultipleCorrectQuestion extends BaseQuestion {
  type: 'multiple-correct';
  options: { id: string; text: string }[];
  correctIds: string[];
}

export interface YesNoQuestion extends BaseQuestion {
  type: 'yes-no';
  answer: 'yes' | 'no';
}

export interface PredictOutputQuestion extends BaseQuestion {
  type: 'predict-output';
  answer: string;
}

export type Question =
  | SingleCorrectQuestion
  | MultipleCorrectQuestion
  | YesNoQuestion
  | PredictOutputQuestion;

export type AnswerType = string | string[] | 'yes' | 'no';

export interface QuizSummary {
  correct: number;
  total: number;
}

export type QuestionType = 'single-correct' | 'multiple-correct' | 'yes-no' | 'predict-output';

export type LocalizedString = {
  en: string;
  ru?: string;
};

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  theme: string;
  question: LocalizedString;
  code?: string;
  explanation: LocalizedString;
}

export interface SingleCorrectQuestion extends BaseQuestion {
  type: 'single-correct';
  options: { id: string; text: LocalizedString }[];
  correctId: string;
}

export interface MultipleCorrectQuestion extends BaseQuestion {
  type: 'multiple-correct';
  options: { id: string; text: LocalizedString }[];
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

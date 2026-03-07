export type QuestionType =
  | 'single-correct'
  | 'multiple-correct'
  | 'yes-no'
  | 'predict-output'
  | 'drag-and-drop';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  theme: string;
  question: string;
  code?: string;
  explanation: string;
}

// Single correct
export interface SingleCorrectQuestion extends BaseQuestion {
  type: 'single-correct';
  options: { id: string; text: string }[];
  correctId: string;
}

// Multiple correct
export interface MultipleCorrectQuestion extends BaseQuestion {
  type: 'multiple-correct';
  options: { id: string; text: string }[];
  correctIds: string[];
}

// Yes / No
export interface YesNoQuestion extends BaseQuestion {
  type: 'yes-no';
  correct: 'yes' | 'no';
}

// Predict output
export interface PredictOutputQuestion extends BaseQuestion {
  type: 'predict-output';
  answer: string;
}

// Drag and Drop
export interface DragAndDropQuestion extends BaseQuestion {
  type: 'drag-and-drop';
  items: { id: string; text: string }[];
  correctOrder?: string[];
  correctGroups?: Record<string, string[]>;
}

export type Question =
  | SingleCorrectQuestion
  | MultipleCorrectQuestion
  | YesNoQuestion
  | PredictOutputQuestion
  | DragAndDropQuestion;

// import type { Question } from './Questions'; // Не используется пока

export type LessonStatus = 'locked' | 'available' | 'completed' | 'current';
export type ModuleStatus = 'locked' | 'available' | 'completed';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  questionIds: string[]; // ссылки на вопросы из data
  status: LessonStatus;
  xpReward: number;
  requiredXp?: number;
  moduleId: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  status: ModuleStatus;
  icon: string;
  color: string;
  order: number;
}

export interface UserProgress {
  currentModule: string;
  currentLesson: string;
  totalXp: number;
  completedLessons: string[];
  streak: number;
  lastStudyDate?: string;
}

export interface LearningPath {
  modules: Module[];
  userProgress: UserProgress;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpRequired: number;
  unlocked: boolean;
}

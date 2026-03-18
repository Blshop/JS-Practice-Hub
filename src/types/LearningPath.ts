export const STATUS = {
  WAIT: 'wait',
  PROGRESS: 'progress',
  COMPLETED: 'completed',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  lessons: LessonData[];
}

export interface LessonData {
  id: string;
  title: string;
  xpReward: number;
  totalTasks: number;
}

export interface Lesson extends LessonData {
  status: Status;
  completedTasks: number;
}

export interface Module extends ModuleData {
  lessons: Lesson[];
  status: Status;
  completedTasks: number;
  totalTasks: number;
}

export interface UserProgress {
  userId: string;
  lessons: Record<string, number>;
}

export interface LearningPath {
  modules: Module[];
}

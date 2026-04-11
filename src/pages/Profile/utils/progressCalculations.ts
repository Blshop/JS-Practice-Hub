import type { LessonProgress, UserProgress } from 'types/UserProgress';
import type { ModuleData, Status } from 'types/LearningPath';
import { STATUS } from 'types/LearningPath';

export function getTotalAttempts(lesson: LessonProgress): number {
  return lesson.successAttempt + lesson.failedAttempt;
}

export function getSuccessRate(lesson: LessonProgress): number {
  const total = getTotalAttempts(lesson);
  return total > 0 ? (lesson.successAttempt / total) * 100 : 0;
}

export function getTotalQuestionAnswers(lesson: LessonProgress): {
  correct: number;
  incorrect: number;
  total: number;
  successRate: number;
} {
  let correct = 0;
  let incorrect = 0;

  for (const question of lesson.questions) {
    correct += question.successCount;
    incorrect += question.failedCount;
  }

  const total = correct + incorrect;
  const successRate = total > 0 ? (correct / total) * 100 : 0;

  return { correct, incorrect, total, successRate };
}

export function isLessonCompleted(
  lesson: LessonProgress,
  requiredSuccessAttempts: number,
): boolean {
  return lesson.successAttempt >= requiredSuccessAttempts;
}

export function calculateLessonCompletedTasks(
  lessonProgress: LessonProgress | undefined,
  totalTasks: number,
): number {
  if (!lessonProgress) return 0;
  return Math.min(lessonProgress.successAttempt, totalTasks);
}

export function calculateLessonStatus(completedTasks: number, totalTasks: number): Status {
  if (completedTasks === totalTasks) {
    return STATUS.COMPLETED;
  } else if (completedTasks > 0) {
    return STATUS.PROGRESS;
  } else {
    return STATUS.WAIT;
  }
}

export function calculateModuleStatus(completedTasks: number, totalTasks: number): Status {
  if (completedTasks === totalTasks) {
    return STATUS.COMPLETED;
  } else if (completedTasks > 0) {
    return STATUS.PROGRESS;
  } else {
    return STATUS.WAIT;
  }
}

export function calculateTotalXP(modules: ModuleData[]): number {
  return modules.reduce(
    (sum, module) =>
      sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.xpReward, 0),
    0,
  );
}

export function calculateTotalEarnedXP(userProgress: UserProgress, modules: ModuleData[]): number {
  return modules.reduce(
    (xp, module) =>
      xp +
      module.lessons.reduce((lessonXp, lesson) => {
        const lessonProgress = userProgress.lessons[lesson.id];
        if (!lessonProgress) return lessonXp;
        const completedTasks = calculateLessonCompletedTasks(lessonProgress, lesson.totalTasks);
        return lessonXp + (completedTasks >= lesson.totalTasks ? lesson.xpReward : 0);
      }, 0),
    0,
  );
}

// Расчет общего количества тестов в модуле
export function calculateModuleTotalTests(module: ModuleData): number {
  return module.lessons.reduce((sum, lesson) => sum + lesson.totalTasks, 0);
}

// Расчет завершенных тестов в модуле
export function calculateModuleCompletedTests(
  userProgress: UserProgress,
  module: ModuleData,
): number {
  return module.lessons.reduce((sum, lesson) => {
    const lessonProgress = userProgress.lessons[lesson.id];
    return sum + calculateLessonCompletedTasks(lessonProgress, lesson.totalTasks);
  }, 0);
}

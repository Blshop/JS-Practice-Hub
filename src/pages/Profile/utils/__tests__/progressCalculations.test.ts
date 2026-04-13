import {
  getTotalAttempts,
  getSuccessRate,
  getTotalQuestionAnswers,
  isLessonCompleted,
  calculateLessonCompletedTasks,
  calculateLessonStatus,
  calculateModuleStatus,
  calculateTotalXP,
  calculateTotalEarnedXP,
  calculateModuleTotalTests,
  calculateModuleCompletedTests,
} from '../progressCalculations';
import { STATUS } from 'types/LearningPath';
import type { LessonProgress, UserProgress } from 'types/UserProgress';
import type { ModuleData, LessonData } from 'types/LearningPath';
import type { LocalizedString } from 'types/Questions';

const createLocalizedString = (text: string): LocalizedString => ({ en: text, ru: text });

const createModule = (
  id: string,
  title: string,
  description: string,
  lessons: Array<{ id: string; title: string; xpReward: number; totalTasks: number }>,
): ModuleData => ({
  id,
  title: createLocalizedString(title),
  description: createLocalizedString(description),
  lessons: lessons.map((l) => createLesson(l.id, l.title, l.xpReward, l.totalTasks)),
});

const createLesson = (
  id: string,
  title: string,
  xpReward: number,
  totalTasks: number,
): LessonData => ({
  id,
  title: createLocalizedString(title),
  xpReward,
  totalTasks,
});

describe('progressCalculations', () => {
  describe('getTotalAttempts', () => {
    it('возвращает сумму успешных и неудачных попыток', () => {
      const lesson: LessonProgress = {
        successAttempt: 5,
        failedAttempt: 3,
        questions: [],
      };
      expect(getTotalAttempts(lesson)).toBe(8);
    });

    it('возвращает 0 если нет попыток', () => {
      const lesson: LessonProgress = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [],
      };
      expect(getTotalAttempts(lesson)).toBe(0);
    });
  });

  describe('getSuccessRate', () => {
    it('вычисляет процент успешных попыток', () => {
      const lesson: LessonProgress = {
        successAttempt: 7,
        failedAttempt: 3,
        questions: [],
      };
      expect(getSuccessRate(lesson)).toBe(70);
    });

    it('возвращает 0 если нет попыток', () => {
      const lesson: LessonProgress = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [],
      };
      expect(getSuccessRate(lesson)).toBe(0);
    });

    it('возвращает 100 если все попытки успешные', () => {
      const lesson: LessonProgress = {
        successAttempt: 10,
        failedAttempt: 0,
        questions: [],
      };
      expect(getSuccessRate(lesson)).toBe(100);
    });
  });

  describe('getTotalQuestionAnswers', () => {
    it('подсчитывает правильные и неправильные ответы', () => {
      const lesson: LessonProgress = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [
          { questionId: 'q1', successCount: 5, failedCount: 2 },
          { questionId: 'q2', successCount: 3, failedCount: 1 },
        ],
      };
      const result = getTotalQuestionAnswers(lesson);
      expect(result.correct).toBe(8);
      expect(result.incorrect).toBe(3);
      expect(result.total).toBe(11);
      expect(result.successRate).toBeCloseTo(72.73, 1);
    });

    it('возвращает нули если нет вопросов', () => {
      const lesson: LessonProgress = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [],
      };
      const result = getTotalQuestionAnswers(lesson);
      expect(result.correct).toBe(0);
      expect(result.incorrect).toBe(0);
      expect(result.total).toBe(0);
      expect(result.successRate).toBe(0);
    });

    it('вычисляет 100% успешности', () => {
      const lesson: LessonProgress = {
        successAttempt: 0,
        failedAttempt: 0,
        questions: [{ questionId: 'q1', successCount: 10, failedCount: 0 }],
      };
      const result = getTotalQuestionAnswers(lesson);
      expect(result.successRate).toBe(100);
    });
  });

  describe('isLessonCompleted', () => {
    it('возвращает true если урок завершен', () => {
      const lesson: LessonProgress = {
        successAttempt: 3,
        failedAttempt: 0,
        questions: [],
      };
      expect(isLessonCompleted(lesson, 3)).toBe(true);
    });

    it('возвращает true если успешных попыток больше требуемых', () => {
      const lesson: LessonProgress = {
        successAttempt: 5,
        failedAttempt: 0,
        questions: [],
      };
      expect(isLessonCompleted(lesson, 3)).toBe(true);
    });

    it('возвращает false если урок не завершен', () => {
      const lesson: LessonProgress = {
        successAttempt: 2,
        failedAttempt: 1,
        questions: [],
      };
      expect(isLessonCompleted(lesson, 3)).toBe(false);
    });
  });

  describe('calculateLessonCompletedTasks', () => {
    it('возвращает количество завершенных задач', () => {
      const lesson: LessonProgress = {
        successAttempt: 2,
        failedAttempt: 1,
        questions: [],
      };
      expect(calculateLessonCompletedTasks(lesson, 3)).toBe(2);
    });

    it('ограничивает максимальным количеством задач', () => {
      const lesson: LessonProgress = {
        successAttempt: 5,
        failedAttempt: 0,
        questions: [],
      };
      expect(calculateLessonCompletedTasks(lesson, 3)).toBe(3);
    });

    it('возвращает 0 если прогресс не определен', () => {
      expect(calculateLessonCompletedTasks(undefined, 3)).toBe(0);
    });
  });

  describe('calculateLessonStatus', () => {
    it('возвращает COMPLETED если все задачи выполнены', () => {
      expect(calculateLessonStatus(3, 3)).toBe(STATUS.COMPLETED);
    });

    it('возвращает PROGRESS если есть прогресс', () => {
      expect(calculateLessonStatus(1, 3)).toBe(STATUS.PROGRESS);
      expect(calculateLessonStatus(2, 3)).toBe(STATUS.PROGRESS);
    });

    it('возвращает WAIT если нет прогресса', () => {
      expect(calculateLessonStatus(0, 3)).toBe(STATUS.WAIT);
    });
  });

  describe('calculateModuleStatus', () => {
    it('возвращает COMPLETED если все задачи выполнены', () => {
      expect(calculateModuleStatus(10, 10)).toBe(STATUS.COMPLETED);
    });

    it('возвращает PROGRESS если есть прогресс', () => {
      expect(calculateModuleStatus(5, 10)).toBe(STATUS.PROGRESS);
    });

    it('возвращает WAIT если нет прогресса', () => {
      expect(calculateModuleStatus(0, 10)).toBe(STATUS.WAIT);
    });
  });

  describe('calculateTotalXP', () => {
    it('вычисляет общий XP всех модулей', () => {
      const modules: ModuleData[] = [
        createModule('module1', 'Module 1', 'Test', [
          { id: 'l1', title: 'Lesson 1', xpReward: 10, totalTasks: 3 },
          { id: 'l2', title: 'Lesson 2', xpReward: 15, totalTasks: 3 },
        ]),
        createModule('module2', 'Module 2', 'Test', [
          { id: 'l3', title: 'Lesson 3', xpReward: 20, totalTasks: 3 },
        ]),
      ];
      expect(calculateTotalXP(modules)).toBe(45);
    });

    it('возвращает 0 для пустого массива модулей', () => {
      expect(calculateTotalXP([])).toBe(0);
    });

    it('возвращает 0 для модулей без уроков', () => {
      const modules: ModuleData[] = [createModule('module1', 'Module 1', 'Test', [])];
      expect(calculateTotalXP(modules)).toBe(0);
    });
  });

  describe('calculateTotalEarnedXP', () => {
    const modules: ModuleData[] = [
      createModule('module1', 'Module 1', 'Test', [
        { id: 'l1', title: 'Lesson 1', xpReward: 10, totalTasks: 3 },
        { id: 'l2', title: 'Lesson 2', xpReward: 15, totalTasks: 3 },
      ]),
      createModule('module2', 'Module 2', 'Test', [
        { id: 'l3', title: 'Lesson 3', xpReward: 20, totalTasks: 3 },
      ]),
    ];

    it('вычисляет заработанный XP для завершенных уроков', () => {
      const userProgress: UserProgress = {
        lessons: {
          l1: { successAttempt: 3, failedAttempt: 0, questions: [] },
          l2: { successAttempt: 3, failedAttempt: 1, questions: [] },
        },
      };
      expect(calculateTotalEarnedXP(userProgress, modules)).toBe(25);
    });

    it('не учитывает незавершенные уроки', () => {
      const userProgress: UserProgress = {
        lessons: {
          l1: { successAttempt: 2, failedAttempt: 1, questions: [] },
          l2: { successAttempt: 3, failedAttempt: 0, questions: [] },
        },
      };
      expect(calculateTotalEarnedXP(userProgress, modules)).toBe(15);
    });

    it('возвращает 0 если нет прогресса', () => {
      const userProgress: UserProgress = {
        lessons: {},
      };
      expect(calculateTotalEarnedXP(userProgress, modules)).toBe(0);
    });

    it('учитывает только завершенные уроки (successAttempt >= totalTasks)', () => {
      const userProgress: UserProgress = {
        lessons: {
          l1: { successAttempt: 5, failedAttempt: 2, questions: [] },
          l2: { successAttempt: 1, failedAttempt: 0, questions: [] },
          l3: { successAttempt: 3, failedAttempt: 5, questions: [] },
        },
      };
      expect(calculateTotalEarnedXP(userProgress, modules)).toBe(30);
    });
  });

  describe('calculateModuleTotalTests', () => {
    it('вычисляет общее количество тестов в модуле', () => {
      const module: ModuleData = createModule('module1', 'Module 1', 'Test', [
        { id: 'l1', title: 'Lesson 1', xpReward: 10, totalTasks: 3 },
        { id: 'l2', title: 'Lesson 2', xpReward: 15, totalTasks: 5 },
        { id: 'l3', title: 'Lesson 3', xpReward: 20, totalTasks: 4 },
      ]);
      expect(calculateModuleTotalTests(module)).toBe(12);
    });

    it('возвращает 0 для модуля без уроков', () => {
      const module: ModuleData = createModule('module1', 'Module 1', 'Test', []);
      expect(calculateModuleTotalTests(module)).toBe(0);
    });
  });

  describe('calculateModuleCompletedTests', () => {
    const module: ModuleData = createModule('module1', 'Module 1', 'Test', [
      { id: 'l1', title: 'Lesson 1', xpReward: 10, totalTasks: 3 },
      { id: 'l2', title: 'Lesson 2', xpReward: 15, totalTasks: 3 },
      { id: 'l3', title: 'Lesson 3', xpReward: 20, totalTasks: 3 },
    ]);

    it('вычисляет количество завершенных тестов в модуле', () => {
      const userProgress: UserProgress = {
        lessons: {
          l1: { successAttempt: 3, failedAttempt: 0, questions: [] },
          l2: { successAttempt: 2, failedAttempt: 1, questions: [] },
          l3: { successAttempt: 1, failedAttempt: 0, questions: [] },
        },
      };
      expect(calculateModuleCompletedTests(userProgress, module)).toBe(6);
    });

    it('ограничивает максимальным количеством тестов урока', () => {
      const userProgress: UserProgress = {
        lessons: {
          l1: { successAttempt: 5, failedAttempt: 0, questions: [] },
          l2: { successAttempt: 4, failedAttempt: 1, questions: [] },
          l3: { successAttempt: 3, failedAttempt: 0, questions: [] },
        },
      };
      expect(calculateModuleCompletedTests(userProgress, module)).toBe(9);
    });

    it('не учитывает попытки сверх totalTasks (пользователь продолжает практиковаться)', () => {
      const userProgress: UserProgress = {
        lessons: {
          l1: { successAttempt: 10, failedAttempt: 5, questions: [] },
          l2: { successAttempt: 7, failedAttempt: 2, questions: [] },
          l3: { successAttempt: 15, failedAttempt: 8, questions: [] },
        },
      };
      expect(calculateModuleCompletedTests(userProgress, module)).toBe(9);
    });

    it('корректно работает со смешанными данными (некоторые уроки с избытком попыток)', () => {
      const userProgress: UserProgress = {
        lessons: {
          l1: { successAttempt: 2, failedAttempt: 1, questions: [] },
          l2: { successAttempt: 8, failedAttempt: 3, questions: [] },
          l3: { successAttempt: 3, failedAttempt: 0, questions: [] },
        },
      };
      expect(calculateModuleCompletedTests(userProgress, module)).toBe(8);
    });

    it('возвращает 0 если нет прогресса', () => {
      const userProgress: UserProgress = {
        lessons: {},
      };
      expect(calculateModuleCompletedTests(userProgress, module)).toBe(0);
    });
  });
});

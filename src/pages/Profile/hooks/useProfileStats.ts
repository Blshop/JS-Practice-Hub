import { useMemo } from 'react';
import learningPathData from 'data/js-learning-path-data.json';
import type { UserServerProgress } from 'types/UserProgress';

export interface LessonStat {
  id: string;
  title: string;
  moduleTitle: string;
  xpReward: number;
  successAttempts: number;
  failedAttempts: number;
  totalAttempts: number;
  successRate: number;
}

export interface ModuleStat {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  successAttempts: number;
  failedAttempts: number;
}

export interface ProfileStats {
  totalSuccess: number;
  totalFailed: number;
  totalAttempts: number;
  successRate: number;
  completedLessons: number;
  totalLessons: number;
  totalXP: number;
  earnedXP: number;
  lessonStats: LessonStat[];
  moduleStats: ModuleStat[];
}

export const useProfileStats = (userProgress: UserServerProgress | null): ProfileStats | null => {
  return useMemo(() => {
    if (!userProgress) return null;

    const serverProgress = userProgress.lessons;
    let totalSuccess = 0;
    let totalFailed = 0;
    let earnedXP = 0;
    const lessonStats: LessonStat[] = [];
    const moduleStatsMap = new Map<string, ModuleStat>();

    // Инициализация статистики модулей
    for (const module of learningPathData.modules) {
      moduleStatsMap.set(module.id, {
        id: module.id,
        title: module.title,
        completedLessons: 0,
        totalLessons: module.lessons.length,
        successAttempts: 0,
        failedAttempts: 0,
      });
    }

    // Обработка статистики уроков
    for (const module of learningPathData.modules) {
      for (const lesson of module.lessons) {
        const lessonProgress = serverProgress[lesson.id];

        if (lessonProgress) {
          const successAttempts = lessonProgress.success_attempt;
          const failedAttempts = lessonProgress.failed_attempt;
          const totalAttempts = successAttempts + failedAttempts;
          const successRate = totalAttempts > 0 ? (successAttempts / totalAttempts) * 100 : 0;

          totalSuccess += successAttempts;
          totalFailed += failedAttempts;

          // Урок считается пройденным если success_attempt >= totalTasks
          const isCompleted = successAttempts >= lesson.totalTasks;
          if (isCompleted) {
            earnedXP += lesson.xpReward;
            const moduleStat = moduleStatsMap.get(module.id);
            if (moduleStat) {
              moduleStat.completedLessons++;
            }
          }

          // Обновление статистики модуля
          const moduleStat = moduleStatsMap.get(module.id);
          if (moduleStat) {
            moduleStat.successAttempts += successAttempts;
            moduleStat.failedAttempts += failedAttempts;
          }

          lessonStats.push({
            id: lesson.id,
            title: lesson.title,
            moduleTitle: module.title,
            xpReward: lesson.xpReward,
            successAttempts,
            failedAttempts,
            totalAttempts,
            successRate: Math.round(successRate),
          });
        }
      }
    }

    const totalAttempts = totalSuccess + totalFailed;
    const successRate = totalAttempts > 0 ? (totalSuccess / totalAttempts) * 100 : 0;

    // Подсчет общего количества уроков и пройденных
    const totalLessons = learningPathData.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0,
    );
    const completedLessons = lessonStats.filter((lesson) => {
      const lessonInfo = learningPathData.modules
        .flatMap((m) => m.lessons)
        .find((l) => l.id === lesson.id);
      return lessonInfo && lesson.successAttempts >= lessonInfo.totalTasks;
    }).length;

    // Подсчет максимального XP
    const totalXP = learningPathData.modules.reduce(
      (sum, module) =>
        sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.xpReward, 0),
      0,
    );

    return {
      totalSuccess,
      totalFailed,
      totalAttempts,
      successRate: Math.round(successRate),
      completedLessons,
      totalLessons,
      totalXP,
      earnedXP,
      lessonStats: lessonStats.sort((a, b) => b.totalAttempts - a.totalAttempts),
      moduleStats: Array.from(moduleStatsMap.values()),
    };
  }, [userProgress]);
};

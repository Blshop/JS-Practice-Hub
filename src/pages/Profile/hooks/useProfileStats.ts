import { useMemo } from 'react';
import learningPathData from 'data/js-learning-path-data.json';
import type { UserServerProgress } from 'types/UserProgress';
import {
  getTotalAttempts,
  getSuccessRate,
  getTotalQuestionAnswers,
  isLessonCompleted,
} from '../utils/progressCalculations';

export interface LessonStat {
  id: string;
  title: string;
  moduleTitle: string;
  xpReward: number;
  successAttempts: number;
  failedAttempts: number;
  totalAttempts: number;
  successRate: number;
  questionsCorrect: number;
  questionsIncorrect: number;
  totalQuestions: number;
  questionsSuccessRate: number;
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
  questionsStats: {
    totalCorrect: number;
    totalIncorrect: number;
    totalAnswered: number;
    successRate: number;
  };
  modulesOverallStats: {
    completedModules: number;
    totalModules: number;
    inProgressModules: number;
  };
}

export const useProfileStats = (userProgress: UserServerProgress | null): ProfileStats | null => {
  return useMemo(() => {
    if (!userProgress) return null;

    const serverProgress = userProgress.lessons;
    let totalSuccess = 0;
    let totalFailed = 0;
    let earnedXP = 0;
    let totalQuestionsCorrect = 0;
    let totalQuestionsIncorrect = 0;
    const lessonStats: LessonStat[] = [];
    const moduleStatsMap = new Map<string, ModuleStat>();

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

    for (const module of learningPathData.modules) {
      for (const lesson of module.lessons) {
        const lessonProgress = serverProgress[lesson.id];

        if (lessonProgress) {
          const successAttempts = lessonProgress.successAttempt;
          const failedAttempts = lessonProgress.failedAttempt;
          const totalAttempts = getTotalAttempts(lessonProgress);
          const successRate = getSuccessRate(lessonProgress);

          totalSuccess += successAttempts;
          totalFailed += failedAttempts;

          const questionStats = getTotalQuestionAnswers(lessonProgress);
          totalQuestionsCorrect += questionStats.correct;
          totalQuestionsIncorrect += questionStats.incorrect;

          const isCompleted = isLessonCompleted(lessonProgress, lesson.totalTasks);
          if (isCompleted) {
            earnedXP += lesson.xpReward;
            const moduleStat = moduleStatsMap.get(module.id);
            if (moduleStat) {
              moduleStat.completedLessons++;
            }
          }

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
            questionsCorrect: questionStats.correct,
            questionsIncorrect: questionStats.incorrect,
            totalQuestions: questionStats.total,
            questionsSuccessRate: Math.round(questionStats.successRate),
          });
        }
      }
    }

    const totalAttempts = totalSuccess + totalFailed;
    const successRate = totalAttempts > 0 ? (totalSuccess / totalAttempts) * 100 : 0;

    const totalQuestionsAnswered = totalQuestionsCorrect + totalQuestionsIncorrect;
    const questionsSuccessRate =
      totalQuestionsAnswered > 0 ? (totalQuestionsCorrect / totalQuestionsAnswered) * 100 : 0;

    const completedModules = Array.from(moduleStatsMap.values()).filter(
      (m) => m.completedLessons === m.totalLessons,
    ).length;
    const inProgressModules = Array.from(moduleStatsMap.values()).filter(
      (m) => m.completedLessons > 0 && m.completedLessons < m.totalLessons,
    ).length;

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
      questionsStats: {
        totalCorrect: totalQuestionsCorrect,
        totalIncorrect: totalQuestionsIncorrect,
        totalAnswered: totalQuestionsAnswered,
        successRate: Math.round(questionsSuccessRate),
      },
      modulesOverallStats: {
        completedModules,
        totalModules: learningPathData.modules.length,
        inProgressModules,
      },
    };
  }, [userProgress]);
};

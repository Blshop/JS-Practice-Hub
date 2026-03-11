import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '../types/LearningPath';
import { initialUserProgress } from '../data/learningPath';

const STORAGE_KEY = 'js-practice-hub-progress';

interface AchievementData {
  title: string;
  description: string;
  icon: string;
  xpReward: number;
}

export const useLearningProgress = () => {
  // Используем lazy initial state для загрузки из localStorage
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        return JSON.parse(savedProgress);
      } catch (error) {
        console.error('Error loading progress:', error);
        return initialUserProgress;
      }
    }
    return initialUserProgress;
  });

  const [achievement, setAchievement] = useState<AchievementData | null>(null);

  // Сохранение прогресса в localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
  }, [userProgress]);

  // Завершение урока
  const completeLesson = useCallback((lessonId: string, xpReward: number) => {
    setUserProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev; // Урок уже завершен
      }

      const today = new Date().toDateString();
      const isNewDay = prev.lastStudyDate !== today;
      const newTotalXp = prev.totalXp + xpReward;

      // Проверяем достижения
      if (newTotalXp >= 50 && prev.totalXp < 50) {
        setAchievement({
          title: 'Первые шаги!',
          description: 'Вы набрали 50 XP и открыли новые уроки',
          icon: '🎉',
          xpReward: 10,
        });
      } else if (newTotalXp >= 100 && prev.totalXp < 100) {
        setAchievement({
          title: 'Продвинутый ученик',
          description: 'Вы набрали 100 XP! Отличная работа!',
          icon: '🏆',
          xpReward: 20,
        });
      }

      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        totalXp: newTotalXp,
        streak: isNewDay ? prev.streak + 1 : prev.streak,
        lastStudyDate: today,
      };
    });
  }, []);

  // Сброс прогресса
  const resetProgress = useCallback(() => {
    setUserProgress(initialUserProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Обновление текущего урока
  const setCurrentLesson = useCallback((lessonId: string, moduleId: string) => {
    setUserProgress((prev) => ({
      ...prev,
      currentLesson: lessonId,
      currentModule: moduleId,
    }));
  }, []);

  // Закрытие достижения
  const closeAchievement = useCallback(() => {
    setAchievement(null);
  }, []);

  return {
    userProgress,
    achievement,
    completeLesson,
    resetProgress,
    setCurrentLesson,
    closeAchievement,
  };
};

import { UserProgress } from '../models/UserProgress.js';

/**
 * @swagger
 * /progress/lesson:
 *   post:
 *     summary: Save lesson progress for authenticated user
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lessonId
 *               - progress
 *             properties:
 *               lessonId:
 *                 type: string
 *               progress:
 *                 type: object
 *                 properties:
 *                   successAttempt:
 *                     type: number
 *                   failedAttempt:
 *                     type: number
 *                   questions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         questionId:
 *                           type: string
 *                         successCount:
 *                           type: number
 *                         failedCount:
 *                           type: number
 *     responses:
 *       200:
 *         description: Progress saved successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export const saveLessonProgress = async (req, res) => {
  try {
    const { lessonId, progress } = req.body;
    const userId = req.userId;

    if (!lessonId || !progress) {
      return res.status(400).json({ message: 'lessonId and progress are required' });
    }

    if (
      typeof progress.successAttempt !== 'number' ||
      typeof progress.failedAttempt !== 'number' ||
      !Array.isArray(progress.questions)
    ) {
      return res.status(400).json({ message: 'Invalid progress data structure' });
    }

    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new UserProgress({ userId, lessons: new Map() });
    }

    userProgress.lessons.set(lessonId, progress);

    await userProgress.save();

    res.json({
      message: 'Progress saved successfully',
      lessonId,
      progress: userProgress.lessons.get(lessonId),
    });
  } catch (error) {
    console.error('Error saving lesson progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @swagger
 * /progress:
 *   get:
 *     summary: Get all progress for authenticated user
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User progress retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.userId; // Из JWT токена через middleware

    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      return res.json({ lessons: {} });
    }

    const lessonsObject = {};
    userProgress.lessons.forEach((value, key) => {
      lessonsObject[key] = value;
    });

    res.json({ lessons: lessonsObject });
  } catch (error) {
    console.error('Error getting user progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

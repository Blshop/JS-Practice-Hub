import express from 'express';
import { saveLessonProgress, getUserProgress } from '../controllers/progressController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/lesson', authenticate, saveLessonProgress);
router.get('/', authenticate, getUserProgress);

export default router;

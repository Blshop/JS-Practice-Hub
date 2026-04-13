import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../index.js';
import { User } from '../models/User.js';
import { UserProgress } from '../models/UserProgress.js';
import { generateAccessToken } from '../services/tokenService.js';
import bcrypt from 'bcryptjs';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await UserProgress.deleteMany({});
});

describe('Progress API', () => {
  let accessToken;
  let userId;

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash('Password123', 10);
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      passwordHash,
    });
    userId = user._id;
    accessToken = generateAccessToken(userId);
  });

  describe('POST /api/progress/lesson', () => {
    it('должен сохранить прогресс урока для авторизованного пользователя', async () => {
      const lessonData = {
        lessonId: 'js-basics-1',
        progress: {
          successAttempt: 1,
          failedAttempt: 0,
          questions: [
            {
              questionId: 'var-let-001',
              successCount: 1,
              failedCount: 0,
            },
          ],
        },
      };

      const res = await request(app)
        .post('/api/progress/lesson')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(lessonData);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Progress saved successfully');
      expect(res.body.lessonId).toBe('js-basics-1');
      expect(res.body.progress.successAttempt).toBe(1);
      expect(res.body.progress.questions).toHaveLength(1);
    });

    it('должен перезаписать существующий прогресс урока', async () => {
      await UserProgress.create({
        userId,
        lessons: new Map([
          [
            'js-basics-1',
            {
              successAttempt: 1,
              failedAttempt: 1,
              questions: [
                {
                  questionId: 'var-let-001',
                  successCount: 1,
                  failedCount: 1,
                },
              ],
            },
          ],
        ]),
      });

      const newData = {
        lessonId: 'js-basics-1',
        progress: {
          successAttempt: 2,
          failedAttempt: 1,
          questions: [
            {
              questionId: 'var-let-001',
              successCount: 2,
              failedCount: 1,
            },
            {
              questionId: 'var-let-002',
              successCount: 1,
              failedCount: 0,
            },
          ],
        },
      };

      const res = await request(app)
        .post('/api/progress/lesson')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(newData);

      expect(res.status).toBe(200);
      expect(res.body.progress.successAttempt).toBe(2);
      expect(res.body.progress.questions).toHaveLength(2);
    });

    it('должен вернуть 401 без токена авторизации', async () => {
      const lessonData = {
        lessonId: 'js-basics-1',
        progress: {
          successAttempt: 1,
          failedAttempt: 0,
          questions: [],
        },
      };

      const res = await request(app).post('/api/progress/lesson').send(lessonData);

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('No token provided');
    });

    it('должен вернуть 400 при отсутствии lessonId', async () => {
      const res = await request(app)
        .post('/api/progress/lesson')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          progress: {
            successAttempt: 1,
            failedAttempt: 0,
            questions: [],
          },
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('lessonId and progress are required');
    });

    it('должен вернуть 400 при невалидной структуре прогресса', async () => {
      const res = await request(app)
        .post('/api/progress/lesson')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          lessonId: 'js-basics-1',
          progress: {
            successAttempt: 'invalid',
            failedAttempt: 0,
            questions: [],
          },
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid progress data structure');
    });
  });

  describe('GET /api/progress', () => {
    it('должен вернуть прогресс пользователя', async () => {
      await UserProgress.create({
        userId,
        lessons: new Map([
          [
            'js-basics-1',
            {
              successAttempt: 1,
              failedAttempt: 0,
              questions: [
                {
                  questionId: 'var-let-001',
                  successCount: 1,
                  failedCount: 0,
                },
              ],
            },
          ],
          [
            'js-basics-2',
            {
              successAttempt: 0,
              failedAttempt: 1,
              questions: [
                {
                  questionId: 'type-001',
                  successCount: 0,
                  failedCount: 1,
                },
              ],
            },
          ],
        ]),
      });

      const res = await request(app)
        .get('/api/progress')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.lessons).toBeDefined();
      expect(res.body.lessons['js-basics-1']).toBeDefined();
      expect(res.body.lessons['js-basics-2']).toBeDefined();
      expect(res.body.lessons['js-basics-1'].successAttempt).toBe(1);
    });

    it('должен вернуть пустой объект для нового пользователя', async () => {
      const res = await request(app)
        .get('/api/progress')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
      expect(res.body.lessons).toEqual({});
    });

    it('должен вернуть 401 без токена авторизации', async () => {
      const res = await request(app).get('/api/progress');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('No token provided');
    });
  });
});

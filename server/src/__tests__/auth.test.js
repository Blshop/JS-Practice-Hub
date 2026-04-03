import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../index.js';
import { User } from '../models/User.js';
import { RefreshToken } from '../models/RefreshToken.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../services/tokenService.js';

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
  await RefreshToken.deleteMany({});
});

describe('Auth API', () => {
  describe('POST /api/auth/register', () => {
    it('должен зарегистрировать нового пользователя и вернуть токены', async () => {
      const res = await request(app).post('/api/auth/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123',
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body.user).toMatchObject({
        username: 'testuser',
        email: 'test@example.com',
      });
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('должен вернуть 400, если email уже существует', async () => {
      await User.create({
        username: 'existing',
        email: 'test@example.com',
        passwordHash: 'hash',
      });
      const res = await request(app).post('/api/auth/register').send({
        username: 'newuser',
        email: 'test@example.com',
        password: 'Password123',
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email already registered');
    });
  });

  describe('POST /api/auth/login', () => {
    let user;
    beforeEach(async () => {
      const passwordHash = await bcrypt.hash('Password123', 10);
      user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        passwordHash,
      });
    });

    it('должен войти и вернуть токены', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'Password123',
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body.user).toMatchObject({
        username: 'testuser',
        email: 'test@example.com',
      });
    });

    it('должен вернуть 401 при неверных данных', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'wrong',
      });
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken;
    beforeEach(async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hash',
      });
      const token = generateRefreshToken(user._id);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await RefreshToken.create({ token, userId: user._id, expiresAt });
      refreshToken = token;
    });

    it('должен обновить access токен', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [`refreshToken=${refreshToken}`]);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body.user).toBeDefined();
    });

    it('должен вернуть 401, если refresh токен отсутствует', async () => {
      const res = await request(app).post('/api/auth/refresh');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('No refresh token');
    });
  });

  describe('POST /api/auth/logout', () => {
    let refreshToken;
    beforeEach(async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hash',
      });
      const token = generateRefreshToken(user._id);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await RefreshToken.create({ token, userId: user._id, expiresAt });
      refreshToken = token;
    });

    it('должен удалить refresh токен и очистить куку', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', [`refreshToken=${refreshToken}`]);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
      const tokenInDb = await RefreshToken.findOne({ token: refreshToken });
      expect(tokenInDb).toBeNull();
      const cookieHeader = res.headers['set-cookie'][0];
      expect(cookieHeader).toMatch(/refreshToken=;/);
    });
  });

  describe('GET /api/auth/profile', () => {
    let accessToken;
    beforeEach(async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hash',
      });
      accessToken = generateAccessToken(user._id);
    });

    it('должен вернуть профиль при валидном токене', async () => {
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${accessToken}`);
      expect(res.status).toBe(200);
      expect(res.body.user).toMatchObject({
        username: 'testuser',
        email: 'test@example.com',
      });
      expect(res.body.user).not.toHaveProperty('passwordHash');
    });

    it('должен вернуть 401, если токен отсутствует', async () => {
      const res = await request(app).get('/api/auth/profile');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('No token provided');
    });
  });
});

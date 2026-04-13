import { createLoginSchema } from '../loginSchema';
import { createRegisterSchema } from '../registerSchema';

const loginSchema = createLoginSchema({
  emailInvalid: 'Invalid email',
  passwordMin: 'Password must be at least 6 characters',
  passwordUppercase: 'Password must contain at least one uppercase letter',
  passwordDigit: 'Password must contain at least one digit',
});

const registerSchema = createRegisterSchema({
  usernameRequired: 'Username is required',
  emailInvalid: 'Invalid email',
  passwordMin: 'Password must be at least 6 characters',
  passwordUppercase: 'Password must contain at least one uppercase letter',
  passwordDigit: 'Password must contain at least one digit',
});

describe('Валидация Auth', () => {
  describe('Авторизация (loginSchema)', () => {
    it('должен пропускать валидные данные', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'Password123',
      });
      expect(result.success).toBe(true);
    });

    it('должен отвергать невалидный email', () => {
      const result = loginSchema.safeParse({
        email: 'not-an-email',
        password: 'Password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe('email');
      }
    });

    it('должен отвергать пароль короче 6 символов', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'Pass1',
      });
      expect(result.success).toBe(false);
    });

    it('должен отвергать пароль без заглавной буквы', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('должен отвергать пароль без цифры', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'Password',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Регистрация (registerSchema)', () => {
    it('должен требовать username', () => {
      const result = registerSchema.safeParse({
        username: '',
        email: 'test@example.com',
        password: 'Password123',
      });
      expect(result.success).toBe(false);
    });

    it('должен пропускать валидные данные', () => {
      const result = registerSchema.safeParse({
        username: 'john_doe',
        email: 'test@example.com',
        password: 'Password123',
      });
      expect(result.success).toBe(true);
    });

    it('должен отвергать невалидный email', () => {
      const result = registerSchema.safeParse({
        username: 'john_doe',
        email: 'not-an-email',
        password: 'Password123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe('email');
      }
    });

    it('должен отвергать пароль короче 6 символов', () => {
      const result = registerSchema.safeParse({
        username: 'john_doe',
        email: 'test@example.com',
        password: 'Pass1',
      });
      expect(result.success).toBe(false);
    });

    it('должен отвергать пароль без заглавной буквы', () => {
      const result = registerSchema.safeParse({
        username: 'john_doe',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('должен отвергать пароль без цифры', () => {
      const result = registerSchema.safeParse({
        username: 'john_doe',
        email: 'test@example.com',
        password: 'Password',
      });
      expect(result.success).toBe(false);
    });
  });
});

import { z } from 'zod';

export type RegisterSchemaMessages = {
  usernameRequired: string;
  emailInvalid: string;
  passwordMin: string;
  passwordUppercase: string;
  passwordDigit: string;
};

export const createRegisterSchema = (m: RegisterSchemaMessages) =>
  z.object({
    username: z.string().min(1, m.usernameRequired),
    email: z.email(m.emailInvalid),
    password: z
      .string()
      .min(6, m.passwordMin)
      .regex(/[A-Z]/, m.passwordUppercase)
      .regex(/[0-9]/, m.passwordDigit),
  });

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;

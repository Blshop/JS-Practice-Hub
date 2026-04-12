import { z } from 'zod';

export type LoginSchemaMessages = {
  emailInvalid: string;
  passwordMin: string;
  passwordUppercase: string;
  passwordDigit: string;
};

export const createLoginSchema = (m: LoginSchemaMessages) =>
  z.object({
    email: z.email(m.emailInvalid),
    password: z
      .string()
      .min(6, m.passwordMin)
      .regex(/[A-Z]/, m.passwordUppercase)
      .regex(/[0-9]/, m.passwordDigit),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

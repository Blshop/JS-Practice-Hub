import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase Latin letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

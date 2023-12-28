import { z } from 'zod';

export const accountSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email address.' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters.' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Please confirm your password.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

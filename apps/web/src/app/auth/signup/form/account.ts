import { checkAvailabilityEmail } from '@chirp/api';
import { z } from 'zod';

export const accountSchema = z
    .object({
        email: z.string().email({ message: 'Invalid email address.' }).min(1),
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
    })
    .refine((data) => data.password.trim().length > 8, {
        message: 'Please use strong password!',
        path: ['password'],
    })
    .refine(async (data) => await checkAvailabilityEmail(data.email), {
        message: 'Email already exist!',
        path: ['email'],
    });

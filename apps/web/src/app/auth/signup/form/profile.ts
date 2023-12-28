import { z } from 'zod';

export const profileSchema = z.object({
    username: z.string().min(3),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    dob: z.string({ required_error: 'A date of birth is required.' }),
    gender: z.enum(['male', 'female']),
    address: z.string().min(3),
});

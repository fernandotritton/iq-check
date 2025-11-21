import { z } from 'zod';

// Test submission schema
export const testSubmissionSchema = z.object({
    sessionId: z.string().optional(),
    answers: z.array(z.object({
        questionId: z.number(),
        selectedOption: z.number(),
        timeTakenMs: z.number(),
    })),
});

// Demographics schema
export const demographicsSchema = z.object({
    sessionId: z.string(),
    age: z.number().min(10).max(120),
    education: z.enum(['high_school', 'university', 'postgraduate', 'other']),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
});

// Email capture schema
export const emailCaptureSchema = z.object({
    sessionId: z.string(),
    email: z.string().email(),
});

// Payment schema
export const paymentSchema = z.object({
    sessionId: z.string(),
    amount: z.number().positive(),
    currency: z.string(),
    paymentMethod: z.string(),
});

// Type exports
export type TestSubmission = z.infer<typeof testSubmissionSchema>;
export type Demographics = z.infer<typeof demographicsSchema>;
export type EmailCapture = z.infer<typeof emailCaptureSchema>;
export type Payment = z.infer<typeof paymentSchema>;

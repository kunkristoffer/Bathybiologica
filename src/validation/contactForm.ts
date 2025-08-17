import { z } from 'zod';

export const ContactSchema = z.object({
  firstName: z.string().min(2, 'Please enter your first name').max(50, 'Keep it under 50 characters'),
  lastName: z.string().min(2, 'Please enter your last name').max(50, 'Keep it under 50 characters'),
  email: z.email('Enter a valid email address').max(254, 'Email is too long'),
  subject: z.string().min(2, 'Please include the subject').max(120, 'Keep the subject concise'),
  message: z.string().min(10, 'Tell us a bit more (min 10 characters)').max(4000, 'Message is too long'),
  // Honeypot: must be empty
  hp: z.string().max(0, 'Spam detected'),
});

export type ContactInput = z.infer<typeof ContactSchema>;

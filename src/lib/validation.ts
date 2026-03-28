import { z } from 'zod';

export const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, 'Please enter your name')
		.max(255, 'Name cannot exceed 255 characters'),
	email: z
		.string()
		.trim()
		.min(1, 'Please enter your email')
		.email('Please enter a valid email')
		.max(250, 'Email cannot exceed 250 characters'),
	subject: z
		.string()
		.trim()
		.min(1, 'Please enter a subject')
		.max(255, 'Subject cannot exceed 255 characters'),
	message: z
		.string()
		.trim()
		.min(1, 'Please enter your message')
		.max(3500, 'Message cannot exceed 3500 characters'),
	captchaSolution: z.string().trim().min(1, 'Please complete the captcha verification'),
	website: z.string().trim().max(0, 'Spam detected').optional().default(''),
	submittedAt: z.coerce.number().int().positive('Form timing is invalid')
});

export type ContactFormData = z.infer<typeof contactSchema>;

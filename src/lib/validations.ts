import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  image: z.string().optional(),
  link: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  category: z.enum(['web', 'ai', 'tutoring']).default('web'),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  readTime: z.number().default(5),
  category: z.string().default('general'),
  published: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  company: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  image: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
  service: z.enum(['tutoring', 'web-dev', 'ai', 'consultation']).default('web-dev'),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  service: z.enum(['tutoring', 'web-dev', 'ai', 'consultation']).default('web-dev'),
  message: z.string().min(1, 'Message is required'),
  status: z.string().default('new'),
});

export const settingsSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type BlogInput = z.infer<typeof blogSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;

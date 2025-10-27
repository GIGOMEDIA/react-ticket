import { z } from 'zod';

export const ticketSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z
    .string()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional(),
  status: z.enum(['open', 'in_progress', 'closed'], {
    required_error: 'Status is required',
    invalid_type_error: 'Status must be one of: open, in_progress, closed',
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Priority is required',
    invalid_type_error: 'Priority must be one of: low, medium, high',
  }).default('medium'),
});

export const validateTicket = (data) => {
  return ticketSchema.safeParse(data);
};

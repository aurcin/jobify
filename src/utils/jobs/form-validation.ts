import * as z from 'zod';

import { JobStatus, JobMode } from '@/types/jobs';

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: 'position must be at least 2 characters.',
  }),

  company: z.string().min(2, {
    message: 'company must be at least 2 characters.',
  }),

  location: z.string().min(2, {
    message: 'location must be at least 2 characters.',
  }),

  status: z.nativeEnum(JobStatus),

  mode: z.nativeEnum(JobMode),
});

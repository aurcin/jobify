import { z } from 'zod';

import { createAndEditJobSchema } from '@/utils/jobs/form-validation';

export type JobType = {
  id: string;
  clerkId: string;

  position: string;
  company: string;
  location: string;

  status: string;
  mode: string;

  createdAt: Date;
  updatedAt: Date;
};

export enum JobStatus {
  Pending = 'pending',
  Interview = 'interview',
  Declined = 'declined',
}

export enum JobMode {
  FullTime = 'full-time',
  PartTime = 'part-time',
  Internship = 'internship',
}

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;

import { z } from 'zod';

import { createAndEditJobSchema } from '@/utils/jobs/form-validation';

export type Job = {
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

export type CreateAndEditJob = z.infer<typeof createAndEditJobSchema>;

export type GetJobsParameters = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export type JobList = {
  jobs: Job[];
  count: number;
  page: number;
  totalPages: number;
};

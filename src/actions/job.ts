'use server';

import type { CreateAndEditJobType, JobType } from '@/types/jobs';
import { authenticateAndRedirect } from '@/utils/auth/lib';
import db from '@/utils/db/instance';
import { createAndEditJobSchema } from '@/utils/jobs/form-validation';

export async function createJob(
  jobData: CreateAndEditJobType
): Promise<JobType | null> {
  try {
    const userId = authenticateAndRedirect();

    // extra zod validation in server
    createAndEditJobSchema.parse(jobData);

    const job = await db.job.create({
      data: { ...jobData, clerkId: userId },
    });

    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

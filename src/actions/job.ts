'use server';

import { Prisma } from '@prisma/client';

import type {
  CreateAndEditJob,
  Job,
  GetJobsParameters,
  JobList,
} from '@/types/jobs';
import { authenticateAndRedirect } from '@/utils/auth/lib';
import db from '@/utils/db/instance';
import { createAndEditJobSchema } from '@/utils/jobs/form-validation';

const DEFAULT_PAGE = 1;
const JOBS_PER_PAGE = 10;

export async function createJob(
  jobData: CreateAndEditJob
): Promise<Job | null> {
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

export async function getJobs(params: GetJobsParameters): Promise<JobList> {
  const userId = authenticateAndRedirect();

  const {
    search,
    jobStatus,
    page = DEFAULT_PAGE,
    limit = JOBS_PER_PAGE,
  } = params;

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== 'all') {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const jobs: Job[] = await db.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

'use server';

import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';

import { createAndEditJobSchema } from '@/utils/jobs/form-validation';
import { authenticateAndRedirect } from '@/utils/auth/lib';
import db from '@/utils/db/instance';
import paths from '@/utils/navigation/paths';

import type {
  CreateAndEditJob,
  Job,
  GetJobsParameters,
  JobList,
} from '@/types/jobs';

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

    const skip = (page - 1) * limit;

    const jobs: Job[] = await db.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const count: number = await db.job.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / limit);

    return { jobs, count, page, totalPages };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  let job: Job | null = null;
  const userId = authenticateAndRedirect();

  try {
    job = await db.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    job = null;
  }
  if (!job) {
    redirect(paths.jobs());
  }

  return job;
}

export async function updateJob(
  id: string,
  values: CreateAndEditJob
): Promise<Job | null> {
  const userId = authenticateAndRedirect();

  try {
    const job: Job = await db.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
}

export async function deleteJob(id: string): Promise<Job | null> {
  const userId = authenticateAndRedirect();

  try {
    const job: Job = await db.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
}

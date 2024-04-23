import { redirect } from 'next/navigation';
import dayjs from 'dayjs';

import { authenticateAndRedirect } from '@/utils/auth/lib';
import db from '@/utils/db/instance';
import paths from '@/utils/navigation/paths';

import type { Stats } from '@/types/stats';

export async function getStats(): Promise<Stats> {
  const userId = authenticateAndRedirect();

  try {
    const stats = await db.job.groupBy({
      where: {
        clerkId: userId,
      },
      by: ['status'],
      _count: {
        status: true,
      },
    });

    const status = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...status,
    };

    return defaultStats;
  } catch (error) {
    redirect(paths.jobs());
  }
}

export async function getChartsData(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, 'month').toDate();

  try {
    const jobs = await db.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');

      const existingEntry = acc.find(entry => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    return applicationsPerMonth;
  } catch (error) {
    redirect(paths.jobs());
  }
}

'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getJobs } from '@/actions/job';
import JobCard from './card';

export default function JobList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('job-status') || 'all';
  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending } = useQuery({
    queryKey: ['jobs', search ?? '', jobStatus, pageNumber],
    queryFn: () => getJobs({ search, jobStatus, page: pageNumber }),
  });

  if (isPending) {
    return <h2 className='text-xl'>Please Wait...</h2>;
  }

  const jobs = data?.jobs || [];

  if (jobs.length < 1) {
    return <h2 className='text-xl'>No Jobs Found...</h2>;
  }

  const renderJobs = jobs.map(job => {
    const { id } = job;
    return <JobCard key={id} job={job} />;
  });

  return <div className='grid md:grid-cols-2 gap-8'>{renderJobs}</div>;
}

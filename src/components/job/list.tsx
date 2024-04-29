'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import JobCard from '@/components/job/card';
import ButtonContainer from '@/components/layout/button-container-complex';

import { getJobs } from '@/actions/job';

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
  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  if (isPending) return <h2 className='text-xl'>Please Wait...</h2>;

  if (jobs.length < 1) {
    return <h2 className='text-xl'>No Jobs Found...</h2>;
  }

  const renderJobs = jobs.map(job => {
    const { id } = job;
    return <JobCard key={id} job={job} />;
  });

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold capitalize '>
          {count} jobs found
        </h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className='grid md:grid-cols-2 gap-8'>{renderJobs}</div>
    </>
  );
}

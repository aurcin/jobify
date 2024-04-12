import type { Job } from '@/types/jobs';

interface JobListProps {
  jobs: Job[];
}

export default function JobList(props: JobListProps) {
  return <h1 className='text-4xl'>Job List</h1>;
}

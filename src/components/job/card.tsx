import type { Job } from '@/types/jobs';

interface JobCardProps {
  job: Job;
}

export default function JobCard(props: JobCardProps) {
  return <h1 className='text-4xl'>Job Card</h1>;
}

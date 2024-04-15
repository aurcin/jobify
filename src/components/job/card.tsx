import type { Job } from '@/types/jobs';

interface JobCardProps {
  job: Job;
}

export default function JobCard(props: JobCardProps) {
  const {
    job: { position },
  } = props;
  return <h1 className='text-4xl'>{position}</h1>;
}

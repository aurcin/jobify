'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import { JobStatus } from '@/types/jobs';

const JOB_STATUS_OPTIONS = ['all', ...Object.values(JobStatus)];

export default function SearchJobForm() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('job-status') || 'all';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('job-status') as string;

    const params = new URLSearchParams();
    params.set('search', search);
    params.set('job-status', jobStatus);
    router.push(`${pathname}?${params.toString()}`);
  }

  const renderJobstatusOptions = JOB_STATUS_OPTIONS.map(option => {
    return (
      <SelectItem key={option} value={option}>
        {option}
      </SelectItem>
    );
  });

  return (
    <form
      className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg'
      onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='Search Jobs'
        name='search'
        defaultValue={search}
      />
      <Select name='job-status' defaultValue={jobStatus}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{renderJobstatusOptions}</SelectContent>
      </Select>
      <Button type='submit'>Search</Button>
    </form>
  );
}

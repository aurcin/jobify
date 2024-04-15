import Link from 'next/link';
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react';

import type { Job } from '@/types/jobs';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import DeleteJobButton from '@/components/forms/job/delete-job-button';
import JobInfo from '@/components/job/info';
import { Badge } from '@/components/ui/badge';

import paths from '@/utils/navigation/paths';

interface JobCardProps {
  job: Job;
}

export default function JobCard(props: JobCardProps) {
  const { position, createdAt, company, id, mode, location, status } =
    props.job;

  const date = new Date(createdAt).toLocaleDateString();

  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{position}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={mode} />
        <JobInfo icon={<MapPin />} text={location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className='w-32  justify-center'>
          <JobInfo icon={<RadioTower className='w-4 h-4' />} text={status} />
        </Badge>
      </CardContent>
      <CardFooter className='flex gap-2'>
        <Button asChild size='sm'>
          <Link className='w-20' href={paths.jobById(id)}>
            edit
          </Link>
        </Button>
        <DeleteJobButton id={id} />
      </CardFooter>
    </Card>
  );
}

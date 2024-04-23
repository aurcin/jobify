'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getJobById, updateJob } from '@/actions/job';

import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Field from '@/components/ui-custom/form/field';
import Select from '@/components/ui-custom/form/select';

import { createAndEditJobSchema } from '@/utils/jobs/form-validation';
import paths from '@/utils/navigation/paths';

import { JobMode, JobStatus, type CreateAndEditJob } from '@/types/jobs';

interface EditJobFormProps {
  jobId: string;
}

export default function EditJobForm(props: EditJobFormProps) {
  const { jobId } = props;

  const { toast } = useToast();

  const router = useRouter();

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobById(jobId),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJob) => updateJob(jobId, values),
    onSuccess: data => {
      if (!data) {
        return toast({ description: 'An error occured' });
      }

      toast({ description: 'The Job was successfuly updated' });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      router.push(paths.jobs());
    },
  });

  const form = useForm<CreateAndEditJob>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJob) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        className='bg-muted p-8 rounded'
        onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className='capitalize font-semibold text-4xl mb-6'>Edit Job</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          <Field name='position' control={form.control} />

          <Field name='company' control={form.control} />

          <Field name='location' control={form.control} />

          <Select
            name='status'
            control={form.control}
            labelText='job status'
            items={Object.values(JobStatus)}
          />

          <Select
            name='mode'
            control={form.control}
            labelText='job mode'
            items={Object.values(JobMode)}
          />

          <Button
            type='submit'
            className='self-end capitalize'
            disabled={isPending}>
            {isPending ? 'updating...' : 'edit job'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

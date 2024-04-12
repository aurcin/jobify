'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Field from '@/components/ui-custom/form/field';
import Select from '@/components/ui-custom/form/select';
import { useToast } from '@/components/ui/use-toast';
import type { CreateAndEditJob } from '@/types/jobs';
import { JobMode, JobStatus } from '@/types/jobs';
import { createAndEditJobSchema } from '@/utils/jobs/form-validation';
import { createJob } from '@/actions/job';

export default function CreateJobForm() {
  const form = useForm<CreateAndEditJob>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJob) => createJob(values),
    onSuccess: data => {
      // we return null on error, so if we get null here we inform user
      if (!data) {
        return toast({
          description: 'Failed to add job',
        });
      }
      toast({ description: 'The job added successfully' });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      // don't reset selects
      form.reset();
      router.push('/jobs');
    },
  });

  function onSubmit(values: CreateAndEditJob) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted p-8 rounded'>
        <h2 className='capitalize font-semibold text-4xl mb-6'>add job</h2>

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
            {isPending ? 'loading' : 'create job'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

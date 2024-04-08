'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Field from '@/components/ui-custom/form/field';
import Select from '@/components/ui-custom/form/select';
import { CreateAndEditJobType, JobMode, JobStatus } from '@/types/jobs';
import { createAndEditJobSchema } from '@/utils/jobs/form-validation';

export default function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    console.log(values);
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

          <Button type='submit' className='self-end capitalize'>
            create job
          </Button>
        </div>
      </form>
    </Form>
  );
}

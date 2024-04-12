import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import CreateJobForm from '@/components/forms/job/create';

export default function AddJobPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateJobForm />
      </HydrationBoundary>
    </>
  );
}

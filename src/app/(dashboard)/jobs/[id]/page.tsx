import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import EditJobForm from '@/components/forms/job/edit-job';

import { getJobById } from '@/actions/job';

interface JobPageProps {
  params: { id: string };
}

export default async function JobPage(props: JobPageProps) {
  const { id } = props.params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['job', id],
    queryFn: () => getJobById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={id} />
    </HydrationBoundary>
  );
}

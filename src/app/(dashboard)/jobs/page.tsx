import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import SearchJobForm from '@/components/forms/job/search';
import JobList from '@/components/job/list';
import { getJobs } from '@/actions/job';

export default async function JobsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getJobs({}),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchJobForm />
        <JobList />
      </HydrationBoundary>
    </>
  );
}

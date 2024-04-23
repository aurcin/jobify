import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getChartsData, getStats } from '@/actions/stats';

import Stats from '@/components/stats/list';
import Charts from '@/components/charts';

export default async function StatsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsData(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stats />
      <Charts />
    </HydrationBoundary>
  );
}

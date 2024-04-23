'use client';
import { useQuery } from '@tanstack/react-query';

import { getStats } from '@/actions/stats';

import StatsCard from '@/components/stats/card';

export default function Stats() {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStats(),
  });

  return (
    <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <StatsCard title='pending jobs' value={data?.pending || 0} />
      <StatsCard title='interviews set' value={data?.interview || 0} />
      <StatsCard title='jobs declined' value={data?.declined || 0} />
    </div>
  );
}

import StatsFallback from '@/components/stats/fallback';

export default function Loading() {
  return (
    <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
      <StatsFallback />
      <StatsFallback />
      <StatsFallback />
    </div>
  );
}

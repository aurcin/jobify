'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface ButtonContainerProps {
  currentPage: number;
  totalPages: number;
}

export default function ButtonContainer(props: ButtonContainerProps) {
  const { currentPage, totalPages } = props;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  function handlePageChange(page: number) {
    const defaultParams = {
      search: searchParams.get('search') || '',
      'job-status': searchParams.get('job-status') || '',
      page: String(page),
    };

    let params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='flex  gap-x-2'>
      {pageButtons.map(page => {
        return (
          <Button
            key={page}
            size='icon'
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => handlePageChange(page)}>
            {page}
          </Button>
        );
      })}
    </div>
  );
}

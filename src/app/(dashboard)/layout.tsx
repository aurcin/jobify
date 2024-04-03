import type { Metadata } from 'next';

import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';

export const metadata: Metadata = {
  title: 'Jobify Dashboard',
  description: 'Jobify user dashboar to help You manage Your dream jobs!',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='grid lg:grid-cols-5'>
      <Sidebar />
      <div className='lg:col-span-4'>
        <Navbar />
        <div className='py-16 px-4 sm:px-8 lg:px-16'>{children}</div>
      </div>
    </main>
  );
}

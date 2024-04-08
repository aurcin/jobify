'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import links from '@/utils/navigation/main-navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const renderLinks = links.map(link => {
    const { href, icon, label } = link;
    return (
      <li key={href}>
        <Button asChild variant={pathname === href ? 'default' : 'outline'}>
          <Link href={href} className='flex items-center gap-x-2 w-full'>
            {icon}
            <span className='capitalize'>{label}</span>
          </Link>
        </Button>
      </li>
    );
  });

  return (
    <aside className='hidden lg:block lg:col-span-1 lg:min-h-screen py-4 px-8 bg-muted'>
      <Image
        className='mx-auto'
        src='/logo.svg'
        alt='logo'
        width={164}
        height={50}
        priority
      />
      <nav>
        <ul className='flex flex-col mt-20 gap-y-4'>{renderLinks}</ul>
      </nav>
    </aside>
  );
}

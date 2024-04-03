import { AlignLeft } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import links from '@/utils/links';

export default function LinksDropdown() {
  const renderLinks = links.map(link => {
    const { href, icon, label } = link;
    return (
      <DropdownMenuItem key={href}>
        <Link href={href} className='flex items-center gap-x-2'>
          {icon}
          <span className='capitalize'>{label}</span>
        </Link>
      </DropdownMenuItem>
    );
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant='outline' size='icon'>
          <AlignLeft />
          <span className='sr-only'>Toggle menu navigation</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-52 lg:hidden'
        align='start'
        sideOffset={25}>
        {renderLinks}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

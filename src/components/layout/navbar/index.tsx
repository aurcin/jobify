import LinksDropdown from '@/components/ui-custom/links-dropdown';
import ThemeToggle from '@/components/ui-custom/theme-toggler/index.tsx';
import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className='bg-muted py-4 sm:px-16 lg:px-24 flex items-center justify-between'>
      <div>
        <LinksDropdown />
      </div>
      <div className='flex items-center gap-x-4'>
        <ThemeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
  );
}

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import paths from '@/utils/navigation/paths';

export default function Home() {
  return (
    <main>
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6'>
        <Image src='/logo.svg' alt='logo' width={164} height={50} priority />
      </header>
      <section className='max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-28 grid lg:grid-cols-[1fr,400px] items-center'>
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            job <span className='text-primary'>tracking</span> app
          </h1>
          <p className='leading-loose max-w-md mt-4'>
            Unlock Your Potential with Jobify: Your Ultimate Job Application
            Companion. Effortlessly Manage Every Step of Your Job Search, from
            Applications to Interviews. Stay Ahead, Stay Informed, and Achieve
            Your Career Goals with Confidence.
          </p>
          <Button asChild className='mt-4'>
            <Link href={paths.addJob()}>Get Started</Link>
          </Button>
        </div>
        <Image
          src='/main.svg'
          alt='landing'
          width={874}
          height={771}
          priority
          className='hidden lg:block'
        />
      </section>
    </main>
  );
}

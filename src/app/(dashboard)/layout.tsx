// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Jobify Dev',
//   description: 'Job application tracking system for job hunters',
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

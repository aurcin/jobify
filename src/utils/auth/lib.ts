import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import paths from '@/utils/navigation/paths';

export function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) {
    return redirect(paths.home());
  }

  return userId;
}

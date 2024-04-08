import { authMiddleware } from '@clerk/nextjs';

import paths from '@/utils/navigation/paths';

// accessible routes without authentication
export default authMiddleware({
  publicRoutes: [paths.home()],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

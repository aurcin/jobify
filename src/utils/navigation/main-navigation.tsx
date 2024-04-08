import { AreaChart, Layers, AppWindow } from 'lucide-react';

import paths from '@/utils/navigation/paths';

const links: NavLink[] = [
  {
    href: paths.addJob(),
    label: 'add job',
    icon: <Layers />,
  },
  {
    href: paths.jobs(),
    label: 'all jobs',
    icon: <AppWindow />,
  },
  {
    href: paths.stats(),
    label: 'stats',
    icon: <AreaChart />,
  },
];

export default links;

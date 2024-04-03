'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children, ...otherProps } = props;
  return <NextThemesProvider {...otherProps}>{children}</NextThemesProvider>;
}

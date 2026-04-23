'use client';

import { useLenis } from '@/hooks/useLenis';
import { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}

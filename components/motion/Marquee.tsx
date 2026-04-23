'use client';

import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

export function Marquee({
  children,
  className,
  speed = 40,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-10 pr-10">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-10 pr-10">
          {children}
        </div>
      </div>
    </div>
  );
}

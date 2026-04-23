'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';
import { ReactNode, CSSProperties } from 'react';

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  return (
    // @ts-expect-error generic tag
    <Tag ref={ref} style={style} className={cn('reveal-init', isVisible && 'reveal-in', className)}>
      {children}
    </Tag>
  );
}

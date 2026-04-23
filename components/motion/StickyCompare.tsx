'use client';

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function StickyCompare({
  before,
  after,
  className,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  before: ReactNode;
  after: ReactNode;
  className?: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(50);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(5, Math.min(95, p)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('relative overflow-hidden rounded-3xl border border-white/10', className)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>
      <div
        aria-hidden
        className="absolute inset-y-0 w-px bg-white/60 shadow-glow-edge"
        style={{ left: `${pos}%` }}
      />
      <div
        className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/80 text-xs font-medium text-surface-void backdrop-blur"
        style={{ left: `${pos}%`, top: '50%' }}
      >
        ||
      </div>
      <div className="pointer-events-none absolute left-4 top-4 text-caption uppercase text-ink-200">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 text-caption uppercase text-ink-200">
        {afterLabel}
      </div>
    </div>
  );
}

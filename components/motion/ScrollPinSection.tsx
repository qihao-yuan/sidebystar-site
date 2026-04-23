'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: (progress: number, index: number) => ReactNode;
  panels: number;
  className?: string;
  panelClassName?: string;
};

export function ScrollPinSection({ children, panels, className, panelClassName }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      setActiveIndex(Math.min(panels - 1, Math.floor(p * panels)));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [panels]);

  return (
    <div ref={containerRef} className={cn('relative', className)} style={{ height: `${panels * 100}vh` }}>
      <div className={cn('sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden', panelClassName)}>
        {children(progress, activeIndex)}
      </div>
    </div>
  );
}

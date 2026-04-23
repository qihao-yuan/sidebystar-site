'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';

export function TextReveal({
  children,
  className,
  splitBy = 'word',
  stagger = 60,
}: {
  children: string;
  className?: string;
  splitBy?: 'word' | 'char';
  stagger?: number;
}) {
  const { ref, isVisible } = useReveal<HTMLSpanElement>({ threshold: 0.2 });

  const units = splitBy === 'word' ? children.split(/(\s+)/) : Array.from(children);

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {units.map((u, i) => {
        if (/^\s+$/.test(u)) return <span key={i}>{u}</span>;
        return (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <span
              className="inline-block will-change-transform"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
                opacity: isVisible ? 1 : 0,
                transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms, opacity 700ms ease-out ${i * stagger}ms`,
              }}
            >
              {u}
            </span>
          </span>
        );
      })}
    </span>
  );
}

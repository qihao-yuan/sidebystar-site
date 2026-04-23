import { cn } from '@/lib/cn';
import { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-3xl flex-col gap-5',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2 className="text-display-lg text-balance text-white">{title}</h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p className="text-body-lg text-ink-300 max-w-2xl">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

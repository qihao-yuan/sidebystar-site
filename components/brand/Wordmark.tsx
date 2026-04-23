import { cn } from '@/lib/cn';

export function Wordmark({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' };
  return (
    <span className={cn('font-display font-medium tracking-tight', sizes[size], className)}>
      <span className="relative">
        SidebyStar
        <span
          aria-hidden
          className="absolute -top-1 right-[-12px] h-1.5 w-1.5 rounded-full bg-brand-halo shadow-glow-edge"
        />
      </span>
    </span>
  );
}

import { cn } from '@/lib/cn';

export function NoiseLayer({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none fixed inset-0 z-[1] bg-noise mix-blend-overlay', className)}
    />
  );
}

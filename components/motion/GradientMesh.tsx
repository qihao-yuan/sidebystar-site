import { cn } from '@/lib/cn';

export function GradientMesh({ className, variant = 'hero' }: { className?: string; variant?: 'hero' | 'cta' | 'soft' }) {
  const base = 'pointer-events-none absolute inset-0 overflow-hidden';

  if (variant === 'hero') {
    return (
      <div aria-hidden className={cn(base, className)}>
        <div className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 65% at 78% 32%, rgba(72,82,101,0.24), transparent 68%), radial-gradient(ellipse 55% 50% at 18% 72%, rgba(111,91,72,0.10), transparent 72%)',
          }}
        />
      </div>
    );
  }

  if (variant === 'cta') {
    return (
      <div aria-hidden className={cn(base, className)}>
        <div className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 70% 50%, rgba(80,91,110,0.18), transparent 72%)',
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className={cn(base, className)}>
      <div className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 32% 30%, rgba(76,86,103,0.12), transparent 65%), radial-gradient(ellipse at 72% 72%, rgba(113,92,73,0.07), transparent 68%)',
        }}
      />
    </div>
  );
}

import { cn } from '@/lib/cn';

export function GradientMesh({ className, variant = 'hero' }: { className?: string; variant?: 'hero' | 'cta' | 'soft' }) {
  const base = 'pointer-events-none absolute inset-0 overflow-hidden';

  if (variant === 'hero') {
    return (
      <div aria-hidden className={cn(base, className)}>
        <div className="absolute left-1/2 top-[-20%] h-[120vh] w-[140vw] -translate-x-1/2 rounded-full opacity-80 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(75,107,251,0.55) 0%, rgba(177,156,244,0.25) 30%, transparent 60%)',
          }}
        />
        <div className="absolute right-[-10%] top-[10%] h-[80vh] w-[60vw] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(125,211,252,0.3), transparent 70%)' }}
        />
        <div className="absolute left-[-10%] bottom-[-10%] h-[70vh] w-[60vw] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(ellipse, rgba(177,156,244,0.3), transparent 70%)' }}
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
              'radial-gradient(ellipse at 50% 50%, rgba(75,107,251,0.4), rgba(177,156,244,0.15) 45%, transparent 75%)',
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
            'radial-gradient(ellipse at 30% 30%, rgba(75,107,251,0.18), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(177,156,244,0.12), transparent 60%)',
        }}
      />
    </div>
  );
}

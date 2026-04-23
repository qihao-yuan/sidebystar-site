import Image from 'next/image';
import { cn } from '@/lib/cn';

type Ratio = '16/9' | '4/3' | '1/1' | '3/4' | '21/9';
type Rounded = 'lg' | 'xl' | '3xl' | 'none';

const ratioClass: Record<Ratio, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '21/9': 'aspect-[21/9]',
};

const roundedClass: Record<Rounded, string> = {
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '3xl': 'rounded-3xl',
  none: '',
};

type Props = {
  src?: string;
  alt: string;
  ratio?: Ratio;
  label?: string;
  rounded?: Rounded;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function MediaPlaceholder({
  src,
  alt,
  ratio = '16/9',
  label,
  rounded = '3xl',
  className,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}: Props) {
  const base = cn(
    'relative overflow-hidden border border-white/[0.08]',
    ratioClass[ratio],
    roundedClass[rounded],
    className
  );

  if (src) {
    return (
      <div className={base}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        base,
        'bg-gradient-to-br from-surface-nebula via-surface-void to-surface-void'
      )}
      aria-label={alt}
      role="img"
    >
      <div className="pointer-events-none absolute inset-0 bg-mesh-hero opacity-25" />
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-20" />

      <span aria-hidden className="absolute left-3 top-3 h-2 w-2 rounded-full bg-brand-halo/60 shadow-glow-edge" />
      <span aria-hidden className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-halo/30" />
      <span aria-hidden className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-brand-halo/30" />
      <span aria-hidden className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-brand-halo/60 shadow-glow-edge" />

      {label && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400/80">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

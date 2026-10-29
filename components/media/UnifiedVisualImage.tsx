import Image from 'next/image';
import { cn } from '@/lib/cn';
import { visualAlt, type VisualAsset } from '@/content/product-visuals';

type Props = {
  visual: VisualAsset;
  locale: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

// Fill an existing relative frame. Shared panel crops isolate OEM options without
// producing new raster files or letting individual pages reshape a product.
export function UnifiedVisualImage({ visual, locale, sizes = '100vw', priority = false, className }: Props) {
  const image = (
    <Image src={visual.src} alt={visualAlt(visual, locale)} fill priority={priority}
      sizes={visual.panel === undefined ? sizes : '(min-width:1024px) 100vw, 150vw'}
      className={cn(visual.fit === 'contain' ? 'object-contain' : 'object-cover', visual.kind === 'software-demo' && 'bg-[#edf2f5] p-4', className)}
      style={{ objectPosition: visual.position ?? 'center' }} />
  );
  if (visual.panel === undefined) return image;
  return <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#edf2f5]" data-visual-panel={visual.panel}>
    {/* Preserve the complete portrait panel inside a landscape page frame. */}
    <div className="relative h-full max-w-full overflow-hidden" style={{ aspectRatio: '1 / 2' }}>
      <div className="absolute inset-y-0" style={{ left: `${visual.panel * -100}%`, width: '300%' }}>{image}</div>
    </div>
  </div>;
}

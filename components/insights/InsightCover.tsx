import Image from 'next/image';

export function InsightCover({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 720px"
      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
    />
  );
}

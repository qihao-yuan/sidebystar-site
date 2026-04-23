'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/cn';

export function LangSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === 'zh-CN' ? 'en' : 'zh-CN';
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch language"
      className={cn(
        'flex h-8 items-center gap-1 rounded-pill border border-white/10 bg-white/[0.04] px-3 text-caption text-ink-200 backdrop-blur transition-colors hover:border-white/25 hover:text-white',
        className
      )}
    >
      <span className={cn(locale === 'zh-CN' ? 'text-white' : 'text-ink-400')}>中</span>
      <span className="mx-0.5 text-ink-500">/</span>
      <span className={cn(locale === 'en' ? 'text-white' : 'text-ink-400')}>EN</span>
    </button>
  );
}

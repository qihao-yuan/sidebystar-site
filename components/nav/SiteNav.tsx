'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Wordmark } from '@/components/brand/Wordmark';
import { LangSwitch } from './LangSwitch';

export function SiteNav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { href: '/solutions', label: t('solutions') },
    { href: '/intelligence', label: t('intelligence') },
    { href: '/products', label: t('products') },
    { href: '/platform', label: t('platform') },
    { href: '/trust', label: t('trust') },
    { href: '/research', label: t('research') },
    { href: '/developers', label: t('developers') },
    { href: '/cases', label: t('cases') },
    { href: '/company/about', label: t('company') },
  ] as const;

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-apple-out',
        scrolled ? 'backdrop-blur-xl bg-surface-void/70 border-b border-white/5' : 'bg-transparent'
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center text-white">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="primary">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href as any}
              className="rounded-pill px-3 py-1.5 text-sm text-ink-200 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <Link href="/contact" className="btn-primary h-9 px-4 py-0 text-[13px]">
            {t('demoRequest')}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-white/10 text-ink-100 lg:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/[0.04]"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-brand-aurora via-brand-halo to-brand-stardust shadow-[0_0_12px_rgba(125,211,252,0.6)] transition-transform duration-200 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-surface-void/95 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-ink-200 hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-3">
              <LangSwitch />
              <Link href="/contact" className="btn-primary h-9 px-4 py-0 text-[13px]" onClick={() => setMobileOpen(false)}>
                {t('demoRequest')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SiteNav } from '@/components/nav/SiteNav';
import { SiteFooter } from '@/components/footer/SiteFooter';
import { ClientProviders } from '@/components/motion/ClientProviders';
import { NoiseLayer } from '@/components/motion/NoiseLayer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClientProviders>
        <div className="relative min-h-screen bg-surface-void">
          <NoiseLayer />
          <SiteNav />
          <main className="relative z-10">{children}</main>
          <SiteFooter />
        </div>
      </ClientProviders>
    </NextIntlClientProvider>
  );
}

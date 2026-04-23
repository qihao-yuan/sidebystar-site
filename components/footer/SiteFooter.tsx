import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Wordmark } from '@/components/brand/Wordmark';
import { LangSwitch } from '@/components/nav/LangSwitch';

export function SiteFooter() {
  const t = useTranslations('footer');
  const n = useTranslations('nav');
  const sol = useTranslations('solutions.items');
  const pilotT = useTranslations('pilot');
  const privacyT = useTranslations('privacy');

  return (
    <footer className="relative z-10 border-t border-white/5 bg-surface-void">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Link href="/"><Wordmark size="lg" /></Link>
            <p className="mt-4 max-w-sm text-caption text-ink-300">{t('subscribeHint')}</p>
            <form className="mt-3 flex max-w-sm items-center gap-2" aria-label="subscribe">
              <input
                type="email"
                required
                placeholder={t('subscribePlaceholder')}
                className="h-10 flex-1 rounded-pill border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-ink-400 focus:border-brand-halo/50 focus:outline-none"
              />
              <button type="submit" className="btn-primary h-10 px-4 py-0 text-[13px]">
                {t('subscribeBtn')}
              </button>
            </form>
            <div className="mt-6"><LangSwitch /></div>
          </div>

          <div>
            <h4 className="eyebrow mb-4">{t('scenarios')}</h4>
            <ul className="space-y-2.5 text-sm text-ink-200">
              <li><Link className="hover:text-white" href="/solutions/elderly-care">{sol('elderlyCare.title')}</Link></li>
              <li><Link className="hover:text-white" href="/solutions/community-care">{sol('communityCare.title')}</Link></li>
              <li><Link className="hover:text-white" href="/solutions/clinical-assist">{sol('clinicalAssist.title')}</Link></li>
              <li><Link className="hover:text-white" href="/solutions/smart-home">{sol('smartHome.title')}</Link></li>
              <li><Link className="hover:text-white" href="/solutions/smart-room">{sol('smartRoom.title')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">{t('platformCol')}</h4>
            <ul className="space-y-2.5 text-sm text-ink-200">
              <li><Link className="hover:text-white" href={'/intelligence' as any}>{n('intelligence')}</Link></li>
              <li><Link className="hover:text-white" href="/products">{n('products')}</Link></li>
              <li><Link className="hover:text-white" href="/platform">{n('platform')}</Link></li>
              <li><Link className="hover:text-white" href="/developers">{n('developers')}</Link></li>
              <li><Link className="hover:text-white" href="/research">{n('research')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">{t('trustCol')}</h4>
            <ul className="space-y-2.5 text-sm text-ink-200">
              <li><Link className="hover:text-white" href="/trust">{n('trust')}</Link></li>
              <li><Link className="hover:text-white" href="/cases">{n('cases')}</Link></li>
              <li><Link className="hover:text-white" href="/pilot">{pilotT('title')}</Link></li>
              <li><Link className="hover:text-white" href="/privacy">{privacyT('title')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="divider-soft mt-12" />

        <div className="mt-8 flex flex-col justify-between gap-3 text-caption text-ink-400 md:flex-row">
          <div className="space-y-1">
            <p>{t('address')}</p>
            <p>{t('phone')}  ·  {t('email')}</p>
          </div>
          <div className="space-y-1 md:text-right">
            <p>&copy; {t('copyright')}</p>
            <p>
              <a className="hover:text-white" href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">{t('icp')}</a>
              <span className="mx-2 text-ink-600">|</span>
              <a className="hover:text-white" href="https://beian.mps.gov.cn/#/query/webSearch?code=33010902004609" target="_blank" rel="noreferrer">{t('police')}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

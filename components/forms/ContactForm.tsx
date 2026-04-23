'use client';

import { FormEvent, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRight, Check, Loader2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export function ContactForm({ defaultScenario }: { defaultScenario?: string } = {}) {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      org: String(fd.get('org') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      scenario: String(fd.get('scenario') || ''),
      message: String(fd.get('message') || ''),
      website: String(fd.get('website') || ''),
      locale,
    };

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setStatus('ok');
        return;
      }

      const code = data.error || (res.status === 429 ? 'rate_limited' : 'send_failed');
      const key = ['missing_fields', 'bad_email', 'too_long', 'rate_limited'].includes(code)
        ? (code as 'missing_fields' | 'bad_email' | 'too_long' | 'rate_limited')
        : 'send_failed';
      setErrorMsg(t(`errors.${key}`));
      setStatus('error');
    } catch {
      setErrorMsg(t('errors.network'));
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-state-success/15 text-state-success">
          <Check size={24} />
        </div>
        <p className="text-body-lg text-white">{t('ok')}</p>
      </div>
    );
  }

  const base =
    'h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-ink-500 focus:border-brand-halo/50 focus:outline-none';
  const sending = status === 'sending';

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2" noValidate>
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('name')}</span>
        <input required name="name" maxLength={100} disabled={sending} className={base} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('org')}</span>
        <input required name="org" maxLength={200} disabled={sending} className={base} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('email')}</span>
        <input required type="email" name="email" maxLength={200} disabled={sending} className={base} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('phone')}</span>
        <input name="phone" maxLength={50} disabled={sending} className={base} />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-caption text-ink-300">{t('scenario')}</span>
        <select
          name="scenario"
          defaultValue={defaultScenario ?? ''}
          disabled={sending}
          className={`${base} appearance-none [color-scheme:dark]`}
        >
          <option value="" className="bg-ink-900 text-white">
            {t('scenarioPlaceholder')}
          </option>
          {(['elderly-care', 'community-care', 'clinical-assist', 'smart-home', 'smart-room'] as const).map(
            (key) => (
              <option key={key} value={key} className="bg-ink-900 text-white">
                {t(`scenarios.${key}`)}
              </option>
            )
          )}
        </select>
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-caption text-ink-300">{t('message')}</span>
        <textarea
          name="message"
          rows={5}
          maxLength={5000}
          disabled={sending}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder:text-ink-500 focus:border-brand-halo/50 focus:outline-none"
        />
      </label>

      {/* Honeypot: hidden from real users, bots tend to fill everything.
          If this field comes back non-empty, the API silently drops the submission. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="md:col-span-2 flex flex-col gap-3">
        <MagneticButton variant="primary" disabled={sending}>
          {sending ? (
            <>
              <Loader2 size={16} className="animate-spin" /> {t('sending')}
            </>
          ) : (
            <>
              {t('submit')} <ArrowRight size={16} />
            </>
          )}
        </MagneticButton>
        {status === 'error' && (
          <p role="alert" className="text-caption text-state-error">
            {errorMsg}
          </p>
        )}
      </div>
    </form>
  );
}

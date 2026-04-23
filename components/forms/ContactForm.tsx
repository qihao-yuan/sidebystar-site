'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { ArrowRight, Check } from 'lucide-react';

export function ContactForm({ defaultScenario }: { defaultScenario?: string } = {}) {
  const t = useTranslations('contact');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-state-success/15 text-state-success">
          <Check size={24} />
        </div>
        <p className="text-body-lg text-white">{t('ok')}</p>
      </div>
    );
  }

  const base = 'h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-ink-500 focus:border-brand-halo/50 focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('name')}</span>
        <input required name="name" className={base} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('org')}</span>
        <input required name="org" className={base} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('email')}</span>
        <input required type="email" name="email" className={base} />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-caption text-ink-300">{t('phone')}</span>
        <input name="phone" className={base} />
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-caption text-ink-300">{t('scenario')}</span>
        <select name="scenario" defaultValue={defaultScenario} className={base}>
          <option value="">--</option>
          <option value="elderly-care">Elderly Care</option>
          <option value="community-care">Community Care</option>
          <option value="clinical-assist">Clinical Assist</option>
          <option value="smart-home">Smart Home</option>
          <option value="smart-room">Smart Room</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-caption text-ink-300">{t('message')}</span>
        <textarea
          name="message"
          rows={5}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder:text-ink-500 focus:border-brand-halo/50 focus:outline-none"
        />
      </label>
      <div className="md:col-span-2">
        <MagneticButton variant="primary">
          {t('submit')} <ArrowRight size={16} />
        </MagneticButton>
      </div>
    </form>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Bed, Cpu, UserRound, Users } from 'lucide-react';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';

type Role = 'resident' | 'system' | 'staff' | 'family';

const ROLE_LABEL: Record<Role, { zh: string; en: string }> = {
  resident: { zh: '老人', en: 'Resident' },
  system: { zh: '系统', en: 'System' },
  staff: { zh: '护理员', en: 'Staff' },
  family: { zh: '家属 / 管理', en: 'Family / Mgmt' },
};

const ROLE_ICON: Record<Role, typeof Bed> = {
  resident: Bed,
  system: Cpu,
  staff: UserRound,
  family: Users,
};

type Step = {
  t: string;
  role: Role;
  zh: string;
  en: string;
};

const STEPS: Step[] = [
  {
    t: '02:13',
    role: 'resident',
    zh: '老人离床',
    en: 'Resident leaves the bed',
  },
  {
    t: '02:13',
    role: 'system',
    zh: '启动路径照明，进入离床观察',
    en: 'Pathway lighting starts; bed-exit monitoring begins',
  },
  {
    t: '02:24',
    role: 'system',
    zh: '检测到低位静止，事件升级并派发夜班工单',
    en: 'Low-position stillness detected; event escalated and dispatched',
  },
  {
    t: '02:31',
    role: 'staff',
    zh: '护理员完成现场处理并关闭工单',
    en: 'On-duty staff resolves the event and closes the ticket',
  },
  {
    t: '07:30',
    role: 'family',
    zh: '事件摘要按权限同步至交接班与家属端',
    en: 'The event summary is shared with shift handoff and family views by permission',
  },
];

export function HomeNightCare() {
  const t = useTranslations('home.nightCare');
  const locale = useLocale();
  const isZh = locale === 'zh-CN';

  return (
    <section id="night-care" className="relative py-section-lg">
      <div className="container-page">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} align="left" />

        <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula/40">
          <div className="border-b border-white/5 px-6 py-4 text-caption text-ink-400 md:px-10">
            {isZh
              ? '夜间离床处置流程示例'
              : 'Example nighttime bed-exit workflow'}
          </div>

          <ol className="divide-y divide-white/5">
            {STEPS.map((s, i) => {
              const RoleIcon = ROLE_ICON[s.role];
              return (
                <Reveal key={i} delay={i * 40}>
                  <li className="grid grid-cols-[64px_1fr] gap-4 px-6 py-5 md:grid-cols-[88px_120px_1fr] md:gap-6 md:px-10">
                    <div className="font-mono text-caption text-brand-halo">{s.t}</div>
                    <div className="hidden items-center gap-2 md:flex">
                      <RoleIcon size={14} className="text-ink-400" />
                      <span className="text-caption text-ink-400">{isZh ? ROLE_LABEL[s.role].zh : ROLE_LABEL[s.role].en}</span>
                    </div>
                    <div className="text-body text-white">
                      <div className="mb-1 inline-flex items-center gap-2 md:hidden">
                        <RoleIcon size={12} className="text-ink-400" />
                        <span className="text-caption text-ink-400">{isZh ? ROLE_LABEL[s.role].zh : ROLE_LABEL[s.role].en}</span>
                      </div>
                      {isZh ? s.zh : s.en}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>

        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/solutions/elderly-care" className="btn-primary">
            {t('ctaPrimary')} <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-ghost">
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}

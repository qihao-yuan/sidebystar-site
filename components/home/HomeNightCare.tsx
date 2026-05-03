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
    zh: '判定为低风险观察, 走廊灯升到 10% 柔光',
    en: 'Marked low-risk watch; hallway light raised to 10% warm',
  },
  {
    t: '02:23',
    role: 'system',
    zh: '10 分钟未归床, 卫生间未检测到活动',
    en: '10 min without return; no activity from bathroom sensor',
  },
  {
    t: '02:24',
    role: 'system',
    zh: '毫米波检测到床边低位静止, 升级为中高风险',
    en: 'mmWave detects low-posture stillness near bed; escalates to medium-high',
  },
  {
    t: '02:25',
    role: 'staff',
    zh: '自动派单给夜班护理员, 5 分钟未接单则升级主管',
    en: 'Auto-dispatched to on-duty staff; escalates to supervisor after 5 min',
  },
  {
    t: '02:31',
    role: 'staff',
    zh: '现场处理完毕, 标记"协助起身, 已恢复"',
    en: 'Handled on-site; marked "assisted up, recovered"',
  },
  {
    t: '02:32',
    role: 'system',
    zh: '事件摘要写入本地审计账本, 不可篡改',
    en: 'Incident summary written to the local audit ledger, append-only',
  },
  {
    t: '06:00',
    role: 'staff',
    zh: '交接班自动带出: 昨夜 02:24 中高风险事件已闭环',
    en: 'Shift handoff auto-includes: last night 02:24 medium-high incident, closed',
  },
  {
    t: '07:30',
    role: 'family',
    zh: '家属端摘要可见: 父亲昨夜离床一次, 已由值班照护员协助, 状态正常',
    en: 'Family summary visible: father left bed once last night, assisted by on-duty staff, status normal',
  },
  {
    t: '08:00',
    role: 'family',
    zh: '管理看板: 夜班响应中位数 6 分 12 秒, 误报 0',
    en: 'Ops dashboard: median night response 6:12, false alarms 0',
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
              ? '一份真实夜班的事件流(示例)。同一份记录, 同时被老人、护理员、家属和管理者按各自的视角看到。'
              : 'A sample event stream from one real night shift. The same record reaches the resident, staff, family and operations team -- each from their own view.'}
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

          <div className="border-t border-white/5 px-6 py-5 text-caption text-ink-400 md:px-10">
            {isZh
              ? '这一段不是 AI 控制设备的展示, 而是 AI 把传感器告警升级为空间事件, 并把响应、记录、交接、沟通做成一份可验收的闭环。'
              : 'This is not a demo of AI controlling devices. It is AI lifting raw sensor alerts into spatial events, and turning response, record, handoff and communication into one acceptable loop.'}
          </div>
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

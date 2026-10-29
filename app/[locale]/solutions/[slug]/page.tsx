import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getSolution, SolutionSlug } from '@/content/solutions';
import { customerImages, roomApplications } from '@/content/customer-experience';
import { Reveal } from '@/components/motion/Reveal';
import { GradientMesh } from '@/components/motion/GradientMesh';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { MediaPlaceholder } from '@/components/media/MediaPlaceholder';
import { ArrowRight, Package } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const slugs: SolutionSlug[] = ['elderly-care', 'community-care', 'clinical-assist', 'smart-home', 'smart-room'];
  return slugs.flatMap((slug) => [{ locale: 'zh-CN', slug }, { locale: 'en', slug }]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'zh-CN' | 'en'; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sol = getSolution(slug as SolutionSlug);
  if (!sol) return {};
  const t = await getTranslations({ locale, namespace: 'solutions.items' });
  return buildMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: t(`${sol.titleKey}.title`),
    description: t(`${sol.titleKey}.brief`),
  });
}

export default async function SolutionDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const sol = getSolution(slug as SolutionSlug);
  if (!sol || sol.planned || !sol.buyer || !sol.problems || !sol.kpis || !sol.pilot || !sol.sku || !sol.bundle) {
    notFound();
  }
  setRequestLocale(locale);
  const items = await getTranslations('solutions.items');
  const isZh = locale === 'zh-CN';
  const pick = (obj: { zh: string; en: string }) => (isZh ? obj.zh : obj.en);

  const buyer = sol.buyer!;
  const problems = sol.problems!;
  const kpis = sol.kpis!;
  const pilot = sol.pilot!;
  const sku = sol.sku!;
  const bundle = sol.bundle!;
  const hasWorkflow = Boolean(sol.workflow?.length);
  const Icon = sol.icon;
  const heroImage = sol.group === 'health' ? customerImages.bathroom : slug === 'smart-room' ? customerImages.host : customerImages.family;

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden pb-section pt-32">
        <GradientMesh variant="soft" />
        <div className="container-page relative">
          <Link href="/solutions" className="btn-link mb-8">
            <ArrowRight size={14} className="rotate-180" /> {isZh ? '返回场景' : 'Back'}
          </Link>
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-end">
            <div className="flex flex-col gap-6">
              <span className="eyebrow">{isZh ? '按现场配置的方案' : 'A site-specific configuration'}</span>
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                  <Icon size={32} className="text-brand-halo" />
                </div>
                <h1 className="text-display-xl text-white">{items(`${sol.titleKey}.title`)}</h1>
              </div>
              <p className="max-w-3xl text-body-lg text-ink-300">{items(`${sol.titleKey}.brief`)}</p>
            </div>
            <Reveal>
              <MediaPlaceholder
                src={heroImage}
                alt={items(`${sol.titleKey}.title`)}
                ratio="16/9"
                rounded="xl"
                priority
              />
              <p className="mt-3 text-caption text-ink-400">{isZh ? '设计效果图 · 实物及现场适配待验证' : 'Design visualization · physical and site validation pending'}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {['smart-home', 'smart-room', 'elderly-care'].includes(slug) ? (
        <section className="border-y border-white/5 bg-white/[0.015] py-section">
          <div className="container-page">
            <span className="eyebrow">{isZh ? '按位置选择设备' : 'Choose devices around the room'}</span>
            <h2 className="mt-4 text-display-lg text-white">{isZh ? '从每天会遇到的问题开始' : 'Start with the needs of an ordinary day'}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {roomApplications.filter((x) => slug !== 'elderly-care' || ['bathroom', 'bedside'].includes(x.id)).map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <MediaPlaceholder src={item.id === 'kitchen' ? customerImages.kitchen : item.id === 'bathroom' ? customerImages.bathroom : item.id === 'tv' ? customerImages.host : customerImages.extensions}
                    alt={pick(item.title)} ratio="16/9" rounded="none" imageClassName={['bedside', 'entrance', 'curtains'].includes(item.id) ? 'object-contain bg-[#f4f6f8]' : undefined} />
                  <div className="p-6"><h3 className="text-display-sm text-white">{pick(item.title)}</h3><p className="mt-3 text-body text-ink-300">{pick(item.body)}</p>
                    <p className="mt-4 text-caption text-ink-500">{isZh ? (['bedside', 'entrance', 'curtains'].includes(item.id) ? '原厂选配安装示意 · 按型号确认适配' : '产品设计方向 · 待实物验证') : (['bedside', 'entrance', 'curtains'].includes(item.id) ? 'OEM installation illustration · integration verified by model' : 'Product design direction · physical validation pending')}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-6"><Link className="btn-link" href="/experience#software">{isZh ? '查看助手实际操作' : 'See the assistant in use'} <ArrowRight size={16} /></Link><Link className="btn-link" href="/experience#handbook">{isZh ? '下载产品手册' : 'Download the product handbook'} <ArrowRight size={16} /></Link></div>
          </div>
        </section>
      ) : null}

      {/* Section 01 · Bundle Narrative */}
      <section className="py-section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start">
            <div>
              <Reveal>
                <span className="eyebrow">01 · {isZh ? '方案范围' : 'Solution scope'}</span>
              </Reveal>
              <h2 className="mt-5 text-display-lg text-white">{pick(bundle.headline)}</h2>
              {bundle.rhythm ? (
                <p className="mt-6 text-body-lg text-ink-200">{pick(bundle.rhythm)}</p>
              ) : null}
              {problems && problems.length > 0 ? (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="text-caption uppercase tracking-wide text-ink-500">
                    {isZh ? '适用问题' : 'Applicable problems'}
                  </div>
                  <ul className="mt-4 space-y-2 text-body text-ink-200">
                    {problems.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand-halo">·</span>
                        <span>{pick(p)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {sol.architecture && sol.architecture.length > 0 ? (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="text-caption uppercase tracking-wide text-ink-500">
                    {isZh ? '部署结构' : 'Deployment structure'}
                  </div>
                  <ol className="mt-4 space-y-3">
                    {sol.architecture.map((item, i) => (
                      <li key={i} className="grid grid-cols-[2rem_1fr] gap-3 text-body text-ink-200">
                        <span className="font-mono text-caption text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                        <span>{pick(item)}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </div>

            <div>
              <Reveal delay={120}>
                <div className="flex items-center gap-2 text-caption uppercase tracking-wide text-ink-500">
                  <Package size={14} />
                  {isZh ? '交付组成' : 'Delivery components'}
                </div>
              </Reveal>
              <div className="mt-4 grid gap-3">
                {bundle.items.map((it, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-caption text-ink-300">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-body-lg text-white">{pick(it)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {sol.workflow && sol.workflow.length > 0 ? (
        <section className="border-y border-white/5 bg-white/[0.015] py-section-lg">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">02 · {isZh ? '夜间照护闭环' : 'Nighttime care loop'}</span>
              <h2 className="mt-4 max-w-3xl text-display-lg text-white">
                {isZh ? '从离床识别到交班复核' : 'From bed-exit detection to shift review'}
              </h2>
              <p className="mt-4 max-w-3xl text-body text-ink-300">
                {isZh
                  ? '每一步都包含触发条件、执行动作和留存记录。系统完成识别与派发，最终处置由护理人员确认。'
                  : 'Each step defines its trigger, action and retained record. The system detects and dispatches; care staff confirm the final outcome.'}
              </p>
            </Reveal>

            <ol className="mt-12 overflow-hidden rounded-2xl border border-white/10">
              {sol.workflow.map((step, i) => (
                <li
                  key={i}
                  className="grid gap-4 border-b border-white/10 bg-surface-void/40 p-6 last:border-b-0 md:grid-cols-[3rem_1fr_1.35fr_1fr]"
                >
                  <span className="font-mono text-caption text-brand-halo">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-body-lg text-white">{pick(step.stage)}</h3>
                    <p className="mt-2 text-caption text-ink-400">{pick(step.condition)}</p>
                  </div>
                  <div>
                    <div className="text-caption uppercase tracking-wide text-ink-500">{isZh ? '系统动作' : 'System action'}</div>
                    <p className="mt-2 text-body text-ink-200">{pick(step.action)}</p>
                  </div>
                  <div>
                    <div className="text-caption uppercase tracking-wide text-ink-500">{isZh ? '留存记录' : 'Record'}</div>
                    <p className="mt-2 text-body text-ink-200">{pick(step.record)}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-5 lg:grid-cols-[3fr_2fr]">
              <div className="grid gap-4 md:grid-cols-3">
                {sol.safeguards?.map((item) => (
                  <div key={item.title.en} className="card-vision">
                    <h3 className="text-body-lg text-white">{pick(item.title)}</h3>
                    <p className="mt-3 text-caption text-ink-300">{pick(item.body)}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-caption uppercase tracking-wide text-ink-500">
                  {isZh ? '试点验收项' : 'Pilot acceptance'}
                </div>
                <ul className="mt-4 space-y-3">
                  {sol.acceptance?.map((item, i) => (
                    <li key={i} className="flex gap-3 text-caption text-ink-200">
                      <span className="font-mono text-brand-halo">{String(i + 1).padStart(2, '0')}</span>
                      <span>{pick(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Deployment meta */}
      <section className="py-section">
        <div className="container-page">
          <Reveal>
            <span className="eyebrow">{hasWorkflow ? '03' : '02'} · {isZh ? '部署信息' : 'Deployment information'}</span>
          </Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="card-vision">
              <div className="text-caption uppercase tracking-wide text-ink-500">
                {isZh ? '适用对象' : 'For'}
              </div>
              <p className="mt-4 text-body-lg text-white">{pick(buyer)}</p>
            </div>

            {kpis.length > 0 ? (
              <div className="card-vision">
                <div className="text-caption uppercase tracking-wide text-ink-500">
                  {isZh ? '试点验收目标' : 'Pilot acceptance targets'}
                </div>
                <p className="mt-1 text-caption text-ink-500">
                  {isZh
                    ? '与试点机构共定的目标值, 非已实现数据。'
                    : 'Targets set with the pilot site -- not realized metrics.'}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {kpis.slice(0, 4).map((k, i) => (
                    <div key={i}>
                      <div className="font-display text-display-sm text-white">{k.value}</div>
                      <div className="mt-1 text-caption text-ink-400">{pick(k.label)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="card-vision">
              <div className="text-caption uppercase tracking-wide text-ink-500">
                {isZh ? '试点周期与规模' : 'Pilot timing & scale'}
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <div className="font-display text-display-sm text-white">{pilot.weeks === 'project' ? (isZh ? '按项目确认' : 'Scoped per project') : pilot.weeks}</div>
                {pilot.weeks !== 'project' ? <div className="text-body text-ink-300">{isZh ? '周' : 'weeks'}</div> : null}
              </div>
              <p className="mt-3 text-body text-ink-300">{pick(pilot.scale)}</p>
              <p className="mt-4 text-caption text-ink-500">
                {isZh ? '对应产品 ' : 'Product '}
                <span className="text-ink-200">{pick(sku)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-lg">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface-nebula p-10 md:p-16">
            <GradientMesh variant="cta" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="eyebrow">{hasWorkflow ? '04' : '03'} · {isZh ? '项目评估' : 'Project assessment'}</span>
                <h3 className="mt-3 text-display-lg text-white">
                  {isZh ? '确认现场条件与首期部署范围' : 'Confirm site conditions and initial deployment scope.'}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="/pilot" variant="primary">
                  {isZh ? '申请试点' : 'Apply for Pilot'} <ArrowRight size={16} />
                </MagneticButton>
                <MagneticButton href="/contact" variant="ghost">
                  {isZh ? '联系销售' : 'Contact Sales'}
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

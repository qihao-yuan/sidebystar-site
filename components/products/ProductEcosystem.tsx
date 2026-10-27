import Image from 'next/image';
import { Bed, Bell, CircuitBoard, Network, Radar, SlidersHorizontal } from 'lucide-react';

const peripherals = [
  {
    icon: Radar,
    image: '/product/peripherals/room-sensor.jpg',
    name: { zh: '循星空间感知器', en: 'SidebyStar Room Sensor' },
    category: { zh: '环境与活动感知', en: 'Room sensing' },
    summary: {
      zh: '采集房间状态、活动变化与环境信息，为现场规则提供稳定输入。',
      en: 'Provides room-state, activity and environmental input for on-site rules.',
    },
    boundary: {
      zh: '采集范围、安装位置与留存策略按项目配置。',
      en: 'Sensing scope, placement and retention follow project configuration.',
    },
  },
  {
    icon: Bed,
    image: '/product/peripherals/bed-sensor.jpg',
    name: { zh: '循星离床感知器', en: 'SidebyStar Bed Sensor' },
    category: { zh: '在床与离床状态', en: 'Bedside sensing' },
    summary: {
      zh: '提供在床、离床与回床状态，配合照护规则形成事件记录。',
      en: 'Provides occupancy, bed-exit and return states for care workflows.',
    },
    boundary: {
      zh: '用于空间状态识别，不作为医疗诊断或生命体征监护设备。',
      en: 'Supports room-state detection and is not a medical monitoring device.',
    },
  },
  {
    icon: SlidersHorizontal,
    image: '/product/peripherals/wall-controller.jpg',
    name: { zh: '循星场景面板', en: 'SidebyStar Scene Panel' },
    category: { zh: '灯光与场景控制', en: 'Wall control' },
    summary: {
      zh: '以旋钮和实体按键完成常用调节、场景切换与状态确认。',
      en: 'Combines a dial and physical keys for everyday control and confirmation.',
    },
    boundary: {
      zh: '基础控制保留现场入口，不以公网连接为前提。',
      en: 'Core controls retain an on-site interface without relying on public internet.',
    },
  },
  {
    icon: Bell,
    image: '/product/peripherals/care-button.jpg',
    name: { zh: '循星床旁呼叫器', en: 'SidebyStar Care Button' },
    category: { zh: '护理呼叫', en: 'Bedside call' },
    summary: {
      zh: '发起护理呼叫，并反馈已送达、已接单和已处理状态。',
      en: 'Call, delivery feedback, arrival confirmation and closure.',
    },
    boundary: {
      zh: '取得相应认证和验收前，不替代机构原有的紧急呼叫系统。',
      en: 'Does not replace a regulated emergency-call system without certification.',
    },
  },
  {
    icon: Network,
    image: '/product/peripherals/protocol-bridge.jpg',
    name: { zh: '循星设备接入网关', en: 'SidebyStar Device Gateway' },
    category: { zh: '设备接入', en: 'Protocol access' },
    summary: {
      zh: '连接项目范围内的现场设备，统一设备状态与控制接口。',
      en: 'Connects approved site devices through a consistent state and control interface.',
    },
    boundary: {
      zh: '是否兼容以具体设备型号和固件版本的实测结果为准。',
      en: 'Compatibility follows the tested model and firmware list.',
    },
  },
  {
    icon: CircuitBoard,
    image: '/product/peripherals/din-actuator.jpg',
    name: { zh: '循星回路控制器', en: 'SidebyStar Circuit Controller' },
    category: { zh: '照明与设备回路', en: 'DIN-rail actuation' },
    summary: {
      zh: '安装在配电箱内，控制照明、窗帘、暖通和其他低压联动回路。',
      en: 'Lighting, curtain, HVAC and dry-contact control.',
    },
    boundary: {
      zh: '采用符合项目要求的认证模块，不接管消防和生命安全系统。',
      en: 'Uses certified modules and excludes fire and life-safety systems.',
    },
  },
];

const bundles = [
  {
    title: { zh: '住宅入门套装', en: 'Residential Starter' },
    scope: { zh: '单户住宅', en: 'Individual home' },
    items: {
      zh: 'Home Box · 空间感知器 · 场景面板 · 设备接入网关',
      en: 'Home Box · Room Sensor · Scene Panel · Device Gateway',
    },
  },
  {
    title: { zh: '照护房间套装', en: 'Care Room' },
    scope: { zh: '单一照护房间', en: 'Single care room' },
    items: {
      zh: 'Community Kit · 空间感知器 · 离床感知器 · 床旁呼叫器',
      en: 'Community Gateway · Room Sensor · Bed Sensor · Care Button',
    },
  },
  {
    title: { zh: '机构部署套装', en: 'Facility Deployment' },
    scope: { zh: '楼层与机构', en: 'Floor and facility' },
    items: {
      zh: 'Enterprise Stack · 社区网关 · 设备接入网关 · 回路控制器',
      en: 'Enterprise Stack · Community Gateway · Device Gateway · Circuit Controller',
    },
  },
];

export function ProductEcosystem({ locale }: { locale: string }) {
  const isZh = locale === 'zh-CN';
  const pick = (value: { zh: string; en: string }) => (isZh ? value.zh : value.en);

  return (
    <section className="border-y border-white/5 bg-white/[0.015] py-section-lg">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-end">
          <div>
            <span className="eyebrow">{isZh ? '配套硬件' : 'Peripheral hardware'}</span>
            <h2 className="mt-4 text-display-lg text-white">
              {isZh ? '感知、交互与设备接入' : 'Sensing, interaction and device access'}
            </h2>
          </div>
          <p className="max-w-2xl text-body text-ink-300">
            {isZh
              ? '配套设备与计算产品共同组成完整部署。系统按照空间条件、设备清单和运行要求进行配置。'
              : 'Peripheral devices work with the compute products as one deployment, configured for the site, device inventory and operating requirements.'}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {peripherals.map((item) => (
            <article key={item.name.en} className="overflow-hidden rounded-2xl border border-white/10 bg-surface-void">
              <div className="relative aspect-[4/3] bg-[#d8d1c5]">
                <Image
                  src={item.image}
                  alt={pick(item.name)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
              </div>
              <div className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <item.icon size={19} className="text-brand-halo" />
                </div>
                <h3 className="mt-5 text-display-sm text-white">{pick(item.name)}</h3>
                <div className="mt-1 text-caption text-ink-500">{pick(item.category)}</div>
                <p className="mt-4 text-body text-ink-200">{pick(item.summary)}</p>
                <p className="mt-4 border-t border-white/10 pt-4 text-caption text-ink-400">{pick(item.boundary)}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <div className="text-caption uppercase tracking-wide text-ink-500">
            {isZh ? '建议组合' : 'Suggested bundles'}
          </div>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-3">
            {bundles.map((bundle) => (
              <div key={bundle.title.en} className="bg-surface-void p-6">
                <div className="text-caption text-brand-halo">{pick(bundle.scope)}</div>
                <h3 className="mt-2 text-body-lg text-white">{pick(bundle.title)}</h3>
                <p className="mt-4 text-caption leading-relaxed text-ink-300">{pick(bundle.items)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-caption text-ink-500">
            {isZh
              ? '具体设备、数量、安装方式与兼容范围在方案确认阶段形成正式交付清单。'
              : 'The confirmed solution defines the device inventory, quantities, installation and compatibility scope.'}
          </p>
        </div>
      </div>
    </section>
  );
}

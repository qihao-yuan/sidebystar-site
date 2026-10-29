// Shared visual source for every product-bearing page. Reuse these approved forms;
// room scenes and original-manufacturer options retain their own identities.
import { productLabel } from '@/content/product-names';
export type VisualAsset = {
  id: string;
  src: string;
  alt: { zh: string; en: string };
  kind: 'product-design' | 'software-demo' | 'oem-installation' | 'lifestyle-scene';
  fit?: 'cover' | 'contain';
  panel?: 0 | 1 | 2;
  position?: string;
};

export const customerBase = '/customer/V20';
export const customerImages = {
  family: `${customerBase}/images/family_studio.png`,
  host: `${customerBase}/images/host_desk.png`,
  kitchen: `${customerBase}/images/kitchen_water.png`,
  bathroom: `${customerBase}/images/bathroom_presence.png`,
  extensions: `${customerBase}/images/extension_scenes.png`,
  acoustic: '/customer/V22/images/acoustic_studio.png',
};

export const visuals: Record<
  'family' | 'host' | 'water' | 'presence' | 'acoustic' | 'options' | 'bedside' | 'entrance' | 'curtains' |
  'memory' | 'task' | 'choice' | 'routines' | 'awareness' | 'orchestration' | 'community',
  VisualAsset
> = {
  family: { id: 'family', src: customerImages.family, kind: 'product-design', fit: 'contain', alt: { zh: '循星·中枢、隐感与穹感产品家族设计效果', en: 'Design visualization of the SidebyStar Hub, Sense and Ceiling Sense product families' } },
  host: { id: 'host', src: customerImages.host, kind: 'product-design', alt: { zh: `${productLabel('SBS-C01').zh}桌面设计效果`, en: `Desktop design visualization of ${productLabel('SBS-C01').en}` } },
  water: { id: 'water', src: customerImages.kitchen, kind: 'product-design', alt: { zh: `${productLabel('SBS-S04').zh}橱柜低位安装设计效果`, en: `Cabinet-base installation design of ${productLabel('SBS-S04').en}` } },
  presence: { id: 'presence', src: customerImages.bathroom, kind: 'product-design', alt: { zh: `${productLabel('SBS-S09').zh}相邻干区吸顶安装设计效果`, en: `Ceiling installation design of ${productLabel('SBS-S09').en} in an adjacent dry area` } },
  acoustic: { id: 'acoustic', src: customerImages.acoustic, kind: 'product-design', fit: 'contain', alt: { zh: `${productLabel('SBS-S05').zh}设计效果，短端为拾音微孔`, en: `Design visualization of ${productLabel('SBS-S05').en} with microphone openings at the short end` } },
  options: { id: 'options', src: customerImages.extensions, kind: 'oem-installation', fit: 'contain', alt: { zh: '原厂床旁测量、门口设备和窗帘系统的选配安装示意', en: 'Installation illustration of original-manufacturer bedside, entrance and curtain options' } },
  // The three panels come from one approved OEM illustration, without a self-developed logo.
  bedside: { id: 'bedside', src: customerImages.extensions, kind: 'oem-installation', panel: 0, alt: { zh: '原厂床旁血压测量设备选配安装示意，非循星自研医疗器械', en: 'Installation illustration of an original-manufacturer bedside blood-pressure option, not a SidebyStar medical device' } },
  entrance: { id: 'entrance', src: customerImages.extensions, kind: 'oem-installation', panel: 1, alt: { zh: '原厂门口视频门铃与门锁选配安装示意', en: 'Installation illustration of original-manufacturer entrance doorbell and lock options' } },
  curtains: { id: 'curtains', src: customerImages.extensions, kind: 'oem-installation', panel: 2, alt: { zh: '原厂窗帘电机、轨道与安装配件示意', en: 'Installation illustration of an original-manufacturer curtain motor, track and fittings' } },
  memory: { id: 'memory', src: '/customer/V20/software/memory.png', kind: 'software-demo', fit: 'contain', alt: { zh: '现有助手检索明确保存记录的软件界面示例', en: 'Current assistant interface showing retrieval of an explicitly saved example record' } },
  task: { id: 'task', src: '/customer/V20/software/task.png', kind: 'software-demo', fit: 'contain', alt: { zh: '现有助手准备清单与任务进度界面示例', en: 'Current assistant interface showing an example preparation checklist and task progress' } },
  choice: { id: 'choice', src: '/customer/V20/software/choice.png', kind: 'software-demo', fit: 'contain', alt: { zh: '现有助手提醒建议与使用者选择界面示例', en: 'Current assistant interface showing an example reminder suggestion and user choice' } },
  // Audited scenes contain no conflicting SidebyStar device, and are not product photos.
  routines: { id: 'routines', src: '/intelligence/routines.jpg', kind: 'lifestyle-scene', alt: { zh: '日常物件与生活安排情境示意', en: 'Illustrative scene of everyday objects and routines' } },
  awareness: { id: 'awareness', src: '/intelligence/awareness.jpg', kind: 'lifestyle-scene', alt: { zh: '居家活动空间情境示意', en: 'Illustrative scene of a household activity space' } },
  orchestration: { id: 'orchestration', src: '/intelligence/orchestration.jpg', kind: 'lifestyle-scene', alt: { zh: '窗帘与空调等原厂设备的房间场景示意', en: 'Room illustration with curtains, climate control and other manufacturer equipment' } },
  community: { id: 'community', src: '/home/community.webp', kind: 'lifestyle-scene', alt: { zh: '社区日常活动情境示意', en: 'Illustrative scene of everyday community activity' } },
};

export const platformVisuals: VisualAsset[] = [visuals.presence, visuals.memory, visuals.choice, visuals.curtains, visuals.host];
export const pluginVisuals: Record<string, VisualAsset> = {
  'dawn-light': visuals.orchestration,
  'fall-watch': visuals.presence,
  'energy-keeper': visuals.host,
  'matter-bridge': visuals.family,
  'homeassistant-sync': visuals.host,
  'concierge-script': visuals.task,
  'clinical-adapter': visuals.bedside,
  'auditable-voice': visuals.host,
};

export const visualAlt = (visual: VisualAsset, locale: string) => locale === 'zh-CN' ? visual.alt.zh : visual.alt.en;

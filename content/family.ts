import {
  Cpu,
  Radar,
  SlidersHorizontal,
  Workflow,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';

export type FamilyRole = 'gateway' | 'sense' | 'control' | 'connect' | 'act';

export type FamilyMember = {
  role: FamilyRole;
  order: number;
  icon: LucideIcon;
  nameZh: string;
  nameEn: string;
  tagZh: string;
  tagEn: string;
  storyZh: string;
  storyEn: string;
  exampleLabel: { zh: string; en: string };
  examples: Array<{ zh: string; en: string; descZh: string; descEn: string }>;
  bundledIn?: Array<'home-box' | 'community-kit' | 'enterprise-stack'>;
  roadmap?: boolean;
  roadmapNote?: { zh: string; en: string };
};

export const family: FamilyMember[] = [
  {
    role: 'gateway',
    order: 1,
    icon: Cpu,
    nameZh: '网关 · Gateway',
    nameEn: 'Gateway',
    tagZh: '空间的中枢',
    tagEn: 'The mind of the space',
    storyZh:
      '每一个房间, 都有一个本地运行的小小大脑。它不说话, 却在默默地感知、记住、思考, 并在你开口之前把事情安排妥当。家庭里是一只盒子, 社区里是一台网关, 机构里是一个机柜 —— 但智能, 始终只属于这个空间。',
    storyEn:
      'Every room has a quiet local brain. It never speaks, yet it is always sensing, remembering, reasoning -- sorting things before you ever ask. It is a small box at home, a gateway in the community, a rack in the institution. But the intelligence always belongs to that space, and only to that space.',
    exampleLabel: { zh: '家族成员', en: 'Members' },
    examples: [
      { zh: 'Home Box', en: 'Home Box', descZh: '一户一盒, 开箱即用。家里的全部智能都从它开始。', descEn: 'One box per household. Unboxed and ready. The starting point of a smart home.' },
      { zh: 'Community Gateway', en: 'Community Gateway', descZh: '为楼栋、社区、长者公寓设计的网关, 一台管几十到几百户。', descEn: 'A gateway designed for buildings, communities, and senior apartments. One unit serves dozens to hundreds.' },
      { zh: 'Enterprise Node', en: 'Enterprise Node', descZh: '为医院、机构做私有化部署的主力节点。对接现场已有系统。', descEn: 'The workhorse node for on-prem deployments in hospitals and institutions. Integrates with existing systems on site.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'sense',
    order: 2,
    icon: Radar,
    nameZh: '感知 · Sense',
    nameEn: 'Sense',
    tagZh: '空间的眼与耳',
    tagEn: 'The eyes and ears of the space',
    storyZh:
      '空间的第一层智能, 是知道此刻正在发生什么。不是对着你看, 而是对着整间屋子。谁在哪, 谁还没回, 谁起身去卫生间, 空气在变凉, 窗外下雨了 —— 这些细节, 它比你更早察觉。所有感知在本地完成, 涉及隐私的部位, 连系统自己都不会看到。',
    storyEn:
      'A space begins to be intelligent when it knows what is happening right now. Not watching you, but reading the whole room. Who is where, who has not returned, who just got out of bed, the air turning cooler, rain outside the window -- it notices before you do. All sensing stays on-device, and private spots are masked even from the system itself.',
    exampleLabel: { zh: '感知器件', en: 'Devices' },
    examples: [
      { zh: '存在感知', en: 'Presence', descZh: '房间有没有人, 谁在哪, 夜里有没有下床 —— 不靠摄像头。', descEn: 'Whether the room is occupied, who is where, whether someone rose in the night -- without a camera.' },
      { zh: '环境感知', en: 'Environment', descZh: '温度、湿度、光线、噪声。它替你留意那些你没有留意的。', descEn: 'Temperature, humidity, light, noise. It notices the things you forgot to.' },
      { zh: '视觉理解', en: 'Vision', descZh: '需要时看一眼, 不需要时一刻也不录。关键部位自动打码。', descEn: 'Looks when needed, never records otherwise. Sensitive areas auto-masked.' },
      { zh: '声学判断', en: 'Acoustics', descZh: '异响、呼救、玻璃碎裂 —— 不做录音, 只做判断。', descEn: 'Unusual sound, cry for help, glass breaking -- no recording, only recognition.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'control',
    order: 3,
    icon: SlidersHorizontal,
    nameZh: '控制 · Control',
    nameEn: 'Control',
    tagZh: '与空间对话的入口',
    tagEn: 'Where you talk back',
    storyZh:
      '当你需要亲自说点什么, 它也愿意倾听。一颗旋钮调亮夜里的灯, 一块面板安静地立在墙上, 一句话就能把整个房间调成工作模式。它不会让你对着屏幕喊口令, 也不会把你的声音送去远方。所有交互, 都很克制。',
    storyEn:
      'When you want to say something yourself, it listens. A dial brightens the night light. A panel sits quietly on the wall. One sentence turns the room into work mode. You never have to shout at a screen, and your voice never leaves home. Every interaction, deliberately quiet.',
    exampleLabel: { zh: '交互入口', en: 'Interfaces' },
    examples: [
      { zh: '床畔旋钮', en: 'Bedside Dial', descZh: '一只可以触摸、可以拧的旋钮。不用看也能用。', descEn: 'A dial you can tap or turn. No need to look.' },
      { zh: '墙面触控屏', en: 'Wall Panel', descZh: '入门处的一块面板。一眼看到整屋状态。', descEn: 'A panel at the entrance. One glance shows the whole room.' },
      { zh: '语音入口', en: 'Voice', descZh: '你说话它懂, 也许还能在你开口之前就准备好。', descEn: 'It understands you, and sometimes has already prepared before you speak.' },
      { zh: '手机侧', en: 'App', descZh: '远处也能确认家里是否妥当, 家属只看该看的那一份。', descEn: 'Check in from afar. Family members only see what they are meant to.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'connect',
    order: 4,
    icon: Workflow,
    nameZh: '连接 · Connect',
    nameEn: 'Connect',
    tagZh: '让既有的一切, 都加入进来',
    tagEn: 'Brings everything you already own, along',
    storyZh:
      '你家里原本就有的灯、原本就在用的门锁、地产商预装的地暖、邻居送的扫地机 —— 不需要被替换。AIOS 像一位懂多国语言的译员, 把它们请进同一间房, 让它们听得懂彼此。',
    storyEn:
      'The lights you already have. The locks you already use. The underfloor heating the developer installed. The robot vacuum your neighbor gave you. Nothing needs to be replaced. AIOS acts as an interpreter who speaks many tongues, letting all of them share the same room.',
    exampleLabel: { zh: '能接入的生态', en: 'Ecosystems' },
    examples: [
      { zh: '主流协议', en: 'Mainstream protocols', descZh: '市面上主流的智能家居协议都能说。', descEn: 'Speaks the mainstream smart-home dialects.' },
      { zh: '开源家居', en: 'Open-source home', descZh: '与开源家居系统互通, 你积累的自动化不会丢。', descEn: 'Interoperates with open-source home platforms. Your automations come with you.' },
      { zh: '机构系统', en: 'Institutional systems', descZh: '面向医院、机构, 与已有的信息系统对接。', descEn: 'For hospitals and institutions, integrates with existing information systems.' },
      { zh: '第三方插件', en: 'Third-party plugins', descZh: '生态里不断加入的新能力, 以插件的方式加进来。', descEn: 'New capabilities join continuously, as plugins.' },
    ],
    bundledIn: ['home-box', 'community-kit', 'enterprise-stack'],
  },
  {
    role: 'act',
    order: 5,
    icon: Lightbulb,
    nameZh: '执行 · Act',
    nameEn: 'Act',
    tagZh: '空间的手脚',
    tagEn: 'The hands of the space',
    storyZh:
      '当思考成熟, 空间也该有手脚 —— 灯光回路、窗帘电机、地暖阀门、新风、床畔呼叫、能耗计量。让"会思考的空间"真正能接管一次夜间的照护、一次节能的周末、一次家人的离家。执行层, 是我们路线图上最接近落地的下一步。',
    storyEn:
      'Once the thinking is ready, the space needs hands -- light circuits, motorized curtains, heating valves, ventilation, bedside call, energy metering. Only then can a thinking space actually take over a care-filled night, an energy-saving weekend, a family leaving for work. The act layer is the next step on our roadmap, closest to ship.',
    exampleLabel: { zh: '路线图', en: 'Roadmap' },
    examples: [
      { zh: '灯光与场景', en: 'Light & Scene', descZh: '按空间意图调节回路、调光、色温, 而不是按按钮。', descEn: 'Circuits, dimming, color temperature, driven by intent -- not by buttons.' },
      { zh: '空调 / 地暖 / 新风', en: 'HVAC & Ventilation', descZh: '把温度、湿度、新风交给空间来判断。', descEn: 'Let the space itself decide temperature, humidity, ventilation.' },
      { zh: '门锁 / 床畔呼叫', en: 'Locks & Call', descZh: '安全与照护的最后一米, 由系统看护。', descEn: 'The last meter of safety and care, watched by the system.' },
      { zh: '能耗管理', en: 'Energy', descZh: '每一度电去了哪, 空间自己会记账。', descEn: 'Every kilowatt-hour, accounted for by the space itself.' },
    ],
    roadmap: true,
    roadmapNote: { zh: '预计 2026 H2 起分批开放', en: 'Rolling out from 2026 H2' },
  },
];

export function getFamilyMember(role: FamilyRole) {
  return family.find((f) => f.role === role);
}

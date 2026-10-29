'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { customerImages } from '@/content/product-visuals';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Circle, Play, RotateCcw, X } from 'lucide-react';
import styles from './PremiumHome.module.css';

// Website demonstrations use local, resettable example state, never a household
// connection. Product visuals are the approved V23 assets listed in the manifest.
const copy = {
  zh: {
    eyebrow: '循星科技 · SIDEBYSTAR', title: '循星 AIOS', subtitle: '个人生活与家庭智能系统。',
    intro: '保存交代，安排日常，连接家中的设备。', explore: '探索产品', try: '看看如何使用',
    design: '产品设计效果图', scroll: '向下探索',
    useEyebrow: '从日常开始', useTitle: '让交代的事，\n有迹可循。',
    useBody: '记下位置和安排，核对准备清单，按自己的节奏处理提醒。',
    tabs: ['记住与找回', '理解与完成', '建议与调整'], example: '交互演示 · 示例数据', reset: '重新体验', recording: '观看实际操作', handbook: '查看产品手册',
    memory: '备用钥匙放在玄关的第二个抽屉。', saved: '已记下这条备忘。', ask: '试着问：备用钥匙在哪？',
    answer: '你记在备忘里：玄关的第二个抽屉。', source: '来自你保存的备忘',
    request: '周六去露营，帮我准备一份清单。', preview: '出发前，先核对这份清单。',
    items: ['帐篷与地垫', '饮水与简餐', '照明与充电设备', '查看天气与营地安排'],
    confirm: '确认创建清单', confirmed: '清单已创建，试着勾选一项。',
    reminder: '露营出发前提醒', reminderBody: '你的清单还有几项未完成。', snooze: '15 分钟后提醒', pause: '不再提醒此任务',
    snoozed: '已调整为 15 分钟后提醒。', paused: '已停止这项任务的提醒。',
    productEyebrow: '一套系统，多种设备', productTitle: '从中枢，延伸到\n家中的每个空间。',
    productBody: '中枢负责连接与处理，感知设备提供状态，面板与屏幕承接操作。按房间和实际用途组合。',
    productLink: '了解产品与配置', hub: '循星·中枢', hubRole: '本地计算与中控',
    sense: '循星·隐感 / 穹感', senseRole: '房间与环境状态输入',
    control: '循星·序控 / 界屏', controlRole: '面板、屏幕与常用操作',
    bridge: '循星·联桥', bridgeRole: '设备与协议接入', care: '循星·居护', careRole: '家庭与照护配置',
    scenesEyebrow: '生活场景', scenesTitle: '同一个家，\n不同的时刻。',
    scenesBody: '从看晚霞到准备惊喜，探索循星对家庭智能的设想。',
    sceneNames: ['一起看晚霞', '准备一场惊喜', '雷雨天的周末'],
    sceneTitles: ['晚霞还在，\n窗帘可以再等一会儿。', '灯光亮起的时机，\n也可以由准备惊喜的人决定。', '周末的傍晚，\n给喜欢的事留一点时间。'],
    sceneTexts: ['结合当下活动和家庭规则，提出暂缓关帘的选择。', '将纪念日安排与现场布置结合，让灯光配合准备好的时刻。', '在安全条件与家长规则内，保留正在享受的活动。'],
    vision: '场景演绎 · 能力愿景', watch: '观看短片', close: '关闭视频', film: '场景短片',
    spaces: '也关注生活里，需要留意的地方。', kitchen: '厨房用水', kitchenText: '先发现水浸和异常，再按安装条件评估联动。',
    bathroom: '卫生间与照护', bathroomText: '感知存在与活动状态，结合设备和配置核验提醒方式。',
    learn: '了解场景方案', contactEyebrow: '了解适合你的组合', contactTitle: '预约一次产品演示。',
    contactBody: '说说你的房间、设备和日常需求，我们一起确认配置。', contact: '联系循星',
    notes: '产品图为设计效果图；交互区使用示例数据。场景短片为愿景演绎，具体功能、兼容设备与交付范围以确认配置和验证结果为准。',
  },
  en: {
    eyebrow: 'SIDEBYSTAR', title: 'SidebyStar AIOS', subtitle: 'Personal life. Connected spaces.',
    intro: 'Keep your notes, organize everyday tasks, and connect devices at home.', explore: 'Explore products', try: 'See it in use',
    design: 'Product design visualization', scroll: 'Explore below',
    useEyebrow: 'Everyday use', useTitle: 'A place for\nwhat you want to remember.',
    useBody: 'Save a detail, review a checklist, and manage reminders at your own pace.',
    tabs: ['Remember & recall', 'Prepare & complete', 'Suggest & adjust'], example: 'Interactive example · Sample data', reset: 'Start again', recording: 'Watch the software in use', handbook: 'View the product handbook',
    memory: 'The spare key is in the second drawer by the entrance.', saved: 'This note is saved.', ask: 'Try asking: Where is the spare key?',
    answer: 'Your note says: the second drawer by the entrance.', source: 'From your saved note',
    request: 'Help me prepare a checklist for camping on Saturday.', preview: 'Review your checklist before creating it.',
    items: ['Tent and groundsheet', 'Water and simple meals', 'Lighting and power', 'Check weather and campsite plans'],
    confirm: 'Create this checklist', confirmed: 'Checklist created. Try checking off an item.',
    reminder: 'Before your camping trip', reminderBody: 'A few checklist items are still open.', snooze: 'Remind me in 15 minutes', pause: 'Stop reminding me about this task',
    snoozed: 'Reminder moved to 15 minutes from now.', paused: 'Reminders for this task have stopped.',
    productEyebrow: 'One system. A family of devices.', productTitle: 'From the hub\nto the rooms around you.',
    productBody: 'A hub handles processing and connections. Sensors provide state. Panels and screens put controls within reach. Combine them by room and need.',
    productLink: 'Explore products and configurations', hub: 'SidebyStar Hub', hubRole: 'Local processing and central control',
    sense: 'Sense / Ceiling Sense', senseRole: 'Room and environmental inputs', control: 'Control / Display', controlRole: 'Panels, screens and everyday controls',
    bridge: 'SidebyStar Bridge', bridgeRole: 'Device and protocol connections', care: 'SidebyStar Home & Care', careRole: 'Home and care configurations',
    scenesEyebrow: 'Life at home', scenesTitle: 'One home.\nDifferent moments.',
    scenesBody: 'From a sunset to a surprise, explore our vision for intelligence at home.',
    sceneNames: ['Watch the sunset', 'Prepare a surprise', 'A rainy weekend'],
    sceneTitles: ['The sunset can stay.\nThe curtains can wait.', 'Let the people planning\nthe surprise choose the moment.', 'A weekend evening.\nTime for what you enjoy.'],
    sceneTexts: ['Consider current activities and household rules before suggesting a curtain delay.', 'Coordinate anniversary plans and a prepared setting with the timing of the lights.', 'Allow an activity to continue within safety conditions and parental rules.'],
    vision: 'Illustrated scenario · Product vision', watch: 'Watch the film', close: 'Close video', film: 'Scenario film',
    spaces: 'Attention where everyday life needs it.', kitchen: 'Kitchen water', kitchenText: 'Detect water and unusual conditions first. Assess actions against the actual installation.',
    bathroom: 'Bathroom and care', bathroomText: 'Use presence and activity inputs. Validate alerts against the selected devices and configuration.',
    learn: 'Explore solutions', contactEyebrow: 'Find your configuration', contactTitle: 'See the system in a demo.',
    contactBody: 'Tell us about your rooms, devices and everyday needs. We will help define a suitable setup.', contact: 'Contact SidebyStar',
    notes: 'Product images are design visualizations. Interactive examples use sample data. Scenario films illustrate a product vision; features, compatibility and delivery scope depend on the agreed configuration and validation.',
  },
};

const imagePath = '/customer/V23/assets/images/';
const videoPath = '/customer/V23/assets/video/';
const sceneFiles = ['romance', 'anniversary', 'rain'];
const ease = [0.22, 1, 0.36, 1] as const;

function Enter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    // Content remains visible without JS; only offscreen sections receive a reveal.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = 'waiting';
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.dataset.reveal = 'visible'; observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${styles.enter} ${className}`}>{children}</div>;
}

export function PremiumHome() {
  const t = copy[useLocale() === 'zh-CN' ? 'zh' : 'en'];
  const reduced = useReducedMotion();
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const [example, setExample] = useState(0);
  const [recalled, setRecalled] = useState(false);
  const [created, setCreated] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [reminder, setReminder] = useState<'pending' | 'snoozed' | 'paused'>('pending');
  const [scene, setScene] = useState(0);
  const [film, setFilm] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (film === null) return;
    const element = dialog.current;
    const trigger = document.activeElement;
    const player = video.current;
    element?.showModal();
    // Never start the video until the visitor explicitly chooses to watch it.
    void player?.play().catch(() => undefined);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { player?.pause(); element?.close(); document.body.style.overflow = previousOverflow; if (trigger instanceof HTMLElement) trigger.focus(); };
  }, [film]);

  function resetExample() { setRecalled(false); setCreated(false); setChecked([]); setReminder('pending'); }

  return <div className={styles.home}>
    <section ref={hero} className={styles.hero} aria-labelledby="home-title">
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1 id="home-title">{t.title}</h1>
        <p className={styles.heroSubtitle}>{t.subtitle}</p>
        <p className={styles.heroIntro}>{t.intro}</p>
        <div className={styles.actions}>
          <Link href="/products" className={styles.primary}>{t.explore}<ArrowUpRight size={16}/></Link>
          <a href="#everyday" className={styles.textLink}>{t.try}<ChevronRight size={17}/></a>
        </div>
      </div>
      <div className={styles.heroStage}>
        <motion.div className={styles.heroVisual} style={reduced ? undefined : { y: heroY, scale: heroScale }}>
          <Image src={customerImages.family} alt={t.design} width={1536} height={1024} priority sizes="(max-width: 760px) 100vw, 1100px" quality={90}/>
        </motion.div>
        <div className={styles.heroAnnotation}><span>AIOS</span><span>{t.design}</span><a href="#everyday">{t.scroll}<span aria-hidden>↓</span></a></div>
      </div>
    </section>

    <section id="everyday" className={styles.everyday} aria-labelledby="everyday-title">
      <Enter className={styles.sectionHead}>
        <p className={styles.eyebrow}>{t.useEyebrow}</p>
        <h2 id="everyday-title">{t.useTitle}</h2>
        <p>{t.useBody}</p>
      </Enter>
      <Enter className={styles.experience}>
        <div className={styles.experienceTabs} aria-label={t.useEyebrow}>
          {t.tabs.map((label, index) => <button key={label} aria-pressed={example === index} onClick={() => setExample(index)}><span>0{index + 1}</span>{label}<ArrowRight size={18}/></button>)}
        </div>
        <div className={styles.demo}>
          <div className={styles.demoTop}><span><i/> AIOS</span><span>{t.example}</span></div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div className={styles.demoBody} key={`${example}-${t.title}`} initial={reduced ? false : {opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: reduced ? 0 : .3, ease}}>
              {example === 0 ? <>
                <p className={styles.userBubble}>{t.memory}</p>
                <div className={styles.response}><span className={styles.aiMark}>A</span><p><Check size={17}/>{t.saved}</p></div>
                {!recalled ? <button className={styles.demoPrompt} onClick={() => setRecalled(true)}>{t.ask}<ArrowRight size={16}/></button> : <div className={styles.result} aria-live="polite"><small>{t.source}</small><p>{t.answer}</p></div>}
              </> : example === 1 ? <>
                <p className={styles.userBubble}>{t.request}</p>
                <p className={styles.demoInstruction} aria-live="polite">{created ? t.confirmed : t.preview}</p>
                <div className={styles.checklist}>{t.items.map((item, index) => <label key={item} className={checked.includes(index) ? styles.completed : ''}>
                  <input type="checkbox" disabled={!created} checked={checked.includes(index)} onChange={() => setChecked(value => value.includes(index) ? value.filter(i => i !== index) : [...value, index])}/>
                  <span aria-hidden>{checked.includes(index) ? <Check size={16}/> : <Circle size={16}/>}</span>{item}</label>)}</div>
                {!created && <button className={styles.demoConfirm} onClick={() => setCreated(true)}>{t.confirm}<ArrowRight size={16}/></button>}
              </> : <>
                <div className={styles.reminderIcon}><Circle size={24}/><span/></div><h3>{t.reminder}</h3><p className={styles.demoInstruction}>{t.reminderBody}</p>
                {reminder === 'pending' ? <div className={styles.reminderActions}><button className={styles.demoConfirm} onClick={() => setReminder('snoozed')}>{t.snooze}</button><button className={styles.demoPrompt} onClick={() => setReminder('paused')}>{t.pause}</button></div> : <div className={styles.result} aria-live="polite"><Check size={18}/><p>{reminder === 'snoozed' ? t.snoozed : t.paused}</p></div>}
              </>}
            </motion.div>
          </AnimatePresence>
          <button className={styles.reset} onClick={resetExample}><RotateCcw size={13}/>{t.reset}</button>
        </div>
      </Enter>
      <div className={styles.proofLinks}><Link href="/experience#software" className={styles.textLink}><Play size={14}/>{t.recording}<ChevronRight size={16}/></Link><Link href="/experience#handbook" className={styles.textLink}>{t.handbook}<ChevronRight size={16}/></Link></div>
    </section>

    <section id="products" className={styles.products} aria-labelledby="products-title">
      <Enter className={styles.productHeading}><div><p className={styles.eyebrow}>{t.productEyebrow}</p><h2 id="products-title">{t.productTitle}</h2></div><div><p>{t.productBody}</p><Link href="/products" className={styles.textLink}>{t.productLink}<ChevronRight size={17}/></Link></div></Enter>
      <Enter className={styles.hubFigure}><Image src={customerImages.host} alt={t.hub} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 1300px" quality={85}/><div><p>{t.hub}</p><span>{t.hubRole}</span></div></Enter>
      <Enter className={styles.familyRoles}>
        {[[t.sense,t.senseRole],[t.control,t.controlRole],[t.bridge,t.bridgeRole],[t.care,t.careRole]].map(([name,role], index) => <Link href="/products" key={name}><small>0{index + 2}</small><h3>{name}</h3><p>{role}</p><ArrowUpRight size={20}/></Link>)}
      </Enter>
    </section>

    <section id="moments" className={styles.scenes} aria-labelledby="scenes-title">
      <Enter className={styles.sceneHeading}><p className={styles.eyebrow}>{t.scenesEyebrow}</p><h2 id="scenes-title">{t.scenesTitle}</h2><p>{t.scenesBody}</p></Enter>
      <div className={styles.sceneTabs} aria-label={t.scenesEyebrow}>{t.sceneNames.map((name,index) => <button key={name} aria-pressed={scene === index} onClick={() => setScene(index)}>{name}</button>)}</div>
      <div className={styles.sceneStage}>
        <AnimatePresence mode="sync" initial={false}><motion.div key={scene} className={styles.sceneImage} initial={reduced ? false : {opacity: 0, scale: 1.025}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0}} transition={{duration: reduced ? 0 : .65, ease}}>
          <Image src={`${imagePath}${sceneFiles[scene]}_poster.jpg`} alt={t.sceneNames[scene]} fill sizes="100vw" quality={85}/>
        </motion.div></AnimatePresence>
        <div className={styles.sceneShade}/><div className={styles.sceneCopy}>
          <span className={styles.vision}>{t.vision}</span><h3>{t.sceneTitles[scene]}</h3><p>{t.sceneTexts[scene]}</p>
          <button className={styles.play} onClick={() => setFilm(scene)}><span><Play size={17} fill="currentColor"/></span>{t.watch}</button>
        </div>
        <span className={styles.sceneCount}>0{scene + 1}<span>/ 03</span></span>
      </div>
    </section>

    <section className={styles.spaces}>
      <Enter><h2>{t.spaces}</h2></Enter>
      <div className={styles.spaceGrid}>{[[t.kitchen,t.kitchenText],[t.bathroom,t.bathroomText]].map(([title,text],index) => <Enter key={title} className={styles.spaceCard}>
        <div><Image src={index === 0 ? customerImages.kitchen : customerImages.bathroom} alt={title} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 640px"/><span>{t.design}</span></div>
        <h3>{title}</h3><p>{text}</p><Link href="/solutions" className={styles.textLink}>{t.learn}<ChevronRight size={16}/></Link>
      </Enter>)}</div>
    </section>

    <section className={styles.contact}><Enter><p className={styles.eyebrow}>{t.contactEyebrow}</p><h2>{t.contactTitle}</h2><p>{t.contactBody}</p><Link href="/contact" className={styles.primary}>{t.contact}<ArrowUpRight size={17}/></Link><a className={styles.email} href="mailto:contact@sidebystar.com">contact@sidebystar.com</a></Enter></section>
    <p className={styles.notes}>{t.notes}</p>
    {film !== null && <dialog ref={dialog} className={styles.filmDialog} aria-label={`${t.film} · ${t.sceneNames[film]}`} onCancel={() => setFilm(null)} onClick={event => {if (event.target === event.currentTarget) setFilm(null);}}>
      <div className={styles.filmHeader}><span>{t.sceneNames[film]}</span><button onClick={() => setFilm(null)} aria-label={t.close}><X size={22}/></button></div>
      <video ref={video} src={`${videoPath}${sceneFiles[film]}.mp4`} poster={`${imagePath}${sceneFiles[film]}_poster.jpg`} controls muted playsInline preload="metadata"/>
      <p>{t.vision}</p>
    </dialog>}
  </div>;
}

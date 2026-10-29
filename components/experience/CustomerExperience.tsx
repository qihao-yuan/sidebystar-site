// One customer route for real software recordings, concept stories and self-contained manuals.
import Image from 'next/image';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { customerBase, manualDownloads, pickText, softwareLoops, storyFilms } from '@/content/customer-experience';

export function CustomerExperience({ locale }: { locale: string }) {
  const isZh = locale === 'zh-CN';
  return (
    <>
      <section id="software" className="py-section">
        <div className="container-page">
          <span className="eyebrow">{isZh ? '01 · AIOS 操作实录' : '01 · AIOS in use'}</span>
          <h2 className="mt-4 text-display-lg text-white">{isZh ? '记录、任务与提醒的实际操作' : 'See records, tasks and reminders in use'}</h2>
          <p className="mt-5 max-w-3xl text-body text-ink-300">{isZh ? '从明确交代的一条记录，到核对清单、保存任务和处理到期建议。以下截图和录像使用现有软件与示例资料。' : 'Follow an explicitly saved note through a checklist, a stored task and a due suggestion. These screenshots and recordings use the current software with example records.'}</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {softwareLoops.map(item => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="relative aspect-[16/9] bg-[#f4f8fa]">
                  <Image src={item.image} alt={pickText(item.title, locale)} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-contain p-4" />
                </div>
                <div className="p-6"><h3 className="text-display-sm text-white">{pickText(item.title, locale)}</h3><p className="mt-4 text-body text-ink-100">{pickText(item.example, locale)}</p><p className="mt-3 text-caption text-ink-300">{pickText(item.body, locale)}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[4fr_6fr] lg:items-center">
            <div><span className="chip">{isZh ? '约80秒 · 示例数据' : 'About 80 seconds · Example records'}</span><h3 className="mt-5 text-display-sm text-white">{isZh ? '客户沟通准备：保存、核对与继续处理' : 'Preparing a conversation: save, review and continue'}</h3><p className="mt-4 text-body text-ink-300">{isZh ? '观看操作录像，核对备忘、清单、提醒与选择如何保留在同一项准备中。在线页面展示录像，实际软件演示可预约。' : 'Watch how notes, checklists, reminders and choices stay connected to the same preparation. This page shows a recording; an actual software demonstration can be arranged.'}</p><Link href="/contact" className="btn-ghost mt-6">{isZh ? '预约软件演示' : 'Book a software demonstration'} <ArrowRight size={15} /></Link></div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <video controls playsInline preload="none" poster={`${customerBase}/posters/software_demo_poster.jpg`} className="aspect-video w-full" aria-label={isZh ? '实际软件操作录像，示例数据' : 'Current software operation with example records'}>
                <source src={`${customerBase}/video/software_demo.mp4`} type="video/mp4" />
                <track kind="subtitles" src={`${customerBase}/subtitles/software_demo.en.vtt`} srcLang="en" label="English" default={!isZh} />
              </video>
            </div>
          </div>
        </div>
      </section>
      <section id="stories" className="border-y border-white/5 bg-white/[0.015] py-section-lg">
        <div className="container-page">
          <span className="eyebrow">{isZh ? '02 · 生活情境影片' : '02 · Everyday-life stories'}</span>
          <h2 className="mt-4 text-display-lg text-white">{isZh ? '从一个具体的生活片刻开始' : 'Start with a specific moment'}</h2>
          <p className="mt-5 max-w-3xl text-body text-ink-300">{isZh ? '听雨、看晚霞、准备纪念日惊喜、出门前找回眼镜。影片围绕人物当下的愿望，介绍希望实现的配合方式。' : 'Enjoy the rain, linger over a sunset, prepare a family surprise or find glasses before heading out. These stories explore a response to what people want in the moment.'}</p>
          <p className="mt-4 max-w-3xl text-caption text-ink-400">{isZh ? '品牌情境演绎，非实机功能或客户部署录像。保留画面与原字幕，已移除音轨，可选择英文字幕。' : 'Fictional concept stories, rather than footage of hardware operation or a customer installation. Silent editions retain the visuals and on-screen text, with optional English subtitles.'}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {storyFilms.map(film => (
              <article key={film.id} className="overflow-hidden rounded-2xl border border-white/10 bg-surface-void">
                <video controls playsInline preload="none" poster={`${customerBase}/posters/${film.id}_poster.jpg`} className="aspect-video w-full bg-black" aria-label={pickText(film.title, locale)}>
                  <source src={`${customerBase}/video/${film.id}.mp4`} type="video/mp4" />
                  <track kind="subtitles" src={`${customerBase}/subtitles/${film.id}.en.vtt`} srcLang="en" label="English" default={!isZh} />
                </video>
                <div className="p-6"><span className="text-caption text-brand-halo">{isZh ? '情境演绎' : 'Concept story'}</span><h3 className="mt-3 text-display-sm text-white">{pickText(film.title, locale)}</h3><p className="mt-3 text-body text-ink-300">{pickText(film.body, locale)}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="handbook" className="py-section-lg">
        <div className="container-page grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-center">
          <div><span className="eyebrow">{isZh ? '03 · 产品手册' : '03 · Product handbook'}</span><h2 className="mt-4 text-display-lg text-white">{isZh ? '产品、用途与影片，放在同一份资料里' : 'Products, uses and films in one document'}</h2><p className="mt-5 text-body text-ink-300">{isZh ? '在线手册可直接用手机或电脑浏览器阅读，视频按需播放。电脑离线版便于保存，PDF用于图文阅读与打印。当前手册正文为中文。' : 'Read the online handbook in a phone or desktop browser and play videos as needed. The desktop offline edition can be saved; the PDF is for illustrated reading and printing. The handbook text is currently in Chinese.'}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 md:p-9">
            <a href={manualDownloads.web} className="btn-primary w-full justify-between gap-3 text-left"><span>{isZh ? '手机／在线阅读手册' : 'Read online · phone or desktop'}</span><ArrowRight size={18} className="shrink-0" /></a>
            <a href={manualDownloads.html} download className="btn-ghost mt-4 w-full justify-between gap-3 text-left"><span>{isZh ? `电脑离线版（HTML）· ${manualDownloads.htmlMB} MB` : `Desktop offline edition (HTML) · ${manualDownloads.htmlMB} MB`}</span><ArrowDownToLine size={18} className="shrink-0" /></a>
            <a href={manualDownloads.pdf} download className="btn-ghost mt-4 w-full justify-between gap-3 text-left"><span>{isZh ? `图文阅读版（PDF）· ${manualDownloads.pdfMB} MB` : `Illustrated reading edition (PDF) · ${manualDownloads.pdfMB} MB`}</span><ArrowDownToLine size={18} className="shrink-0" /></a>
            <p className="mt-5 text-caption text-ink-400">{isZh ? '观看视频请打开在线手册。PDF中的图片为静态预览，视频附件需兼容阅读器。产品图为依据建模生成的设计效果，原厂配套保持原厂身份。' : 'Open the online handbook to watch videos. PDF images are static previews; its video attachments require a compatible reader. Product images are model-based design visualizations; original-manufacturer options retain their own identity.'}</p>
          </div>
        </div>
      </section>
    </>
  );
}

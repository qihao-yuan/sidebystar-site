import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  name?: string;
  org?: string;
  email?: string;
  phone?: string;
  scenario?: string;
  message?: string;
  // honeypot: real users never fill this; bots usually do.
  website?: string;
  locale?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ipHits = new Map<string, { count: number; first: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec || now - rec.first > RATE_WINDOW_MS) {
    ipHits.set(ip, { count: 1, first: now });
    return true;
  }
  rec.count += 1;
  return rec.count <= RATE_MAX;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );
}

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE ?? 'true').toLowerCase() === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (!rateLimit(ip)) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }

    const body = (await req.json().catch(() => ({}))) as Payload;

    if (body.website && body.website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name || '').trim();
    const org = (body.org || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const scenario = (body.scenario || '').trim();
    const message = (body.message || '').trim();
    const locale = (body.locale || 'zh-CN').trim();

    if (!name || !org || !email) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ ok: false, error: 'bad_email' }, { status: 400 });
    }
    if (name.length > 100 || org.length > 200 || phone.length > 50 || message.length > 5000) {
      return NextResponse.json({ ok: false, error: 'too_long' }, { status: 400 });
    }

    const transport = getTransport();
    const to = process.env.MAIL_TO || 'contact@sidebystar.com';
    const from = process.env.MAIL_FROM || `"SidebyStar Website" <${process.env.SMTP_USER || to}>`;

    const subject = `[sidebystar.com] ${scenario || 'contact'} - ${name} (${org})`;

    const rows = [
      ['姓名 / Name', name],
      ['机构 / Organization', org],
      ['邮箱 / Email', email],
      ['电话 / Phone', phone],
      ['场景 / Scenario', scenario],
      ['语言 / Locale', locale],
      ['IP', ip],
      ['时间 / Time', new Date().toISOString()],
    ];

    const text = rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n') + `\n\n--- 需求说明 / Message ---\n${message || '-'}`;

    const html = `
<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111;line-height:1.6">
  <h2 style="margin:0 0 12px">新的线索 / New Lead</h2>
  <table style="border-collapse:collapse;width:100%;max-width:640px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;width:180px">${esc(
            k,
          )}</td><td style="padding:6px 12px;border-bottom:1px solid #eee">${esc(v || '-')}</td></tr>`,
      )
      .join('')}
  </table>
  <h3 style="margin:20px 0 8px">需求说明 / Message</h3>
  <pre style="white-space:pre-wrap;background:#f6f7f9;padding:12px;border-radius:8px;font-family:ui-monospace,Consolas,monospace;font-size:13px">${esc(
    message || '-',
  )}</pre>
</div>`.trim();

    if (!transport) {
      console.warn('[contact] SMTP not configured, logging only:', { name, org, email, scenario });
      return NextResponse.json({ ok: true, note: 'logged' });
    }

    await transport.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 500 });
  }
}

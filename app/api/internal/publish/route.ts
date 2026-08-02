import { createHash, timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import {
  isValidIdempotencyKey,
  parseWebsitePublishEvent,
} from '@/lib/insights-webhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 4_096;

function safeEqual(left: string, right: string): boolean {
  const leftDigest = createHash('sha256').update(left).digest();
  const rightDigest = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function getRequestToken(request: Request): string {
  const explicit = request.headers.get('x-webhook-token');
  if (explicit) return explicit;
  const authorization = request.headers.get('authorization') || '';
  return authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
}

class PayloadTooLargeError extends Error {}

async function readLimitedBody(request: Request): Promise<string> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }
    chunks.push(value);
  }

  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString('utf8');
}

export async function POST(request: Request) {
  if (process.env.WEBSITE_INSTANT_REVALIDATE_ENABLED !== 'true') {
    return NextResponse.json(
      { ok: false, error: 'instant_revalidation_disabled' },
      { status: 503 },
    );
  }

  const configuredToken = process.env.WEBSITE_REVALIDATE_TOKEN || '';
  if (!configuredToken) {
    return NextResponse.json(
      { ok: false, error: 'revalidation_token_not_configured' },
      { status: 503 },
    );
  }

  const requestToken = getRequestToken(request);
  if (!requestToken || !safeEqual(requestToken, configuredToken)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  const idempotencyKey = request.headers.get('idempotency-key');
  if (!isValidIdempotencyKey(idempotencyKey)) {
    return NextResponse.json(
      { ok: false, error: 'invalid_idempotency_key' },
      { status: 400 },
    );
  }

  const contentLengthHeader = request.headers.get('content-length');
  const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;
  if (!Number.isFinite(contentLength) || contentLength < 0 || contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'payload_too_large' }, { status: 413 });
  }

  try {
    const rawBody = await readLimitedBody(request);
    const payload = parseWebsitePublishEvent(JSON.parse(rawBody));
    if (!payload) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
    }

    const { content } = payload;
    revalidateTag('articles');
    revalidateTag(`articles:${content.locale}`);
    revalidateTag(`article:${content.slug}`);
    revalidatePath(`/${content.locale}/insights`);
    revalidatePath(`/${content.locale}/insights/${content.slug}`);
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ ok: true, accepted: payload.type }, { status: 202 });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return NextResponse.json({ ok: false, error: 'payload_too_large' }, { status: 413 });
    }
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
}

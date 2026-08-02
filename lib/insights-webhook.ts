import {
  ARTICLE_ID_PATTERN,
  ARTICLE_SLUG_PATTERN,
  isValidIsoTimestamp,
} from '@/lib/insights-security';

export type WebsitePublishEvent = {
  type: 'article.published' | 'article.updated';
  channel: 'website';
  content: {
    id: string;
    slug: string;
    locale: 'zh-CN' | 'en';
    status: 'published';
    published_at: string;
    updated_at: string;
  };
};

const IDEMPOTENCY_KEY_PATTERN = /^[\x21-\x7E]{8,128}$/;

export function isValidIdempotencyKey(value: string | null): value is string {
  return typeof value === 'string' && IDEMPOTENCY_KEY_PATTERN.test(value);
}

export function parseWebsitePublishEvent(value: unknown): WebsitePublishEvent | null {
  if (!value || typeof value !== 'object') return null;
  const event = value as Record<string, unknown>;
  if (
    (event.type !== 'article.published' && event.type !== 'article.updated') ||
    event.channel !== 'website' ||
    !event.content ||
    typeof event.content !== 'object'
  ) {
    return null;
  }

  const content = event.content as Record<string, unknown>;
  if ('body' in content || 'body_html' in content) return null;
  if (
    typeof content.id !== 'string' ||
    !ARTICLE_ID_PATTERN.test(content.id) ||
    typeof content.slug !== 'string' ||
    !ARTICLE_SLUG_PATTERN.test(content.slug) ||
    (content.locale !== 'zh-CN' && content.locale !== 'en') ||
    content.status !== 'published' ||
    !isValidIsoTimestamp(content.published_at) ||
    !isValidIsoTimestamp(content.updated_at) ||
    Date.parse(content.updated_at) < Date.parse(content.published_at)
  ) {
    return null;
  }

  return event as WebsitePublishEvent;
}

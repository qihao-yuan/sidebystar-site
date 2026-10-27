import 'server-only';

import { unstable_cache } from 'next/cache';
import type { Locale } from '@/i18n/routing';
import {
  ARTICLE_ID_PATTERN,
  ARTICLE_SLUG_PATTERN,
  isMockContentAllowed,
  isValidCursor,
  isValidIsoTimestamp,
  sanitizeArticleHtml,
} from '@/lib/insights-security';

export const AIOS_REVALIDATE_SECONDS = 60;

export type AiosArticle = {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  body_html: string;
  cover_url: string;
  published_at: string;
  updated_at: string;
};

export type AiosArticleListResponse = {
  items: AiosArticle[];
  next_cursor: string | null;
  has_more: boolean;
};

export type ArticleListResult =
  | { status: 'ok'; data: AiosArticleListResponse }
  | { status: 'closed' }
  | { status: 'unavailable' };

export type ArticleDetailResult =
  | { status: 'ok'; data: AiosArticle }
  | { status: 'not_found' }
  | { status: 'unavailable' };

type ContentSource = 'mock' | 'api';

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:3001';
const MAX_LIST_LIMIT = 100;
const REQUEST_TIMEOUT_MS = 2_000;
const lastKnownNonEmptyLists = new Map<string, AiosArticleListResponse>();

const mockArticles: AiosArticle[] = [
  {
    id: 'article_001_zh',
    slug: 'opc-aios-v1',
    locale: 'zh-CN',
    title: 'OPC AIOS V1.0：让空间智能拥有可靠的本地底座',
    summary: '从感知、推理到联动，了解 OPC AIOS 如何在真实空间中提供端侧优先、可审计的智能能力。',
    body_html:
      '<p>OPC AIOS V1.0 是循星面向真实空间打造的本地智能底座。它把多模态感知、事件理解和设备联动放在空间现场完成，让关键能力不依赖持续联网。</p><h2>为什么从本地开始</h2><p>家庭与照护空间中的数据高度敏感。端侧优先可以缩短响应链路，也让数据边界更容易被理解和审计。</p><blockquote>真正可靠的空间智能，应当在断网时仍能完成最重要的工作。</blockquote><h2>V1.0 的三个重点</h2><ul><li><strong>统一事件模型：</strong>让不同设备以一致方式描述空间里发生的事。</li><li><strong>本地推理：</strong>关键判断在现场完成，云端只承担明确授权的能力。</li><li><strong>可追溯执行：</strong>每次自动化都有来源、规则和结果记录。</li></ul><h2>下一步</h2><p>我们将继续完善插件接口、离线模型包和行业部署工具，并逐步公开更多实践报告。</p>',
    cover_url: '/home/intelligence.webp',
    published_at: '2026-08-02T10:00:00Z',
    updated_at: '2026-08-02T10:00:00Z',
  },
  {
    id: 'article_001_en',
    slug: 'opc-aios-v1',
    locale: 'en',
    title: 'OPC AIOS V1.0: A dependable local foundation for ambient intelligence',
    summary: 'How OPC AIOS brings perception, reasoning and action together with an edge-first, auditable architecture.',
    body_html:
      '<p>OPC AIOS V1.0 is SidebyStar’s local intelligence foundation for real spaces. It brings multimodal perception, event understanding and device orchestration on site, keeping essential capabilities available without a permanent cloud connection.</p><h2>Why local comes first</h2><p>Data from homes and care environments is deeply personal. Edge-first processing shortens the response path and makes data boundaries easier to understand and audit.</p><blockquote>Dependable ambient intelligence should still perform its most important work when the network is unavailable.</blockquote><h2>Three priorities in V1.0</h2><ul><li><strong>A unified event model:</strong> devices describe what happens in a space consistently.</li><li><strong>Local inference:</strong> essential decisions happen on site, with cloud services used only when explicitly authorized.</li><li><strong>Traceable execution:</strong> every automation records its source, rule and result.</li></ul><h2>What comes next</h2><p>We will continue improving plugin interfaces, offline model bundles and industry deployment tools, while publishing more field reports.</p>',
    cover_url: '/home/intelligence.webp',
    published_at: '2026-08-02T10:00:00Z',
    updated_at: '2026-08-02T10:00:00Z',
  },
  {
    id: 'article_002_zh',
    slug: 'edge-first-care-spaces',
    locale: 'zh-CN',
    title: '端侧优先，如何改变照护空间里的响应方式',
    summary: '当告警、联动与审计回到现场，照护系统可以更快响应，也更容易建立清晰的数据边界。',
    body_html:
      '<p>照护空间需要的不只是更多传感器，而是一条更短、更可靠的响应链路。端侧智能让事件识别与必要联动在现场闭环。</p><h2>从告警到行动</h2><p>系统先在本地聚合环境与设备信号，再按照经过审批的规则执行通知、照明或设备联动。</p><h3>设计原则</h3><ol><li>关键能力不依赖公网。</li><li>原始数据默认留在现场。</li><li>每次自动执行都可复核。</li></ol><p>这不是把云完全移除，而是让云和本地各自承担适合的职责。</p>',
    cover_url: '/home/bedside.webp',
    published_at: '2026-07-26T09:00:00Z',
    updated_at: '2026-07-28T08:30:00Z',
  },
  {
    id: 'article_002_en',
    slug: 'edge-first-care-spaces',
    locale: 'en',
    title: 'How edge-first systems change response in care spaces',
    summary: 'Moving alerts, actions and audit trails on site enables faster response and clearer data boundaries.',
    body_html:
      '<p>Care environments need more than additional sensors. They need a shorter, more dependable response path. Edge intelligence closes the loop between event detection and essential action on site.</p><h2>From alert to action</h2><p>The system first combines environmental and device signals locally, then follows approved rules for notifications, lighting or device orchestration.</p><h3>Design principles</h3><ol><li>Essential capabilities do not depend on the public internet.</li><li>Raw data stays on site by default.</li><li>Every automated action can be reviewed.</li></ol><p>This does not remove the cloud. It gives the cloud and the edge responsibilities that fit each one.</p>',
    cover_url: '/home/bedside.webp',
    published_at: '2026-07-26T09:00:00Z',
    updated_at: '2026-07-28T08:30:00Z',
  },
];

function getContentSource(): ContentSource {
  return process.env.AIOS_CONTENT_SOURCE === 'api' ? 'api' : 'mock';
}

function getApiBaseUrl(): string {
  return (process.env.AIOS_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
}

function isLocale(value: unknown): value is Locale {
  return value === 'zh-CN' || value === 'en';
}

function isSafeCoverUrl(value: unknown): value is string {
  if (typeof value !== 'string' || value.length === 0) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;

  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
    if (url.hostname === 'cdn.sidebystar.com' && url.protocol === 'https:') return true;
    return (
      process.env.NODE_ENV !== 'production' &&
      process.env.AIOS_ALLOW_LOCAL_MINIO_IMAGES === 'true' &&
      url.hostname === '127.0.0.1' &&
      url.port === '9000'
    );
  } catch {
    return false;
  }
}

function parseArticle(value: unknown): AiosArticle {
  if (!value || typeof value !== 'object') throw new Error('Invalid article payload');
  const item = value as Record<string, unknown>;

  if (
    typeof item.id !== 'string' ||
    !ARTICLE_ID_PATTERN.test(item.id) ||
    typeof item.slug !== 'string' ||
    !ARTICLE_SLUG_PATTERN.test(item.slug) ||
    !isLocale(item.locale) ||
    typeof item.title !== 'string' ||
    typeof item.summary !== 'string' ||
    typeof item.body_html !== 'string' ||
    !isSafeCoverUrl(item.cover_url) ||
    !isValidIsoTimestamp(item.published_at) ||
    !isValidIsoTimestamp(item.updated_at) ||
    Date.parse(item.updated_at) < Date.parse(item.published_at)
  ) {
    throw new Error('Article does not match the public API contract');
  }

  return {
    id: item.id,
    slug: item.slug,
    locale: item.locale,
    title: item.title,
    summary: item.summary,
    body_html: sanitizeArticleHtml(item.body_html),
    cover_url: item.cover_url,
    published_at: item.published_at,
    updated_at: item.updated_at,
  };
}

function parseArticleList(value: unknown): AiosArticleListResponse {
  if (!value || typeof value !== 'object') throw new Error('Invalid article list payload');
  const payload = value as Record<string, unknown>;
  if (
    !Array.isArray(payload.items) ||
    (payload.next_cursor !== null && !isValidCursor(payload.next_cursor)) ||
    typeof payload.has_more !== 'boolean' ||
    (payload.has_more && !payload.next_cursor) ||
    (!payload.has_more && payload.next_cursor !== null)
  ) {
    throw new Error('Article list does not match the public API contract');
  }

  return {
    items: payload.items.map(parseArticle),
    next_cursor: payload.next_cursor as string | null,
    has_more: payload.has_more,
  };
}

async function fetchJson(url: string, allowNotFound = false): Promise<unknown | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (allowNotFound && response.status === 404) return null;
    if (!response.ok) throw new Error(`AIOS returned HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function getMockList(locale: Locale, limit: number, cursor?: string): AiosArticleListResponse {
  if (cursor !== undefined && !/^mock:\d{1,10}$/.test(cursor)) {
    throw new Error('Invalid mock cursor');
  }
  const offset = cursor ? Number(cursor.slice(5)) : 0;
  const safeOffset = Number.isInteger(offset) && offset >= 0 ? offset : 0;
  const available = mockArticles
    .filter((article) => article.locale === locale)
    .sort((a, b) => {
      const byDate = Date.parse(b.published_at) - Date.parse(a.published_at);
      return byDate || b.id.localeCompare(a.id);
    });
  const items = available.slice(safeOffset, safeOffset + limit).map((item) => parseArticle(item));
  const nextOffset = safeOffset + items.length;
  const hasMore = nextOffset < available.length;

  return {
    items,
    next_cursor: hasMore ? `mock:${nextOffset}` : null,
    has_more: hasMore,
  };
}

async function requestArticleList(
  locale: Locale,
  limit: number,
  cursor?: string,
): Promise<AiosArticleListResponse> {
  const url = new URL('/v1/public/articles', `${getApiBaseUrl()}/`);
  url.searchParams.set('locale', locale);
  url.searchParams.set('limit', String(limit));
  if (cursor !== undefined) url.searchParams.set('cursor', cursor);
  const result = parseArticleList(await fetchJson(url.toString()));
  const now = Date.now();
  if (
    result.items.some(
      (article) => article.locale !== locale || Date.parse(article.published_at) > now,
    )
  ) {
    throw new Error('AIOS returned non-public or wrong-locale content');
  }
  for (let index = 1; index < result.items.length; index += 1) {
    const previous = result.items[index - 1];
    const current = result.items[index];
    const dateOrder = Date.parse(previous.published_at) - Date.parse(current.published_at);
    if (dateOrder < 0 || (dateOrder === 0 && previous.id.localeCompare(current.id) < 0)) {
      throw new Error('AIOS article ordering does not match the public API contract');
    }
  }

  const fallbackKey = `${locale}:${limit}:${cursor || 'first'}`;
  const previous = lastKnownNonEmptyLists.get(fallbackKey);
  if (result.items.length === 0 && previous) {
    return previous;
  }
  if (result.items.length > 0) {
    lastKnownNonEmptyLists.set(fallbackKey, result);
  }
  return result;
}

async function requestArticle(locale: Locale, slug: string): Promise<AiosArticle | null> {
  const url = new URL(`/v1/public/articles/${encodeURIComponent(slug)}`, `${getApiBaseUrl()}/`);
  url.searchParams.set('locale', locale);
  const payload = await fetchJson(url.toString(), true);
  if (payload === null) return null;
  const article = parseArticle(payload);
  if (
    article.locale !== locale ||
    article.slug !== slug ||
    Date.parse(article.published_at) > Date.now()
  ) {
    throw new Error('AIOS returned non-public or mismatched article content');
  }
  return article;
}

function getCachedArticleList(locale: Locale, limit: number, cursor?: string) {
  return unstable_cache(
    () => requestArticleList(locale, limit, cursor),
    ['aios-article-list', locale, String(limit), cursor || 'first'],
    {
      revalidate: AIOS_REVALIDATE_SECONDS,
      tags: ['articles', `articles:${locale}`],
    },
  )();
}

function getCachedArticle(locale: Locale, slug: string) {
  return unstable_cache(
    () => requestArticle(locale, slug),
    ['aios-article', locale, slug],
    {
      revalidate: AIOS_REVALIDATE_SECONDS,
      tags: ['articles', `articles:${locale}`, `article:${slug}`],
    },
  )();
}

export async function getArticles({
  locale,
  limit = 20,
  cursor,
}: {
  locale: Locale;
  limit?: number;
  cursor?: string;
}): Promise<ArticleListResult> {
  const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), MAX_LIST_LIMIT);
  if (cursor !== undefined && !isValidCursor(cursor)) return { status: 'unavailable' };
  const source = getContentSource();
  if (source === 'mock' && !isMockContentAllowed()) return { status: 'closed' };

  try {
    const data =
      source === 'mock'
        ? getMockList(locale, safeLimit, cursor)
        : await getCachedArticleList(locale, safeLimit, cursor);
    return { status: 'ok', data };
  } catch (error) {
    console.error('[insights] article list unavailable', error instanceof Error ? error.message : 'unknown error');
    return { status: 'unavailable' };
  }
}

export async function getArticle(locale: Locale, slug: string): Promise<ArticleDetailResult> {
  if (!ARTICLE_SLUG_PATTERN.test(slug)) return { status: 'not_found' };
  const source = getContentSource();
  if (source === 'mock' && !isMockContentAllowed()) return { status: 'not_found' };

  try {
    const data =
      source === 'mock'
        ? mockArticles.find((article) => article.locale === locale && article.slug === slug) || null
        : await getCachedArticle(locale, slug);
    return data ? { status: 'ok', data: parseArticle(data) } : { status: 'not_found' };
  } catch (error) {
    console.error('[insights] article unavailable', error instanceof Error ? error.message : 'unknown error');
    return { status: 'unavailable' };
  }
}

export async function getAllArticlesForSitemap(locale: Locale): Promise<AiosArticle[]> {
  const collected: AiosArticle[] = [];
  let cursor: string | undefined;

  for (let page = 0; page < 100; page += 1) {
    const result = await getArticles({ locale, limit: MAX_LIST_LIMIT, cursor });
    if (result.status !== 'ok') return collected;
    collected.push(...result.data.items);
    if (!result.data.has_more || !result.data.next_cursor) break;
    cursor = result.data.next_cursor;
  }

  return collected;
}

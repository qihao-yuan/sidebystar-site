import assert from 'node:assert/strict';
import test from 'node:test';
import { POST } from '@/app/api/internal/publish/route';
import {
  isMockContentAllowed,
  isValidCursor,
  sanitizeArticleHtml,
} from '@/lib/insights-security';
import {
  isValidIdempotencyKey,
  parseWebsitePublishEvent,
} from '@/lib/insights-webhook';

const validEvent = {
  type: 'article.published',
  channel: 'website',
  content: {
    id: 'article_123',
    slug: 'opc-aios-v1',
    locale: 'zh-CN',
    status: 'published',
    published_at: '2026-08-02T10:00:00Z',
    updated_at: '2026-08-02T10:00:00Z',
  },
};

test('stored XSS payload is reduced to the article allowlist', () => {
  const malicious = [
    '<script>alert(1)</script>',
    '<style>body{display:none}</style>',
    '<iframe src="https://evil.example"></iframe>',
    '<svg onload="alert(1)"><circle /></svg>',
    '<object data="https://evil.example"></object>',
    '<embed src="https://evil.example">',
    '<form><input value="secret"><button>send</button></form>',
    '<p onclick="alert(1)">safe paragraph</p>',
    '<a href="javascript:alert(1)" onmouseover="alert(1)">bad link</a>',
    '<img src="data:text/html;base64,PHNjcmlwdD4=" onerror="alert(1)" alt="bad">',
    '<h2>Allowed heading</h2>',
  ].join('');

  const clean = sanitizeArticleHtml(malicious);
  assert.match(clean, /<p>safe paragraph<\/p>/);
  assert.match(clean, /<h2>Allowed heading<\/h2>/);
  assert.doesNotMatch(
    clean,
    /<(?:script|style|iframe|svg|object|embed|form|input|button)\b/i,
  );
  assert.doesNotMatch(clean, /\son[a-z]+\s*=/i);
  assert.doesNotMatch(clean, /(?:javascript|data):/i);
});

test('external article links receive safe rel attributes', () => {
  const clean = sanitizeArticleHtml(
    '<a href="https://external.example/post" target="_blank" rel="opener">Read</a>',
  );
  assert.equal(
    clean,
    '<a href="https://external.example/post" target="_blank" rel="noopener noreferrer">Read</a>',
  );
});

test('production mock content is blocked unless explicitly allowed', () => {
  assert.equal(isMockContentAllowed('production', undefined), false);
  assert.equal(isMockContentAllowed('production', 'false'), false);
  assert.equal(isMockContentAllowed('production', 'true'), true);
  assert.equal(isMockContentAllowed('development', undefined), true);
});

test('article cursors accept only bounded URL-safe opaque values', () => {
  assert.equal(isValidCursor('eyJpZCI6ImFydGljbGVfMTIzIn0='), true);
  assert.equal(isValidCursor('mock:20'), true);
  assert.equal(isValidCursor(''), false);
  assert.equal(isValidCursor('cursor with spaces'), false);
  assert.equal(isValidCursor('x'.repeat(513)), false);
});

test('website publish event enforces channel, public status and metadata', () => {
  assert.deepEqual(parseWebsitePublishEvent(validEvent), validEvent);

  const invalidEvents = [
    { ...validEvent, channel: 'mobile' },
    { ...validEvent, content: { ...validEvent.content, status: 'draft' } },
    { ...validEvent, content: { ...validEvent.content, locale: 'fr' } },
    { ...validEvent, content: { ...validEvent.content, slug: '../draft' } },
    { ...validEvent, content: { ...validEvent.content, id: 'bad id' } },
    { ...validEvent, content: { ...validEvent.content, updated_at: 'not-a-time' } },
    {
      ...validEvent,
      content: {
        ...validEvent.content,
        updated_at: '2026-08-01T10:00:00Z',
      },
    },
    { ...validEvent, content: { ...validEvent.content, body_html: '<p>body</p>' } },
  ];

  for (const event of invalidEvents) {
    assert.equal(parseWebsitePublishEvent(event), null);
  }
});

test('Idempotency-Key is mandatory, printable and bounded', () => {
  assert.equal(isValidIdempotencyKey('publish:article_123:20260802'), true);
  assert.equal(isValidIdempotencyKey(null), false);
  assert.equal(isValidIdempotencyKey('short'), false);
  assert.equal(isValidIdempotencyKey('x'.repeat(129)), false);
  assert.equal(isValidIdempotencyKey('invalid key with space'), false);
});

test('webhook returns fixed security status codes before cache refresh', async () => {
  const previousEnabled = process.env.WEBSITE_INSTANT_REVALIDATE_ENABLED;
  const previousToken = process.env.WEBSITE_REVALIDATE_TOKEN;

  try {
    process.env.WEBSITE_INSTANT_REVALIDATE_ENABLED = 'false';
    delete process.env.WEBSITE_REVALIDATE_TOKEN;
    let response = await POST(new Request('http://localhost/api/internal/publish'));
    assert.equal(response.status, 503);

    process.env.WEBSITE_INSTANT_REVALIDATE_ENABLED = 'true';
    response = await POST(new Request('http://localhost/api/internal/publish'));
    assert.equal(response.status, 503);

    process.env.WEBSITE_REVALIDATE_TOKEN = 'correct-secret';
    response = await POST(
      new Request('http://localhost/api/internal/publish', {
        method: 'POST',
        headers: { authorization: 'Bearer wrong-secret' },
      }),
    );
    assert.equal(response.status, 401);

    response = await POST(
      new Request('http://localhost/api/internal/publish', {
        method: 'POST',
        headers: { authorization: 'Bearer correct-secret' },
        body: JSON.stringify(validEvent),
      }),
    );
    assert.equal(response.status, 400);

    response = await POST(
      new Request('http://localhost/api/internal/publish', {
        method: 'POST',
        headers: {
          authorization: 'Bearer correct-secret',
          'idempotency-key': 'publish:oversized:20260802',
          'content-length': '5000',
        },
        body: '{}',
      }),
    );
    assert.equal(response.status, 413);
  } finally {
    if (previousEnabled === undefined) {
      delete process.env.WEBSITE_INSTANT_REVALIDATE_ENABLED;
    } else {
      process.env.WEBSITE_INSTANT_REVALIDATE_ENABLED = previousEnabled;
    }
    if (previousToken === undefined) {
      delete process.env.WEBSITE_REVALIDATE_TOKEN;
    } else {
      process.env.WEBSITE_REVALIDATE_TOKEN = previousToken;
    }
  }
});

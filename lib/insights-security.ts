import sanitizeHtml from 'sanitize-html';

export const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const ARTICLE_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
export const CURSOR_PATTERN = /^[A-Za-z0-9._~:=-]{1,512}$/;

const ISO_TIMESTAMP_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

export function isValidCursor(value: unknown): value is string {
  return typeof value === 'string' && CURSOR_PATTERN.test(value);
}

export function isMockContentAllowed(
  nodeEnv = process.env.NODE_ENV,
  allowInProduction = process.env.ALLOW_MOCK_CONTENT_IN_PRODUCTION,
): boolean {
  return nodeEnv !== 'production' || allowInProduction === 'true';
}

export function isValidIsoTimestamp(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    ISO_TIMESTAMP_PATTERN.test(value) &&
    Number.isFinite(Date.parse(value))
  );
}

function isExternalHref(href: string): boolean {
  try {
    const siteUrl = new URL(process.env.SITE_URL || 'https://sidebystar.com');
    return new URL(href, siteUrl).origin !== siteUrl.origin;
  } catch {
    return false;
  }
}

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'h2',
      'h3',
      'h4',
      'ul',
      'ol',
      'li',
      'blockquote',
      'strong',
      'em',
      'a',
      'code',
      'pre',
      'figure',
      'figcaption',
      'img',
      'br',
      'hr',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https'],
    allowedSchemesAppliedToAttributes: ['href', 'src'],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attribs) => {
        const href = attribs.href || '';
        const external = isExternalHref(href);
        const target =
          attribs.target === '_blank' || attribs.target === '_self'
            ? attribs.target
            : undefined;
        return {
          tagName: 'a',
          attribs: {
            ...(href ? { href } : {}),
            ...(attribs.title ? { title: attribs.title } : {}),
            ...(target ? { target } : {}),
            ...(external ? { rel: 'noopener noreferrer' } : {}),
          },
        };
      },
    },
  });
}

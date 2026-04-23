/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sidebystar.com',
  generateRobotsTxt: true,
  exclude: ['/labs/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/labs', '/api'] },
    ],
  },
  alternateRefs: [
    { href: 'https://sidebystar.com/zh-CN', hreflang: 'zh-CN' },
    { href: 'https://sidebystar.com/en', hreflang: 'en' },
  ],
};

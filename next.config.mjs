import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      { source: '/html/scenarios.html', destination: '/zh-CN/solutions', permanent: true },
      { source: '/html/scenario-elderly-care.html', destination: '/zh-CN/solutions/elderly-care', permanent: true },
      { source: '/html/scenario-home-guardian.html', destination: '/zh-CN/solutions/smart-home', permanent: true },
      { source: '/html/scenario-smart-home.html', destination: '/zh-CN/solutions/smart-home', permanent: true },
      { source: '/html/scenario-smart-room.html', destination: '/zh-CN/solutions/smart-room', permanent: true },
      { source: '/html/platform.html', destination: '/zh-CN/platform', permanent: true },
      { source: '/html/products.html', destination: '/zh-CN/products', permanent: true },
      { source: '/html/deployment.html', destination: '/zh-CN/products', permanent: true },
      { source: '/html/cases.html', destination: '/zh-CN/cases', permanent: true },
      { source: '/html/pilot.html', destination: '/zh-CN/pilot', permanent: true },
      { source: '/html/about.html', destination: '/zh-CN/company/about', permanent: true },
      { source: '/html/team.html', destination: '/zh-CN/company/team', permanent: true },
      { source: '/html/partners.html', destination: '/zh-CN/company/partners', permanent: true },
      { source: '/html/contact.html', destination: '/zh-CN/contact', permanent: true },
      { source: '/html/privacy.html', destination: '/zh-CN/privacy', permanent: true },
      { source: '/html/docs.html', destination: '/zh-CN/developers', permanent: true },
      { source: '/html/docs-ess-api.html', destination: '/zh-CN/developers/api', permanent: true },
      { source: '/html/community.html', destination: '/zh-CN/developers', permanent: true },
      { source: '/html/plugins.html', destination: '/zh-CN/developers/plugins', permanent: true },
      { source: '/html/aios-3d-demo.html', destination: '/zh-CN/platform', permanent: true },
      { source: '/html/aios-showcase.html', destination: '/zh-CN/platform', permanent: true },
      { source: '/html/mbti-test.html', destination: '/zh-CN/labs', permanent: true },
      { source: '/html/mbti-result.html', destination: '/zh-CN/labs', permanent: true },
      { source: '/html/product_test.html', destination: '/zh-CN/labs', permanent: true },
      { source: '/html/info-yuanqh.html', destination: '/zh-CN/labs', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

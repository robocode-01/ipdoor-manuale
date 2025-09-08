import nextI18NextConfig from './next-i18next.config.js';
/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [{ source: "/", destination: "/docs", permanent: false }];
  },
};

export default nextConfig;

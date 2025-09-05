import nextI18NextConfig from './next-i18next.config.js';
/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ⬇️ non bloccare i build in presenza di errori ESLint
    ignoreDuringBuilds: true,
  },
  // opzionale: se volessi anche ignorare errori TS nei build
  // typescript: { ignoreBuildErrors: true },
  
  reactStrictMode: true, i18n: nextI18NextConfig.i18n
};

export default nextConfig;

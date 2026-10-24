import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  distDir: '.next-release',
  experimental: { cpus: 1, staticGenerationMaxConcurrency: 1 },
};
export default config;

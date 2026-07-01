/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;

// Cho phép getCloudflareContext() hoạt động khi chạy `next dev` (no-op ở production build).
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

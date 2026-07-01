/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Bắt buộc cho @opennextjs/cloudflare khi build Next tách rồi bundle với
  // `--skipNextBuild` (opennext đọc .next/standalone).
  output: 'standalone',
};

export default nextConfig;

// Cho phép getCloudflareContext() hoạt động khi chạy `next dev` (no-op ở production build).
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();

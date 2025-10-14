/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // temporarily ignore ESLint errors
  },
  reactStrictMode: true,
}

module.exports = nextConfig;

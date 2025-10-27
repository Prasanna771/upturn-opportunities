/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // temporarily ignore ESLint errors
  },
  reactStrictMode: true,
  
  // --- Add this block ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // --- End of added block ---
};

module.exports = nextConfig;
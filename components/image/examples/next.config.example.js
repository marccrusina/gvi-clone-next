/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'staging-media.example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'preview-stageprodgrandvision.luxgroup.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'preview-stageuatgrandvision.luxgroup.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.grandvision.it',
        port: '',
        pathname: '/**',
      },
    ],
    // Optional: Configure image optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optional: Enable experimental features
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

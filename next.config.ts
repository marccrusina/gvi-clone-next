import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.grandvision.it',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www-gviuatlive.luxgroup.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Turbopack configuration
  turbopack: {
    // Turbopack-specific configurations can be added here if needed
    // Path aliases are handled by TypeScript configuration
  },
}

export default nextConfig

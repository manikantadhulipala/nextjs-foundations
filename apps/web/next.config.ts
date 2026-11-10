import type { NextConfig } from 'next';

// Use environment variable in production, localhost in development
const blogUrl = process.env.BLOG_URL || 'http://localhost:3001';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true, // Enable Instant Navigations
  images: {
    // Match Tailwind breakpoints: sm, md, lg, xl, 2xl
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    // Thumbnail and avatar sizes used in the UI
    imageSizes: [32, 48, 64, 96, 128, 192, 256],
    // Allowlist of quality values used by <Image quality={...}>
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  cacheLife: {
    // Product catalog - moderate cache
    products: {
      stale: 300, // 5 minutes in the client router cache
      revalidate: 900, // 15 minutes before revalidation
      expire: 3600, // 1 hour max
    },
  },
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: `${blogUrl}/blog`,
      },
      {
        source: '/blog/:path*',
        destination: `${blogUrl}/blog/:path*`,
      },
      {
        source: '/blog-static/:path+',
        destination: `${blogUrl}/blog-static/:path+`,
      },
    ];
  },
};

export default nextConfig;

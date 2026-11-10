import type { NextConfig } from 'next';

// Use environment variable in production, localhost in development
const blogUrl = process.env.BLOG_URL || 'http://localhost:3001';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true, // Enable Instant Navigations
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

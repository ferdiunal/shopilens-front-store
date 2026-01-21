import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Strict Mode
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },

  // Image Optimization configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compiler options for production
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Security Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Multi-zone Rewrites
  async rewrites() {
    return [
      {
        source: '/:lang/cart',
        destination: 'http://localhost:3001/:lang/cart',
      },
      {
        source: '/:lang/cart/api/:path*',
        destination: 'http://localhost:3001/:lang/cart/api/:path*',
      },
      {
        source: '/cart/api/:path*',
        destination: 'http://localhost:3001/tr/cart/api/:path*',
      },
      {
        // Sepet uygulamasının statik dosyaları (basePath olmadığı için direkt _next)
        source: '/_next/static/:path*',
        destination: 'http://localhost:3001/_next/static/:path*',
        has: [
          {
            type: 'header',
            key: 'referer',
            value: '.*\/cart.*',
          },
        ],
      },
    ];
  },
};

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

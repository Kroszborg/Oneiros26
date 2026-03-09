import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS — enable once HTTPS is confirmed on production
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
  },

  webpack(config, { isServer }) {
    // GLB and video as static assets (served from /public)
    config.module.rules.push(
      { test: /\.(glb|gltf)$/, type: 'asset/resource' },
      { test: /\.(webm|mp4)$/, type: 'asset/resource' },
    );

    // Split Three.js into its own async chunk so it doesn't delay FCP
    if (!isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...(config.optimization.splitChunks as { cacheGroups?: Record<string, unknown> })?.cacheGroups,
          three: {
            test: /[\\/]node_modules[\\/]three[\\/]/,
            name: 'three',
            chunks: 'async',
            priority: 30,
          },
          motion: {
            test: /[\\/]node_modules[\\/]motion[\\/]/,
            name: 'motion',
            chunks: 'async',
            priority: 20,
          },
        },
      };
    }

    return config;
  },

  // Three.js runs only on the client — exclude from server bundle entirely
  serverExternalPackages: ['three', '@use-gesture/react'],

  // gzip / brotli on all responses
  compress: true,

  // Remove X-Powered-By header
  poweredByHeader: false,

  async headers() {
    return [
      // Security headers on every response
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Immutable Next.js hashed static assets
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // GLB models
      {
        source: '/:path*.glb',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
          { key: 'Vary', value: 'Accept-Encoding' },
        ],
      },
      // Optimised images
      {
        source: '/:path*.webp',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Video
      {
        source: '/:path*.webm',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;

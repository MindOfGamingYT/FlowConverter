/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This ignores the red text errors during building
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores linting warnings during building
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

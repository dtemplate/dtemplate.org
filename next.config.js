/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
  },
  staticPageGenerationTimeout: 60 * 60, // 1 hour
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    GITHUB_MAIN_ACCOUNT_ACCESS_TOKEN:
      process.env.GITHUB_MAIN_ACCOUNT_ACCESS_TOKEN,
  },
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

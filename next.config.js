/** @type {import('next').NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 60 * 60, // 1 hour
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    GITHUB_MAIN_ACCOUNT_ACCESS_TOKEN:
      process.env.GITHUB_MAIN_ACCOUNT_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;

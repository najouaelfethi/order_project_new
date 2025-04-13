/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // optional
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // <- this disables blocking on TS errors
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "d3b7ca3kks92i5.cloudfront.net",
      "scorebig-brand.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig

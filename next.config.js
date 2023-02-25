/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    apiEndpoint: process.env.API_ENDPOINT
  },
  trailingSlash: true
}

module.exports = nextConfig

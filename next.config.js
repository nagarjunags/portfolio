/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Enable Server Actions
  },
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"],
    },
  },
};

module.exports = nextConfig;

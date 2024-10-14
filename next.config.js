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
  images: {
    domains: ["lh3.googleusercontent.com"], // Allow images from Google (for profile pictures)
  },
};

module.exports = nextConfig;

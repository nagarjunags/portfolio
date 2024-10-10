/** @type {import('next').NextConfig} */
const nextConfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["src/*"],
    },
  },
};

module.exports = nextConfig;

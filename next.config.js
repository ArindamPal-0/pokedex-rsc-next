/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arindampal-0.github.io",
      },
    ],
  },
};

module.exports = nextConfig;

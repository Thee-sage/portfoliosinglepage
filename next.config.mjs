/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use modern formats for much smaller file sizes
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
    // Aggressive caching: 7 days
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;

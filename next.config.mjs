/** @type {import('next').NextConfig} */
const nextConfig = {
  revalidate: 60, // Revalidate the page every 60 seconds
  images: {
    domains: [
      "api.microlink.io",
    ],
  },
};

export default nextConfig;

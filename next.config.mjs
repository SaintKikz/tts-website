/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real photos go in /public/images and /public/vehicles. Add remote
    // hosts here if you later serve images from a CDN.
    remotePatterns: [],
  },
};

export default nextConfig;

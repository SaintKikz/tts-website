/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real photos go in /public/images and /public/vehicles. Add remote
    // hosts here if you later serve images from a CDN.
    remotePatterns: [],
  },
  eslint: {
    // Don't fail the production build on lint findings (run `npm run lint`
    // separately in dev). TypeScript type-checking still runs during build.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

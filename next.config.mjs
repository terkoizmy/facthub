/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'famous-beagle-49.convex.site',
      },
    ],
  },
}

export default nextConfig

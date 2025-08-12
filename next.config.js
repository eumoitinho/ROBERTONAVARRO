/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    {
      protocol: 'http',
      hostname: 'img.youtube.com',
    }
    ],
  },
  serverExternalPackages: ['sanity', '@sanity/vision'],
  webpack: (config, { isServer }) => {
    // Fix for Sanity/Jest worker issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
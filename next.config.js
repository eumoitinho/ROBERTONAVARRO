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
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  // Exclude static assets from being treated as pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  async headers() {
    return [
      {
        source: '/:path*.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configurar webpack para tratar Payload como externo no servidor
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Garantir que Payload seja tratado como externo usando função
      const originalExternals = config.externals
      config.externals = [
        ...(Array.isArray(originalExternals) ? originalExternals : [originalExternals].filter(Boolean)),
        ({ request }, callback) => {
          // Tratar módulos do Payload como externos
          if (
            request === 'payload' ||
            request === 'payload/dist/payload' ||
            request?.startsWith('@payloadcms/') ||
            request?.startsWith('payload/')
          ) {
            return callback(null, `commonjs ${request}`)
          }
          // Deixar webpack processar outros módulos normalmente
          callback()
        },
      ]
    }
    return config
  },
}

module.exports = nextConfig
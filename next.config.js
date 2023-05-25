/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
    redirects: async () => {
        return [
          {
            source: '/',
            destination: '/products',
            permanent: false,
          },
        ]
    }
}

module.exports = nextConfig

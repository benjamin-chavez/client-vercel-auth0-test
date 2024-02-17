/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path',
        destination: '/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        // destination: 'http://localhost:5000/api/:path*',
        destination: 'https://vercel-express-auth0-test.vercel.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

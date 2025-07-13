// next.config.js (for Next.js)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use localhost instead of 0.0.0.0
  async rewrites() {
    return []
  },
  // Configure server options
  server: {
    host: 'localhost', // or '127.0.0.1'
    port: 3000
  }
}
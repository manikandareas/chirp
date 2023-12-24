/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'NEXTAUTH_SECRET',
    },
    transpilePackages: ['@chirp/dto'],
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https"
            }
        ]
    }
}

module.exports = nextConfig

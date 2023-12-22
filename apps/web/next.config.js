/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'NEXTAUTH_SECRET',
    },
    transpilePackages: ['@chirp/dto'],
    reactStrictMode: true,
}

module.exports = nextConfig

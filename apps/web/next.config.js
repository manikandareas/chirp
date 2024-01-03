/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'NEXTAUTH_SECRET',
        BACKEND_URL: process.env.BACKEND_URL
    },
    transpilePackages: ['@chirp/dto', '@chirp/api'],
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https"
            },
            {
                hostname: "chirp-app-images.s3.ap-southeast-1.amazonaws.com",
                protocol: "https"
            }
        ]
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "http://localhost:8000" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
}

module.exports = nextConfig

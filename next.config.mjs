/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",
            },
            {
                protocol: "https",
                hostname: "cdn.simpleicons.org",
            },
            {
                protocol: "https",
                hostname: "imgs.search.brave.com",
            },
            {
                protocol: "https",
                hostname: "cdn.hashnode.com",
            },
            {
                protocol: "https",
                hostname: "hashnode.imgix.net",
            },
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/.well-known/webmcp.json",
                destination: "/api/webmcp",
            },
        ];
    },
};

export default nextConfig;
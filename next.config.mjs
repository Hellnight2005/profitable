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
        ],
    },
};

export default nextConfig;
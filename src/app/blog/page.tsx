import fs from 'fs/promises';
import path from 'path';
import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
    title: "Blog & Technical Writing | Abhijeet Shinde",
    description: "Read technical articles on DevOps, AWS cloud systems, Docker workflow engineering, and software engineering by Abhijeet Shinde.",
    keywords: ["DevOps", "AWS", "Docker", "Kubernetes", "System Design", "Cloud Native", "Abhijeet Shinde", "Portfolio"],
    openGraph: {
        title: "Blog & Technical Writing | Abhijeet Shinde",
        description: "Read technical articles on DevOps, AWS cloud systems, Docker workflow engineering, and software engineering by Abhijeet Shinde.",
        url: "https://profitable-azure.vercel.app/blog",
        type: "website",
        siteName: "Abhijeet Shinde Portfolio",
        images: [
            {
                url: "/brgrounf_less.png",
                width: 1200,
                height: 630,
                alt: "Blog & Technical Writing | Abhijeet Shinde",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog & Technical Writing | Abhijeet Shinde",
        description: "Read technical articles on DevOps, AWS cloud systems, Docker workflow engineering, and software engineering by Abhijeet Shinde.",
        images: ["/brgrounf_less.png"],
    }
};

async function getPosts() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'blog', 'posts.json');
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Failed to read posts.json on server:", error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();
    return <BlogClient initialPosts={posts} />;
}

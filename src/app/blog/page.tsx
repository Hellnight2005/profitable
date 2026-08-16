import { Metadata } from 'next';
import BlogClient from './BlogClient';
import { getBlogPostsFromRSS } from '@/lib/rss';

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

export default async function BlogPage() {
    const posts = await getBlogPostsFromRSS();
    return <BlogClient initialPosts={posts} />;
}

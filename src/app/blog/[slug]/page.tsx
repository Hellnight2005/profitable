import fs from 'fs/promises';
import path from 'path';
import { redirect } from 'next/navigation';

interface BlogPost {
  title: string;
  slug: string;
  domain: string;
  url: string;
  publishedAt: string;
  brief: string;
  category: string;
  series: string | null;
  tags: string[];
}

export default async function BlogRedirectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const filePath = path.join(process.cwd(), 'public', 'blog', 'posts.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const posts: BlogPost[] = JSON.parse(fileContent);
    const post = posts.find((p) => p.slug === slug);

    if (post && post.url) {
      redirect(post.url);
    }
  } catch (error) {
    console.error("Failed to redirect blog post:", error);
  }

  // Fallback: redirect to main blog list page if post not found
  redirect('/blog');
}

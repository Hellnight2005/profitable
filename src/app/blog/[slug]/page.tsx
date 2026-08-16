import { redirect } from 'next/navigation';
import { getBlogPostsFromRSS } from '@/lib/rss';

export default async function BlogRedirectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const posts = await getBlogPostsFromRSS();
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


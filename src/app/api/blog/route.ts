import { NextResponse } from 'next/server';
import { getBlogPostsFromRSS } from '@/lib/rss';

export const revalidate = 3600; // Revalidate every 1 hour

export async function GET() {
  try {
    const posts = await getBlogPostsFromRSS();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

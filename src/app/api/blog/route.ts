import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostsFromRSS } from '@/lib/rss';

export const revalidate = 3600; // Revalidate every 1 hour

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    let posts = await getBlogPostsFromRSS();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase();
    const category = searchParams.get('category')?.toLowerCase();

    if (query) {
      posts = posts.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.brief?.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (category) {
      posts = posts.filter((p) => p.category?.toLowerCase().includes(category));
    }

    return NextResponse.json(posts, { headers: corsHeaders });
  } catch (error) {
    console.error('API /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500, headers: corsHeaders });
  }
}


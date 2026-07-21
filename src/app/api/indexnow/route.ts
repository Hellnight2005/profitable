import { NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';
import sitemap from '@/app/sitemap';

/**
 * POST /api/indexnow
 * Accepts JSON payload: { urls?: string[] }
 * If urls array is provided, submits those URLs to IndexNow.
 * Otherwise, fetches all URLs from sitemap and submits them.
 */
export async function POST(request: Request) {
  try {
    let urls: string[] = [];
    
    try {
      const body = await request.json();
      if (Array.isArray(body?.urls) && body.urls.length > 0) {
        urls = body.urls;
      }
    } catch {
      // Body empty or invalid JSON, fallback to sitemap URLs
    }

    if (urls.length === 0) {
      const sitemapEntries = await sitemap();
      urls = sitemapEntries.map((entry) => entry.url);
    }

    const result = await submitToIndexNow({ urls });

    return NextResponse.json(result, { status: result.success ? 200 : result.status || 500 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: `IndexNow API route error: ${message}` },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * Submits all URLs from sitemap to IndexNow.
 */
export async function GET() {
  try {
    const sitemapEntries = await sitemap();
    const urls = sitemapEntries.map((entry) => entry.url);

    const result = await submitToIndexNow({ urls });

    return NextResponse.json(result, { status: result.success ? 200 : result.status || 500 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, message: `IndexNow API route error: ${message}` },
      { status: 500 }
    );
  }
}

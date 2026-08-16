import { XMLParser } from 'fast-xml-parser';

export interface BlogPost {
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

const HASHNODE_FEEDS = [
  { host: 'weeklyupdate.hashnode.dev', category: 'Weekly Updates' },
  { host: 'hackathon-diaries.hashnode.dev', category: 'Hackathon Diaries' },
  { host: 'projectlog.hashnode.dev', category: 'Project Logs' },
  { host: 'my-git-revelation.hashnode.dev', category: 'The Architecture Lab' },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

interface RawRssItem {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  'content:encoded'?: string;
  category?: string | string[];
}

export async function getBlogPostsFromRSS(): Promise<BlogPost[]> {
  const allPosts: BlogPost[] = [];

  for (const item of HASHNODE_FEEDS) {
    try {
      const res = await fetch(`https://${item.host}/rss.xml`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        console.error(`Failed to fetch RSS for ${item.host}: status ${res.status}`);
        continue;
      }

      const xmlString = await res.text();
      const jsonObj = parser.parse(xmlString);
      const items = jsonObj.rss?.channel?.item;
      const rawPosts: RawRssItem[] = items ? (Array.isArray(items) ? items : [items]) : [];

      const formatted: BlogPost[] = rawPosts.map((post: RawRssItem) => {
        const url = post.link || '';
        const slug = url.split('/').pop()?.split('?')[0] || '';
        const briefRaw = post.description || post['content:encoded'] || '';
        const brief = briefRaw.replace(/<[^>]*>?/gm, '').slice(0, 300).trim();

        let tags: string[] = [];
        if (post.category) {
          tags = Array.isArray(post.category) ? post.category : [post.category];
        }

        return {
          title: post.title || 'Untitled Post',
          slug,
          domain: item.host,
          url,
          publishedAt: post.pubDate ? new Date(post.pubDate).toISOString() : new Date().toISOString(),
          brief,
          category: item.category,
          series: null,
          tags,
        };
      });

      allPosts.push(...formatted);
    } catch (error) {
      console.error(`Error fetching RSS feed for ${item.host}:`, error);
    }
  }

  return allPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

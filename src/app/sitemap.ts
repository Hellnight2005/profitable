import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

interface GithubRepo {
    name: string;
    isPinned: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://profitable-azure.vercel.app';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic project routes
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const filePath = path.join(process.cwd(), 'public', 'projects.json');
    if (fs.existsSync(filePath)) {
      const fileContents = await fs.promises.readFile(filePath, 'utf8');
      const repos: GithubRepo[] = JSON.parse(fileContents);
      
      dynamicRoutes = repos.map((repo) => ({
        url: `${baseUrl}/projects/${repo.name}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error reading projects.json for sitemap:", error);
  }

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogFilePath = path.join(process.cwd(), 'public', 'blog', 'posts.json');
    if (fs.existsSync(blogFilePath)) {
      const fileContents = await fs.promises.readFile(blogFilePath, 'utf8');
      const posts = JSON.parse(fileContents);
      
      blogRoutes = posts.map((post: { slug: string; publishedAt: string }) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error reading posts.json for sitemap:", error);
  }

  return [...staticRoutes, ...dynamicRoutes, ...blogRoutes];
}

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://profitable-azure.vercel.app';
const KEY = process.env.INDEXNOW_KEY || '8b016aaef66f439898e5fc7f404f7285';

async function main() {
  console.log(`🚀 Starting IndexNow submission for ${SITE_URL}...`);
  console.log(`🔑 Key: ${KEY}`);

  const baseUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
  const hostName = new URL(baseUrl).hostname;

  // Static routes
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/about`,
    `${baseUrl}/projects`,
    `${baseUrl}/skills`,
    `${baseUrl}/blog`,
    `${baseUrl}/contact`,
  ];

  // Dynamic project routes
  try {
    const projectsPath = path.join(PROJECT_ROOT, 'public', 'projects.json');
    const projectsData = await fs.readFile(projectsPath, 'utf8');
    const repos = JSON.parse(projectsData);
    if (Array.isArray(repos)) {
      repos.forEach((repo) => {
        if (repo.name) {
          urls.push(`${baseUrl}/projects/${repo.name}`);
        }
      });
    }
  } catch (err) {
    console.warn('⚠️ Could not load public/projects.json:', err.message);
  }

  // Dynamic blog routes
  try {
    const blogPath = path.join(PROJECT_ROOT, 'public', 'blog', 'posts.json');
    const blogData = await fs.readFile(blogPath, 'utf8');
    const posts = JSON.parse(blogData);
    if (Array.isArray(posts)) {
      posts.forEach((post) => {
        if (post.slug) {
          urls.push(`${baseUrl}/blog/${post.slug}`);
        }
      });
    }
  } catch (err) {
    console.warn('⚠️ Could not load public/blog/posts.json:', err.message);
  }

  console.log(`📍 Found ${urls.length} URLs to submit:`);
  urls.forEach((u) => console.log(`   - ${u}`));

  const payload = {
    host: hostName,
    key: KEY,
    keyLocation: `${baseUrl}/${KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`\n📡 IndexNow HTTP Status: ${response.status} ${response.statusText}`);

    if (response.status === 200 || response.status === 202) {
      console.log('✅ URLs submitted successfully to IndexNow / Bing!');
    } else {
      console.error(`❌ Failed to submit to IndexNow. HTTP Status Code: ${response.status}`);
      const text = await response.text();
      if (text) console.error('Response details:', text);
    }
  } catch (error) {
    console.error('❌ Error calling IndexNow endpoint:', error);
  }
}

main();

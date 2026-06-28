import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';
import puppeteer from 'puppeteer-core';

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const config = [
    { host: "weeklyupdate.hashnode.dev", category: "Weekly Updates" },
    { host: "hackathon-diaries.hashnode.dev", category: "Hackathon Diaries" },
    { host: "projectlog.hashnode.dev", category: "Project Logs" }
];

async function getChromePath() {
    const winPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    const linuxPath = '/usr/bin/google-chrome';
    const macPath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

    try {
        await fs.access(winPath);
        return winPath;
    } catch {}
    try {
        await fs.access(linuxPath);
        return linuxPath;
    } catch {}
    try {
        await fs.access(macPath);
        return macPath;
    } catch {}
    
    if (process.platform === 'linux') return 'google-chrome';
    if (process.platform === 'darwin') return 'Google Chrome';
    return null;
}

async function fetchAllHashnodePosts() {
    console.log("Starting Hashnode API RSS Fetch...");
    let allPosts = [];

    const executablePath = await getChromePath();
    console.log("Using Chrome path:", executablePath);

    if (!executablePath) {
        console.error("Chrome executable not found! Make sure Google Chrome is installed.");
        process.exit(1);
    }

    const browser = await puppeteer.launch({
        executablePath,
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled'
        ]
    });

    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
    });

    for (const item of config) {
        const host = item.host;
        const category = item.category;
        console.log(`Fetching RSS feed for ${host} (${category})...`);

        try {
            const page = await browser.newPage();
            
            // Bypass webdriver detection
            await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'webdriver', {
                    get: () => false,
                });
            });

            // Set real browser User-Agent and viewport
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
            await page.setViewport({ width: 1280, height: 800 });
            await page.setExtraHTTPHeaders({
                'accept-language': 'en-US,en;q=0.9',
            });

            // Go to the RSS feed URL
            await page.goto(`https://${host}/rss.xml`, { waitUntil: 'domcontentloaded', timeout: 30000 });
            
            // Wait for Vercel Security Checkpoint to resolve and redirect
            let xmlString = '';
            const startTime = Date.now();
            while (Date.now() - startTime < 15000) {
                const content = await page.content();
                if (content.includes('<rss') || content.includes('<channel') || !content.includes('Vercel Security Checkpoint')) {
                    try {
                        xmlString = await page.evaluate(async () => {
                            const res = await fetch('/rss.xml');
                            return res.text();
                        });
                        if (xmlString.includes('<rss') || xmlString.includes('<channel')) {
                            break;
                        }
                    } catch (e) {
                        // Wait and try again
                    }
                }
                await new Promise(r => setTimeout(r, 1000));
            }
            await page.close();

            if (!xmlString) {
                console.error(`  - Failed to load XML feed content for ${host}`);
                continue;
            }

            const jsonObj = parser.parse(xmlString);
            const items = jsonObj.rss?.channel?.item;
            const rawPosts = items ? (Array.isArray(items) ? items : [items]) : [];

            const formattedPosts = rawPosts.map((post) => {
                const url = post.link;
                const slug = url.split('/').pop().split('?')[0];
                
                // Get brief (strip HTML)
                const briefRaw = post.description || post['content:encoded'] || '';
                const brief = briefRaw.replace(/<[^>]*>?/gm, '').slice(0, 300).trim();

                // Get tags
                let tags = [];
                if (post.category) {
                    tags = Array.isArray(post.category) ? post.category : [post.category];
                }

                return {
                    title: post.title,
                    slug: slug,
                    domain: host,
                    url: url,
                    publishedAt: new Date(post.pubDate).toISOString(),
                    brief: brief,
                    category: category,
                    series: null, // RSS does not explicitly provide Series name in standard fields
                    tags: tags
                };
            });

            allPosts = [...allPosts, ...formattedPosts];
            console.log(`  - Added ${formattedPosts.length} posts.`);

        } catch (error) {
            console.error(`Failed to fetch ${host}:`, error);
        }
    }

    await browser.close();

    // Sort all posts by date descending
    allPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (allPosts.length === 0) {
        console.error("Error: Fetch compiled 0 posts. Skipping write to prevent overwriting existing data with an empty array.");
        process.exit(1);
    }

    // Ensure public directory exists
    const outputDir = path.join(PROJECT_ROOT, 'public', 'blog');
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'posts.json');
    await fs.writeFile(outputPath, JSON.stringify(allPosts, null, 2));

    console.log("Successfully compiled " + allPosts.length + " posts to " + outputPath);
}

fetchAllHashnodePosts();

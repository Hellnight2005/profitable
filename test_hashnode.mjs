import fs from 'fs/promises';
import { XMLParser } from 'fast-xml-parser';
import puppeteer from 'puppeteer-core';

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

async function fetchAll() {
    const executablePath = await getChromePath();
    console.log("Using Chrome path:", executablePath);

    if (!executablePath) {
        console.error("Chrome executable not found!");
        return;
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
            console.log("  - Waiting for Vercel Security Checkpoint to resolve...");
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

            console.log("  - Extracted XML length:", xmlString.length);
            console.log("  - Extracted XML start:", xmlString.slice(0, 300));

            const jsonObj = parser.parse(xmlString);
            const items = jsonObj.rss?.channel?.item;
            const rawPosts = items ? (Array.isArray(items) ? items : [items]) : [];

            console.log(`  - Successfully parsed ${rawPosts.length} posts.`);
            if (rawPosts.length > 0) {
                const first = rawPosts[0];
                const slug = first.link ? first.link.split('/').pop().split('?')[0] : '';
                console.log(`    First post title: "${first.title}"`);
                console.log(`    Slug: "${slug}"`);
                console.log(`    PubDate: "${first.pubDate}"`);
                console.log(`    URL: "${first.link}"`);
            }
        } catch (error) {
            console.error(`  - Failed to fetch/parse for ${host}:`, error);
        }
    }

    await browser.close();
}

fetchAll();

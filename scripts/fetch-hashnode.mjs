import fs from 'fs/promises';
import path from 'path';

const query = `
  query GetPublication($host: String!) {
    publication(host: $host) {
      id
      title
      posts(first: 20) {
        edges {
          node {
            title
            slug
            publishedAt
            brief
            tags {
               name
               slug
            }
            series {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

const config = [
    { host: "weeklyupdate.hashnode.dev", category: "Weekly Updates" },
    { host: "hackathon-diaries.hashnode.dev", category: "Hackathon Diaries" },
    { host: "projectlog.hashnode.dev", category: "Project Logs" }
];

async function fetchAllHashnodePosts() {
    console.log("Starting Hashnode API JSON Fetch...");
    let allPosts = [];

    for (const item of config) {
        const host = item.host;
        const category = item.category;

        try {
            console.log("Fetching " + category + " from " + host + "...");
            const res = await fetch('https://gql.hashnode.com/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables: { host } })
            });

            const json = await res.json();
            if (json.errors) {
                console.error("GraphQL Error on " + host + ":", json.errors);
                continue;
            }

            const rawPosts = json.data?.publication?.posts?.edges || [];
            const formattedPosts = rawPosts.map((edge) => {
                const node = edge.node;
                return {
                    title: node.title,
                    slug: node.slug,
                    domain: host,
                    url: "https://" + host + "/" + node.slug,
                    publishedAt: node.publishedAt,
                    brief: node.brief ? node.brief.replace(/<[^>]*>?/gm, '') : '',
                    category: category,
                    series: node.series ? node.series.name : null,
                    tags: node.tags ? node.tags.map(t => t.name) : []
                };
            });

            allPosts = [...allPosts, ...formattedPosts];
            console.log("  - Added " + formattedPosts.length + " posts.");

        } catch (error) {
            console.error("Failed to fetch " + host, error);
        }
    }

    // Sort all posts by date descending
    allPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    // Ensure public directory exists
    const outputDir = path.join(process.cwd(), 'public', 'blog');
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'posts.json');
    await fs.writeFile(outputPath, JSON.stringify(allPosts, null, 2));

    console.log("Successfully compiled " + allPosts.length + " posts to " + outputPath);
}

fetchAllHashnodePosts();

import fs from 'fs';
import path from 'path';

const GITHUB_USERNAME = "Hellnight2005";
const PINNED_REPOS = ["Profitable", "profitable"];

async function main() {
    console.log("Fetching public repositories for " + GITHUB_USERNAME + "...");

    try {
        const res = await fetch("https://api.github.com/users/" + GITHUB_USERNAME + "/repos?type=public&per_page=100", {
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        });

        if (!res.ok) {
            throw new Error("GitHub API failed: " + res.status + " " + res.statusText);
        }

        const repos = await res.json();

        let filtered = repos
            .filter((repo) => !repo.fork)
            .map((repo) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description || "No description provided.",
                html_url: repo.html_url,
                language: repo.language,
                year: new Date(repo.pushed_at).getFullYear().toString(),
                isPinned: PINNED_REPOS.some(p => p.toLowerCase() === repo.name.toLowerCase()),
                pushed_at: repo.pushed_at,
            }));

        filtered.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        });

        const outputPath = path.join(process.cwd(), 'public', 'projects.json');
        fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2));

        console.log("✅ Successfully saved " + filtered.length + " repositories to " + outputPath);
    } catch (error) {
        console.error("❌ Failed to fetch and compile repositories:", error);
        process.exit(1);
    }
}

main();

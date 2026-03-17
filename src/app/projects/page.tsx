import fs from 'fs';
import path from 'path';
import { ProjectsClient } from "./ProjectsClient";

export interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    live_url: string | null;
    is_live: boolean;
    why_not_live: string | null;
    tech_used: string[];
    learned_tools: string[];
    what_learned: string;
    reason_for_making: string;
    cover_image: string;
    project_images: string[];
    language: string | null;
    pushed_at: string;
    fork: boolean;
    year: string;
    isPinned: boolean;
    upcoming?: boolean;
}

// Reads statically built projects.json
async function getRepositories(): Promise<GithubRepo[]> {
    try {
        const filePath = path.join(process.cwd(), 'public', 'projects.json');
        const fileContents = await fs.promises.readFile(filePath, 'utf8');
        const repos: GithubRepo[] = JSON.parse(fileContents);
        return repos.filter((repo) => repo.isPinned);
    } catch (error) {
        console.error("Error reading projects.json:", error);
        return [];
    }
}

export default async function Projects() {
    const repos = await getRepositories();

    return (
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "var(--space-8) 24px" }}>
            {/* Header */}
            <header className="reveal" style={{ marginBottom: "64px" }}>
                <h1 className="type-display" style={{ color: "var(--color-text-primary)", display: "inline-block", marginRight: "16px" }}>WORK</h1>
                <span className="type-ui" style={{ color: "var(--color-text-secondary)" }}>— 0{repos.length} REPOSITORIES</span>
            </header>

            <ProjectsClient initialRepos={repos} />
        </div>
    );
}

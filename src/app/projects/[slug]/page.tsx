import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ProjectDetailClient from './ProjectDetailClient';

interface GithubRepo {
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

// 1. Generate Static Params to pre-build project pages
export async function generateStaticParams() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'projects.json');
        const fileContents = await fs.promises.readFile(filePath, 'utf8');
        const repos: GithubRepo[] = JSON.parse(fileContents);

        return repos.map((repo) => ({
            slug: repo.name,
        }));
    } catch (error) {
        console.error("Error reading projects.json for static params:", error);
        return [];
    }
}

// 2. Page Component
export default async function ProjectDetail({ params }: { params: { slug: string } }) {
    const { slug } = params;

    let repo: GithubRepo | null = null;

    try {
        const filePath = path.join(process.cwd(), 'public', 'projects.json');
        const fileContents = await fs.promises.readFile(filePath, 'utf8');
        const repos: GithubRepo[] = JSON.parse(fileContents);

        const decodedSlug = decodeURIComponent(slug).toLowerCase();
        repo = repos.find((r) => r.name.toLowerCase() === decodedSlug) || null;
    } catch (error) {
        console.error("Error reading projects.json:", error);
    }

    if (!repo) {
        return (
            <div style={{ padding: "var(--space-9) 24px", textAlign: "center", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1 className="type-display" style={{ color: "var(--color-text-primary)", marginBottom: "24px" }}>PROJECT NOT FOUND</h1>
                <p className="body-text" style={{ marginBottom: "32px" }}>The project you are looking for does not exist or has been removed.</p>
                <Link href="/projects" className="nav-link type-ui" style={{ color: "var(--color-text-secondary)" }}>← Back to Projects</Link>
            </div>
        );
    }

    return <ProjectDetailClient repo={repo} />;
}

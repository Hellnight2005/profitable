import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Engineering Portfolio | Abhijeet Shinde",
  description: "Explore the technical portfolio and open-source contributions of Abhijeet Shinde. Focused on backend engineering, cloud architecture, and modern web apps.",
  keywords: ["Software Engineering Portfolio", "Abhijeet Shinde Projects", "Open Source Developer", "Backend Developer Portfolio", "Next.js Projects"],
  openGraph: {
    title: "Engineering Portfolio | Abhijeet Shinde",
    description: "Explore the technical portfolio and open-source contributions of Abhijeet Shinde.",
    url: "https://profitable-azure.vercel.app/projects",
    siteName: "Abhijeet Shinde",
  }
};

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

            {/* Bottom CTA */}
            <section className="reveal" style={{ background: "var(--color-surface)", padding: "128px 24px", textAlign: "center", marginTop: "128px", borderTop: "1px solid var(--color-border)" }}>
                <h2 style={{ fontSize: "48px", color: "var(--color-text-primary)", marginBottom: "16px" }}>START A PROJECT</h2>
                <p className="body-text" style={{ maxWidth: "480px", margin: "0 auto", marginBottom: "48px" }}>Interested in building something similar? Let&apos;s discuss how I can help bring your ideas to life.</p>
                <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginTop: "32px" }}>
                    <Link href="/contact"><Button variant="primary">HIRE ME</Button></Link>
                    <Link href="/skills"><Button variant="secondary">VIEW SERVICES</Button></Link>
                </div>
            </section>
        </div>
    );
}

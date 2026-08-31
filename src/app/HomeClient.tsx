"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import {
    trackHeroCtaClick,
    trackProjectCardClick,
    trackWritingArticleClick,
    trackContactCtaClick,
} from "@/utils/analytics";

interface BlogPost {
    title: string;
    slug: string;
    domain: string;
    url: string;
    publishedAt: string;
    brief: string;
    category: string;
    series: string | null;
    tags: string[];
    coverImage?: string | null;
}

interface RelatedArticle {
    title: string;
    url: string;
}

export interface GithubRepo {
    id: number;
    name: string;
    description: string;
    short_problem?: string;
    engineering_domain?: string[];
    html_url: string | null;
    live_url: string | null;
    blog_url?: string | null;
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
    fork?: boolean;
    year: string;
    isPinned: boolean;
    upcoming?: boolean;
    related_articles?: RelatedArticle[];
}

const SKILL_CATEGORIES = [
    {
        category: "BACKEND & SYSTEMS",
        items: ["Go", "PostgreSQL", "Docker", "Redis", "System Design", "Networking"],
    },
    {
        category: "AI & DATA",
        items: ["Python", "RAG", "Vector Databases", "Local LLMs / Ollama"],
    },
    {
        category: "WEB ENGINEERING",
        items: ["TypeScript", "React", "Next.js", "Tailwind"],
    },
    {
        category: "CURRENTLY EXPLORING",
        items: ["Rust", "Distributed Systems", "Storage Systems"],
    },
];

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setLatestPosts(data.slice(0, 3));
                }
            })
            .catch((err) => console.error("Failed to load blog posts:", err));

        fetch("/projects.json")
            .then((res) => res.json())
            .then((data) => setRepos(data))
            .catch((err) => console.error("Failed to load projects:", err));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.12 }
        );

        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => {
            observer.observe(el);
        });

        return () => {
            elements.forEach((el) => {
                observer.unobserve(el);
            });
            observer.disconnect();
        };
    }, [repos, latestPosts]);

    const handleHeroPrimaryCta = () => {
        trackHeroCtaClick("EXPLORE PROJECTS", "#projects");
        const el = document.getElementById("projects");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleHeroSecondaryCta = () => {
        trackHeroCtaClick("READ MY WRITING", "#writing");
        const el = document.getElementById("writing");
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const nextProject = () => {
        if (repos.length === 0) return;
        setActiveProjectIndex((prev) => (prev + 1) % repos.length);
    };

    const prevProject = () => {
        if (repos.length === 0) return;
        setActiveProjectIndex((prev) => (prev - 1 + repos.length) % repos.length);
    };

    return (
        <div ref={containerRef}>
            <style>{`
                .home-hero {
                    min-height: 100svh;
                    position: relative;
                    background: radial-gradient(circle at top left, rgba(200,169,110,0.08), transparent 40%);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 96px 24px 64px 24px;
                }
                .hero-content-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 48px;
                }
                .hero-left-text {
                    flex: 1 1 55%;
                    min-width: 300px;
                }
                .hero-right-decorative {
                    flex: 1 1 35%;
                    min-width: 260px;
                    display: flex;
                    justify-content: flex-end;
                }
                .hero-dots-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 12px;
                    justify-items: end;
                }
                .hero-dot-card {
                    width: 8px;
                    height: 8px;
                    background-color: var(--color-border);
                }
                .hero-dot-card.accent {
                    background-color: var(--color-accent);
                }
                .hero-cta-group {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    flex-wrap: wrap;
                    margin-top: 40px;
                }
                .hero-primary-btn {
                    background: var(--color-accent);
                    color: #0a0a0a !important;
                    font-family: var(--font-dm-mono);
                    font-size: 13px;
                    letter-spacing: 0.12em;
                    padding: 14px 28px;
                    border-radius: 2px;
                    border: 1px solid var(--color-accent);
                    cursor: pointer;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                }
                .hero-primary-btn:hover {
                    background: transparent;
                    color: var(--color-accent) !important;
                }
                .hero-secondary-btn {
                    background: transparent;
                    color: var(--color-text-primary) !important;
                    font-family: var(--font-dm-mono);
                    font-size: 13px;
                    letter-spacing: 0.12em;
                    padding: 14px 28px;
                    border-radius: 2px;
                    border: 1px solid var(--color-border);
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s ease;
                }
                .hero-secondary-btn:hover {
                    border-color: var(--color-accent);
                    color: var(--color-accent) !important;
                }
                .marquee-bottom {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    border-top: 1px solid var(--color-border);
                    overflow: hidden;
                    padding: 12px 0;
                    background: var(--color-bg);
                }
                .marquee-text-item {
                    color: var(--color-text-tertiary);
                    white-space: nowrap;
                    margin-right: 32px;
                }
                .projects-section-header {
                    max-width: 1280px;
                    margin: 0 auto 48px auto;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--color-border);
                    padding-bottom: 20px;
                    padding-left: 24px;
                    padding-right: 24px;
                }
                .project-card-featured {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 2px;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    transition: border-color 0.2s ease, transform 0.2s ease;
                }
                .project-card-featured:hover {
                    border-color: var(--color-accent) !important;
                    transform: translateY(-4px);
                }
                .project-domain-tag {
                    font-size: 11px;
                    color: var(--color-accent);
                    letter-spacing: 0.1em;
                    font-family: var(--font-dm-mono);
                    background: rgba(200,169,110,0.08);
                    border: 1px solid rgba(200,169,110,0.2);
                    padding: 4px 10px;
                    border-radius: 2px;
                }
                .case-study-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-dm-mono);
                    font-size: 12px;
                    color: var(--color-accent);
                    letter-spacing: 0.12em;
                    text-decoration: none;
                    margin-top: 24px;
                    font-weight: 600;
                    transition: gap 0.2s ease;
                }
                .case-study-cta:hover {
                    gap: 14px;
                }
                .carousel-nav-btn {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    color: var(--color-text-primary);
                    padding: 8px 16px;
                    font-family: var(--font-dm-mono);
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .carousel-nav-btn:hover {
                    border-color: var(--color-accent);
                    color: var(--color-accent);
                }
                .skills-categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 24px;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .skill-category-card {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 2px;
                    padding: 32px 24px;
                    display: flex;
                    flex-direction: column;
                }
                .skill-chip {
                    display: inline-block;
                    background: var(--color-bg);
                    border: 1px solid var(--color-border);
                    padding: 6px 12px;
                    font-size: 12px;
                    color: var(--color-text-secondary);
                    font-family: var(--font-dm-mono);
                    border-radius: 2px;
                }
                .home-writing-card {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-top: 2px solid var(--color-border);
                    border-radius: 2px;
                    padding: 32px 24px;
                    height: 100%;
                    transition: border-color 0.2s ease, transform 0.2s ease;
                }
                .home-writing-card:hover {
                    border-top-color: var(--color-accent) !important;
                    transform: translateY(-4px);
                }
                .home-cta-section {
                    padding: var(--space-9) 24px;
                    background: var(--color-surface);
                    text-align: center;
                    border-top: 1px solid var(--color-border);
                    border-bottom: 1px solid var(--color-border);
                }
            `}</style>

            {/* 1. HERO SECTION */}
            <section className="home-hero">
                <div className="hero-content-inner">
                    {/* Left Text */}
                    <div className="hero-left-text reveal">
                        <h1 className="type-display" style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px", color: "var(--color-text-primary)" }}>
                            <span>MAKER.</span>
                            <span>BUILDER.</span>
                            <span>WRITER.</span>
                        </h1>
                        <p className="body-text" style={{ maxWidth: "560px", fontSize: "16px", lineHeight: "1.7", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                            Software engineer exploring backend systems, developer tools, AI applications, storage, and infrastructure.
                        </p>
                        <p className="type-mono" style={{ maxWidth: "560px", fontSize: "13px", lineHeight: "1.6", color: "var(--color-text-tertiary)" }}>
                            I build projects to understand how complex systems work—then document what I learn along the way.
                        </p>

                        {/* CTAs */}
                        <div className="hero-cta-group">
                            <button onClick={handleHeroPrimaryCta} className="hero-primary-btn" aria-label="Explore Projects">
                                EXPLORE PROJECTS →
                            </button>
                            <button onClick={handleHeroSecondaryCta} className="hero-secondary-btn" aria-label="Read My Writing">
                                READ MY WRITING →
                            </button>
                        </div>
                    </div>

                    {/* Right Decorative Grid */}
                    <div className="hero-right-decorative reveal hidden md:flex">
                        <div className="hero-dots-grid">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div
                                    key={`dot-${i}`}
                                    className={`hero-dot-card${[2, 7, 10, 14].includes(i) ? " accent hero-pulse" : ""}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Marquee Bottom */}
                <div className="marquee-bottom">
                    <div style={{ display: "flex", width: "fit-content", animation: "marquee 30s linear infinite" }}>
                        <span className="type-micro marquee-text-item">
                            BACKEND SYSTEMS · STORAGE ARCHITECTURE · DEVELOPER TOOLS · AI PIPELINES · DISTRIBUTED SYSTEMS · GO · RUST · RAG · BACKEND SYSTEMS · STORAGE ARCHITECTURE · DEVELOPER TOOLS · AI PIPELINES ·
                        </span>
                    </div>
                </div>
            </section>

            {/* Core Positioning Statement */}
            <section className="reveal" style={{ padding: "96px 24px", textAlign: "center", maxWidth: "840px", margin: "0 auto" }}>
                <blockquote style={{ color: "var(--color-accent)", marginBottom: "28px", fontSize: "20px", fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.06em" }}>
                    &quot;UNDERSTANDING COMPLEX SYSTEMS BY BUILDING AND DOCUMENTING PUBLICLY.&quot;
                </blockquote>
                <p className="body-text" style={{ marginBottom: "32px", fontSize: "15px", lineHeight: "1.7" }}>
                    From high-speed file transfer protocols and media transcoding pipelines to AST static code analysis and vector retrieval engines, my engineering journey focuses on core systems, storage resilience, and developer tooling.
                </p>
                <div style={{ width: "2px", height: "40px", backgroundColor: "var(--color-accent)", margin: "0 auto" }} />
            </section>

            {/* 2. FEATURED PROJECTS SECTION */}
            <section id="projects" className="reveal" style={{ paddingBottom: "112px", width: "100%", scrollMarginTop: "80px" }}>
                <div className="projects-section-header">
                    <div>
                        <h2 className="type-display" style={{ fontSize: "32px", color: "var(--color-text-primary)", letterSpacing: "0.1em", margin: 0 }}>
                            FEATURED WORK
                        </h2>
                        <span className="type-mono" style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginTop: "4px", display: "block" }}>
                            ENGINEERING EXPERIMENTS &amp; SYSTEMS PROJECTS
                        </span>
                    </div>

                    {/* Carousel Affordances */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button onClick={prevProject} className="carousel-nav-btn" aria-label="Previous project">
                            ← PREV
                        </button>
                        <span className="type-mono" style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                            {activeProjectIndex + 1} / {repos.length || 1}
                        </span>
                        <button onClick={nextProject} className="carousel-nav-btn" aria-label="Next project">
                            NEXT →
                        </button>
                    </div>
                </div>

                {/* Primary Spotlight Project Card */}
                {repos.length > 0 && repos[activeProjectIndex] && (
                    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 32px 24px" }}>
                        {(() => {
                            const repo = repos[activeProjectIndex];
                            return (
                                <div className="project-card-featured">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                                                <span className="type-mono" style={{ fontSize: "14px", color: "var(--color-accent)", fontWeight: "bold" }}>
                                                    0{activeProjectIndex + 1}
                                                </span>
                                                <h3 className="type-display" style={{ fontSize: "36px", color: "var(--color-text-primary)", margin: 0, wordBreak: "break-word" }}>
                                                    {repo.name}
                                                </h3>
                                                {repo.upcoming && (
                                                    <span className="tag" style={{ border: "1px solid var(--color-accent)", padding: "2px 8px", borderRadius: "2px", fontSize: "10px", color: "var(--color-accent)" }}>
                                                        UPCOMING
                                                    </span>
                                                )}
                                                {repo.is_live && (
                                                    <span className="tag" style={{ border: "1px solid var(--color-success, #4caf50)", padding: "2px 8px", borderRadius: "2px", fontSize: "10px", color: "var(--color-success, #4caf50)" }}>
                                                        LIVE
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span className="type-mono" style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                                            {repo.year}
                                        </span>
                                    </div>

                                    {/* One-Line Technical Problem */}
                                    <p className="type-mono" style={{ fontSize: "15px", color: "var(--color-text-primary)", marginBottom: "16px", fontWeight: 500, lineHeight: 1.5 }}>
                                        {repo.short_problem || repo.description}
                                    </p>

                                    {/* Detailed Description */}
                                    <p className="body-text" style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "24px", maxWidth: "840px" }}>
                                        {repo.description}
                                    </p>

                                    {/* Key Engineering Domains / Tech Badges */}
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                                        {(repo.engineering_domain || repo.tech_used.slice(0, 4)).map((domain) => (
                                            <span key={`domain-${domain}`} className="project-domain-tag">
                                                {domain}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Related Engineering Notes (Writing Connection) */}
                                    {repo.related_articles && repo.related_articles.length > 0 && (
                                        <div style={{ borderTop: "1px dashed var(--color-border)", paddingTop: "16px", marginBottom: "16px" }}>
                                            <span className="type-micro" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.12em", display: "block", marginBottom: "8px" }}>
                                                RELATED ENGINEERING NOTES:
                                            </span>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                                                {repo.related_articles.map((art) => (
                                                    <a
                                                        key={art.url}
                                                        href={art.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => trackWritingArticleClick(art.title, "Project Log", "featured_project_notes")}
                                                        className="type-mono"
                                                        style={{ fontSize: "12px", color: "var(--color-accent)", textDecoration: "underline" }}
                                                    >
                                                        → {art.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Case Study CTA */}
                                    <div>
                                        <Link
                                            href={`/projects/${repo.name}`}
                                            onClick={() => trackProjectCardClick(repo.name, repo.name, activeProjectIndex + 1, "featured_work")}
                                            className="case-study-cta"
                                        >
                                            VIEW CASE STUDY →
                                        </Link>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                )}

                {/* Secondary Grid View of Featured Projects */}
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                        {repos.slice(0, 6).map((item, idx) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    setActiveProjectIndex(idx);
                                    trackProjectCardClick(item.name, item.name, idx + 1, "project_grid_selector");
                                }}
                                style={{
                                    background: "var(--color-surface)",
                                    border: `1px solid ${idx === activeProjectIndex ? "var(--color-accent)" : "var(--color-border)"}`,
                                    borderRadius: "2px",
                                    padding: "20px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                    <span className="type-mono" style={{ fontSize: "11px", color: idx === activeProjectIndex ? "var(--color-accent)" : "var(--color-text-tertiary)" }}>
                                        0{idx + 1} · {item.language || "Mix"}
                                    </span>
                                    <span className="type-mono" style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>
                                        {item.year}
                                    </span>
                                </div>
                                <h4 className="type-display" style={{ fontSize: "20px", color: "var(--color-text-primary)", margin: "0 0 8px 0" }}>
                                    {item.name}
                                </h4>
                                <p className="type-mono" style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                    {item.short_problem || item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Link href="/projects" className="hero-secondary-btn" style={{ textDecoration: "none", display: "inline-flex" }}>
                            VIEW ALL PROJECTS ({repos.length}) →
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. RESTRUCTURED SKILLS SECTION */}
            <section className="reveal" style={{ padding: "96px 0", background: "var(--color-surface-alt)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 48px 24px" }}>
                    <h2 className="type-display" style={{ fontSize: "28px", color: "var(--color-text-primary)", letterSpacing: "0.12em", marginBottom: "8px" }}>
                        ENGINEERING CAPABILITIES &amp; DOMAINS
                    </h2>
                    <p className="type-mono" style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
                        STRUCTURED BY TECHNICAL DOMAIN &amp; ACTIVE LEARNING DIRECTION
                    </p>
                </div>

                <div className="skills-categories-grid">
                    {SKILL_CATEGORIES.map((cat) => (
                        <div key={cat.category} className="skill-category-card">
                            <h3 className="type-mono" style={{ fontSize: "13px", color: "var(--color-accent)", letterSpacing: "0.12em", marginBottom: "16px", fontWeight: 600 }}>
                                {cat.category}
                            </h3>
                            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {cat.items.map((skill) => (
                                    <span key={skill} className="skill-chip">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. LATEST WRITING (TECHNICAL NOTES & ARTICLES) */}
            <section id="writing" className="reveal" style={{ padding: "96px 24px", maxWidth: "1280px", margin: "0 auto", scrollMarginTop: "80px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px" }}>
                    <div>
                        <h2 className="type-display" style={{ fontSize: "28px", color: "var(--color-text-primary)", letterSpacing: "0.14em", margin: 0 }}>
                            TECHNICAL WRITING &amp; NOTES
                        </h2>
                        <span className="type-mono" style={{ fontSize: "11px", color: "var(--color-text-tertiary)", marginTop: "4px", display: "block" }}>
                            PUBLIC LOGS, ARCHITECTURE EXPERIMENTS &amp; LESSONS LEARNED
                        </span>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                    {latestPosts.length > 0 ? (
                        latestPosts.map((post) => {
                            const d = new Date(post.publishedAt);
                            const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();

                            return (
                                <a
                                    key={post.slug}
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackWritingArticleClick(post.title, post.category, "latest_writing")}
                                    style={{ display: "block", textDecoration: "none" }}
                                >
                                    <div className="card interactive group post-card home-writing-card">
                                        <span className="tag" style={{ border: "1px solid var(--color-border)", padding: "4px 10px", borderRadius: "2px", marginBottom: "20px", display: "inline-block", color: "var(--color-text-primary)" }}>
                                            {post.category.toUpperCase()}
                                        </span>
                                        <h3 className="post-title" style={{ color: "var(--color-text-primary)", marginBottom: "32px", minHeight: "48px", transition: "color 0.2s", fontSize: "18px", fontWeight: "normal", lineHeight: 1.4 }}>
                                            {post.title}
                                        </h3>
                                        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
                                            <span className="type-micro" style={{ color: "var(--color-text-secondary)" }}>
                                                {formattedDate}
                                            </span>
                                            <span className="type-micro" style={{ color: "var(--color-accent)" }}>
                                                READ ARTICLE →
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })
                    ) : (
                        <div style={{ color: "var(--color-text-tertiary)" }} className="type-mono">
                            Loading latest technical writing...
                        </div>
                    )}
                </div>

                <div style={{ marginTop: "48px" }}>
                    <Link
                        href="/blog"
                        onClick={() => trackWritingArticleClick("Read all articles", "Blog Section", "view_all_writing")}
                        className="nav-link type-ui"
                        style={{ color: "var(--color-text-secondary)", fontSize: "13px" }}
                    >
                        Read all technical writing &amp; build logs →
                    </Link>
                </div>
            </section>

            {/* 5. CONTACT & COLLABORATION CTA */}
            <section className="reveal home-cta-section">
                <h2 className="type-display" style={{ marginBottom: "16px", color: "var(--color-text-primary)", fontSize: "36px", letterSpacing: "0.08em" }}>
                    LET&apos;S BUILD COMPLEX SYSTEMS.
                </h2>
                <p className="body-text" style={{ marginBottom: "40px", maxWidth: "560px", margin: "0 auto 40px auto", color: "var(--color-text-secondary)" }}>
                    Open to systems engineering roles, open-source collaborations, and technical discussions.
                </p>
                <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Button
                        href="/contact"
                        variant="primary"
                        onClick={() => trackContactCtaClick("GET IN TOUCH", "homepage_cta_footer")}
                    >
                        GET IN TOUCH
                    </Button>
                    <Button
                        href="/projects"
                        variant="secondary"
                        onClick={() => trackHeroCtaClick("EXPLORE ALL WORK", "/projects")}
                    >
                        EXPLORE ALL WORK
                    </Button>
                </div>
            </section>
        </div>
    );
}

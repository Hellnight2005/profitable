"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

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
}

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

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
    const [repos, setRepos] = useState<GithubRepo[]>([]);

    useEffect(() => {
        fetch('/blog/posts.json')
            .then(res => res.json())
            .then(data => setLatestPosts(data.slice(0, 3)))
            .catch(err => console.error("Failed to load blog posts:", err));

        fetch('/projects.json')
            .then(res => res.json())
            .then(data => setRepos(data.slice(0, 12)))
            .catch(err => console.error("Failed to load projects:", err));
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
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [repos, latestPosts]);

    return (
        <div ref={containerRef}>
            {/* Hero Section */}
            <section
                style={{
                    height: "100svh",
                    position: "relative",
                    background: "radial-gradient(circle at top left, rgba(200,169,110,0.08), transparent 40%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 24px",
                }}
            >
                <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                    {/* Left Text */}
                    <div style={{ flex: "1 1 50%", minWidth: "300px" }} className="reveal">
                        <h1 className="type-display" style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", color: "var(--color-text-primary)" }}>
                            <span>MAKER.</span>
                            <span>WRITER.</span>
                            <span>BUILDER.</span>
                        </h1>
                        <p className="body-text" style={{ maxWidth: "480px" }}>
                            A personal portfolio and knowledge platform designed to showcase ideas, execution, and continuous learning.
                        </p>
                    </div>

                    {/* Right Decorative */}
                    <div style={{ flex: "1 1 50%", minWidth: "300px", display: "flex", justifyContent: "flex-end" }} className="reveal hidden md:flex">
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", justifyItems: "end" }}>
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={[2, 7, 10, 14].includes(i) ? "hero-pulse" : ""}
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        backgroundColor: [2, 7, 10, 14].includes(i) ? "var(--color-accent)" : "var(--color-border)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Marquee Bottom */}
                <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", borderTop: "1px solid var(--color-border)", overflow: "hidden", padding: "12px 0", background: "var(--color-bg)" }}>
                    <div style={{ display: "flex", width: "fit-content", animation: "marquee 30s linear infinite" }}>
                        <span className="type-micro" style={{ color: "var(--color-text-tertiary)", whiteSpace: "nowrap", marginRight: "32px" }}>
                            PROJECTS · BLOG · THOUGHTS · SKILLS · CONTACT · PROJECTS · BLOG · THOUGHTS · SKILLS · CONTACT · PROJECTS · BLOG · THOUGHTS · SKILLS · CONTACT · PROJECTS · BLOG · THOUGHTS · SKILLS · CONTACT ·
                        </span>
                    </div>
                </div>
            </section>

            {/* Intro Statement */}
            <section className="reveal" style={{ padding: "var(--space-8) 24px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                <blockquote style={{ color: "var(--color-accent)", marginBottom: "32px" }}>
                    &quot;Great software is built at the intersection of rigorous engineering, thoughtful design, and deep empathy for the user.&quot;
                </blockquote>
                <p className="body-text" style={{ marginBottom: "32px" }}>
                    I am a software engineer and designer focused on building scalable web applications and elegant user interfaces. This space serves as my digital garden—a collection of finished work, ongoing experiments, and written thoughts.
                </p>
                <div style={{ width: "2px", height: "40px", backgroundColor: "var(--color-accent)", marginLeft: "auto" }} />
            </section>

            {/* PINNED PROJECTS (Orbiting Carousel) */}
            {repos.length > 0 && (
                <section className="reveal" style={{ paddingBottom: "128px", width: "100%", overflow: "hidden", marginTop: "128px" }}>
                    <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "48px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px", paddingLeft: "24px", paddingRight: "24px" }}>
                        <h2 className="type-display" style={{ fontSize: "32px", color: "var(--color-text-primary)", letterSpacing: "0.1em", margin: 0 }}>PINNED PROJECTS</h2>
                        <span className="type-mono" style={{ fontSize: "9px", color: "var(--color-text-tertiary)" }}>SLIDE HORIZONTALLY</span>
                    </div>

                    {/* BENTO GRID LAYOUT */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px", maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
                        {/* Featured Large Project (Left) */}
                        {repos[0] && (
                            <Link href={`/projects/${repos[0].name}`} style={{ textDecoration: "none", display: "flex" }}>
                                <div className="card interactive group post-card" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "2px", padding: "48px 40px", display: "flex", flexDirection: "column", flex: 1, minHeight: "400px", transition: "all 0.2s ease" }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.transform = "translateY(0)"; }}>

                                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                                        <h3 className="type-display post-title" style={{ fontSize: "36px", color: "var(--color-text-primary)", margin: 0, wordBreak: "break-word", transition: "color 0.2s" }}>{repos[0].name}</h3>
                                        {repos[0].upcoming && (
                                            <span className="tag" style={{ border: "1px solid var(--color-accent)", padding: "4px 12px", borderRadius: "2px", fontSize: "12px", color: "var(--color-accent)" }}>UPCOMING</span>
                                        )}
                                    </div>
                                    <p className="type-mono" style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: "500px", marginBottom: "48px" }}>{repos[0].description}</p>

                                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
                                        <span className="type-mono" style={{ fontSize: "12px", color: "var(--color-accent)", letterSpacing: "0.1em" }}>FEATURED / {repos[0].language || "MIX"}</span>
                                        <span className="type-mono" style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>{repos[0].year}</span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Two Stacked Projects (Right) */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            {[repos[1], repos[2]].map((item) => {
                                if (!item) return null;
                                return (
                                    <Link key={item.id} href={`/projects/${item.name}`} style={{ textDecoration: "none", display: "flex", flex: 1 }}>
                                        <div className="card interactive group post-card" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "2px", padding: "32px 32px", display: "flex", flexDirection: "column", flex: 1, transition: "all 0.2s ease" }}
                                            onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                            onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.transform = "translateY(0)"; }}>

                                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                                <h3 className="type-display post-title" style={{ fontSize: "24px", color: "var(--color-text-primary)", margin: 0, wordBreak: "break-word", transition: "color 0.2s" }}>{item.name}</h3>
                                                {item.upcoming && (
                                                    <span className="tag" style={{ border: "1px solid var(--color-accent)", padding: "2px 8px", borderRadius: "2px", fontSize: "10px", color: "var(--color-accent)" }}>UPCOMING</span>
                                                )}
                                            </div>
                                            <p className="type-mono" style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "32px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.description}</p>

                                            <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
                                                <span className="type-mono" style={{ fontSize: "10px", color: "var(--color-accent)" }}>{item.language || "Mix"}</span>
                                                <span className="type-mono" style={{ fontSize: "10px", color: "var(--color-text-tertiary)" }}>{item.year}</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Blog Posts */}
            <section className="reveal" style={{ padding: "var(--space-8) 24px", maxWidth: "1280px", margin: "0 auto" }}>
                <h4 className="type-ui" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em", marginBottom: "48px" }}>LATEST WRITING</h4>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                    {latestPosts.length > 0 ? latestPosts.map((post) => {
                        const d = new Date(post.publishedAt);
                        const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();

                        return (
                            <a key={post.slug} href={post.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
                                <div className="card interactive group post-card" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "2px solid var(--color-border)", borderRadius: "2px", padding: "32px 24px", height: "100%", transition: "all 0.2s ease" }}
                                    onMouseOver={(e) => { e.currentTarget.style.borderTopColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                    onMouseOut={(e) => { e.currentTarget.style.borderTopColor = "var(--color-border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                                >
                                    <span className="tag" style={{ border: "1px solid var(--color-border)", padding: "4px 10px", borderRadius: "2px", marginBottom: "24px", display: "inline-block", color: "var(--color-text-primary)" }}>{post.category.toUpperCase()}</span>
                                    <h4 className="post-title" style={{ color: "var(--color-text-primary)", marginBottom: "48px", minHeight: "48px", transition: "color 0.2s" }}>{post.title}</h4>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span className="type-micro" style={{ color: "var(--color-text-secondary)" }}>{formattedDate}</span>
                                    </div>
                                </div>
                            </a>
                        );
                    }) : (
                        <div style={{ color: "var(--color-text-tertiary)" }}>Loading latest posts...</div>
                    )}
                </div>

                <div style={{ marginTop: "48px" }}>
                    <Link href="/blog" className="nav-link type-ui" style={{ color: "var(--color-text-secondary)" }}>Read all articles →</Link>
                </div>
            </section>

            {/* Skills Snapshot */}
            <section className="reveal" style={{ padding: "48px 0", background: "var(--color-surface-alt)", overflow: "hidden" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", width: "fit-content", animation: "marquee-right 40s linear infinite" }}>
                        <div style={{ display: "flex", gap: "16px", paddingRight: "16px" }}>
                            {["TYPESCRIPT", "REACT", "NEXT.JS", "NODE.JS", "PYTHON", "POSTGRESQL", "DOCKER", "AWS", "UI/UX DESIGN", "FIGMA"].map((skill, i) => (
                                <div key={`r1a-${i}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                            {["TYPESCRIPT", "REACT", "NEXT.JS", "NODE.JS", "PYTHON", "POSTGRESQL", "DOCKER", "AWS", "UI/UX DESIGN", "FIGMA"].map((skill, i) => (
                                <div key={`r1b-${i}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", width: "fit-content", animation: "marquee 45s linear infinite" }}>
                        <div style={{ display: "flex", gap: "16px", paddingRight: "16px" }}>
                            {["SYSTEM DESIGN", "PERFORMANCE", "ANIMATION", "WEBGL", "GRAPHQL", "TAILWIND", "JEST", "CYPRESS", "CI/CD"].map((skill, i) => (
                                <div key={`r2a-${i}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                            {["SYSTEM DESIGN", "PERFORMANCE", "ANIMATION", "WEBGL", "GRAPHQL", "TAILWIND", "JEST", "CYPRESS", "CI/CD"].map((skill, i) => (
                                <div key={`r2b-${i}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="reveal" style={{ padding: "var(--space-9) 24px", background: "var(--color-surface)", textAlign: "center", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
                <h1 className="type-display" style={{ marginBottom: "16px", color: "var(--color-text-primary)" }}>LET&apos;S BUILD SOMETHING.</h1>
                <p className="body-text" style={{ marginBottom: "48px" }}>Open to collaborations and interesting projects.</p>
                <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link href="/contact"><Button variant="primary">GET IN TOUCH</Button></Link>
                    <Link href="/projects"><Button variant="secondary">VIEW WORK</Button></Link>
                </div>
            </section>
        </div>
    );
}

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

    return (
        <div ref={containerRef}>
            <style>{`
                .home-hero {
                    height: 100svh;
                    position: relative;
                    background: radial-gradient(circle at top left, rgba(200,169,110,0.08), transparent 40%);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 0 24px;
                }
                .hero-content-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                }
                .hero-left-text {
                    flex: 1 1 50%;
                    min-width: 300px;
                }
                .hero-right-decorative {
                    flex: 1 1 50%;
                    min-width: 300px;
                    display: flex;
                    justify-content: flex-end;
                }
                .hero-dots-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 8px;
                    justify-items: end;
                }
                .hero-dot-card {
                    width: 6px;
                    height: 6px;
                    background-color: var(--color-border);
                }
                .hero-dot-card.accent {
                    background-color: var(--color-accent);
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
                .bento-grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 24px;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .project-card-large {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 2px;
                    padding: 48px 40px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    min-height: 400px;
                    transition: border-color 0.2s ease, transform 0.2s ease;
                }
                .project-card-large:hover {
                    border-color: var(--color-accent) !important;
                    transform: translateY(-4px);
                }
                .project-card-small {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 2px;
                    padding: 32px 32px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    transition: border-color 0.2s ease, transform 0.2s ease;
                }
                .project-card-small:hover {
                    border-color: var(--color-accent) !important;
                    transform: translateY(-4px);
                }
                .project-card-footer {
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid var(--color-border);
                    padding-top: 24px;
                }
                .project-card-small-footer {
                    margin-top: auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid var(--color-border);
                    padding-top: 16px;
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

            {/* Hero Section */}
            <section className="home-hero">
                <div className="hero-content-inner">
                    {/* Left Text */}
                    <div className="hero-left-text reveal">
                        <h1 className="type-display" style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", color: "var(--color-text-primary)" }}>
                            <span>MAKER.</span>
                            <span>BUILDER.</span>
                            <span>WRITER.</span>
                        </h1>
                        <p className="body-text" style={{ maxWidth: "480px" }}>
                            A personal portfolio and knowledge platform designed to showcase ideas, execution, and continuous learning.
                        </p>
                    </div>

                    {/* Right Decorative */}
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
                    <div className="bento-grid-container">
                        {/* Featured Large Project (Left) */}
                        {repos[0] && (
                            <Link href={`/projects/${repos[0].name}`} style={{ textDecoration: "none", display: "flex" }}>
                                <div className="card interactive group post-card project-card-large">

                                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                                        <h3 className="type-display post-title" style={{ fontSize: "36px", color: "var(--color-text-primary)", margin: 0, wordBreak: "break-word", transition: "color 0.2s" }}>{repos[0].name}</h3>
                                        {repos[0].upcoming && (
                                            <span className="tag" style={{ border: "1px solid var(--color-accent)", padding: "4px 12px", borderRadius: "2px", fontSize: "12px", color: "var(--color-accent)" }}>UPCOMING</span>
                                        )}
                                    </div>
                                    <p className="type-mono" style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: "500px", marginBottom: "48px" }}>{repos[0].description}</p>

                                    <div className="project-card-footer">
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
                                        <div className="card interactive group post-card project-card-small">

                                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                                <h3 className="type-display post-title" style={{ fontSize: "24px", color: "var(--color-text-primary)", margin: 0, wordBreak: "break-word", transition: "color 0.2s" }}>{item.name}</h3>
                                                {item.upcoming && (
                                                    <span className="tag" style={{ border: "1px solid var(--color-accent)", padding: "2px 8px", borderRadius: "2px", fontSize: "10px", color: "var(--color-accent)" }}>UPCOMING</span>
                                                )}
                                            </div>
                                            <p className="type-mono" style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "32px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.description}</p>

                                            <div className="project-card-small-footer">
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
                <h2 className="type-display" style={{ fontSize: "24px", color: "var(--color-text-tertiary)", letterSpacing: "0.16em", marginBottom: "48px" }}>LATEST WRITING</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                    {latestPosts.length > 0 ? latestPosts.map((post) => {
                        const d = new Date(post.publishedAt);
                        const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();

                        return (
                            <a key={post.slug} href={post.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
                                <div className="card interactive group post-card home-writing-card">
                                    <span className="tag" style={{ border: "1px solid var(--color-border)", padding: "4px 10px", borderRadius: "2px", marginBottom: "24px", display: "inline-block", color: "var(--color-text-primary)" }}>{post.category.toUpperCase()}</span>
                                    <h3 className="post-title" style={{ color: "var(--color-text-primary)", marginBottom: "48px", minHeight: "48px", transition: "color 0.2s", fontSize: "20px", fontWeight: "normal" }}>{post.title}</h3>
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
                            {["TYPESCRIPT", "REACT", "NEXT.JS", "NODE.JS", "PYTHON", "POSTGRESQL", "DOCKER", "AWS", "UI/UX DESIGN", "FIGMA"].map((skill) => (
                                <div key={`r1a-${skill}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                            {["TYPESCRIPT", "REACT", "NEXT.JS", "NODE.JS", "PYTHON", "POSTGRESQL", "DOCKER", "AWS", "UI/UX DESIGN", "FIGMA"].map((skill) => (
                                <div key={`r1b-${skill}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: "flex", width: "fit-content", animation: "marquee 45s linear infinite" }}>
                        <div style={{ display: "flex", gap: "16px", paddingRight: "16px" }}>
                            {["SYSTEM DESIGN", "PERFORMANCE", "ANIMATION", "WEBGL", "GRAPHQL", "TAILWIND", "JEST", "CYPRESS", "CI/CD"].map((skill) => (
                                <div key={`r2a-${skill}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                            {["SYSTEM DESIGN", "PERFORMANCE", "ANIMATION", "WEBGL", "GRAPHQL", "TAILWIND", "JEST", "CYPRESS", "CI/CD"].map((skill) => (
                                <div key={`r2b-${skill}`} className="tag" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "8px 16px", fontSize: "14px", whiteSpace: "nowrap" }}>{skill}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="reveal home-cta-section">
                <h2 className="type-display" style={{ marginBottom: "16px", color: "var(--color-text-primary)" }}>LET&apos;S BUILD SOMETHING.</h2>
                <p className="body-text" style={{ marginBottom: "48px" }}>Open to collaborations and interesting projects.</p>
                <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Button href="/contact" variant="primary">GET IN TOUCH</Button>
                    <Button href="/projects" variant="secondary">VIEW WORK</Button>
                </div>
            </section>
        </div>
    );
}

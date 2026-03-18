'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// eslint-disable-next-line @next/next/no-img-element

interface GithubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
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
    fork: boolean;
    year: string;
}

export default function ProjectDetailClient({ repo }: { repo: GithubRepo }) {
    const [marqueesPaused, setMarqueesPaused] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div style={{ width: "100%", overflowX: "hidden", background: "#0A0A0A", minHeight: "100vh" }}>

            {/* ─── HERO SECTION ─── */}
            <section style={{
                position: "relative",
                minHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "120px 24px 80px",
            }}>
                {/* Dot grid background */}
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(var(--color-text-primary) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.4), transparent 30%, transparent 70%, #0A0A0A)" }} />
                </div>

                <div className="reveal" style={{ position: "relative", zIndex: 10, textAlign: "center", width: "100%", maxWidth: "900px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                    {/* Back link */}
                    <Link href="/projects" style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-text-tertiary)", textDecoration: "none", marginBottom: "16px", transition: "color 0.2s" }}>
                        <span style={{ fontSize: "14px" }}>←</span>
                        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>BACK TO WORK</span>
                    </Link>

                    {/* Project Name */}
                    <h1 style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: "clamp(64px, 14vw, 180px)",
                        lineHeight: 0.9,
                        color: "white",
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                        margin: 0,
                    }}>
                        {repo.name.replace(/-/g, ' ')}
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        fontFamily: "var(--font-dm-mono)",
                        fontSize: "11px",
                        letterSpacing: "0.25em",
                        color: "var(--color-accent)",
                        textTransform: "uppercase",
                        maxWidth: "560px",
                        lineHeight: 1.8,
                        margin: "8px 0 0",
                    }}>
                        {repo.description || "A showcase of technical architecture and purposeful execution."}
                    </p>

                    {/* Action Buttons */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginTop: "24px",
                        justifyContent: "center",
                    }}>
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "12px 32px",
                                border: "1px solid var(--color-border)",
                                fontFamily: "var(--font-dm-mono)",
                                fontSize: "10px",
                                letterSpacing: "0.2em",
                                color: "var(--color-accent)",
                                textDecoration: "none",
                                textTransform: "uppercase",
                                transition: "all 0.3s ease",
                                background: "rgba(20,20,20,0.5)",
                            }}
                            className="github-btn"
                        >
                            GITHUB →
                        </a>
                        {repo.blog_url && (
                            <a
                                href={repo.blog_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "12px 32px",
                                    border: "1px solid var(--color-border)",
                                    fontFamily: "var(--font-dm-mono)",
                                    fontSize: "10px",
                                    letterSpacing: "0.2em",
                                    color: "var(--color-accent)",
                                    textDecoration: "none",
                                    textTransform: "uppercase",
                                    transition: "all 0.3s ease",
                                    background: "rgba(20,20,20,0.5)",
                                }}
                                className="github-btn"
                            >
                                BLOG →
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── COVER IMAGE ─── */}
            {repo.cover_image && (
                <section className="reveal" style={{ padding: "0 24px", maxWidth: "900px", margin: "0 auto 80px" }}>
                    <div style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        background: `url(${repo.cover_image}) center/cover no-repeat`,
                        border: "1px solid var(--color-border)",
                    }} />
                </section>
            )}

            {/* ─── CONTENT BODY ─── */}
            <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: "96px" }}>

                {/* ── Description ── */}
                <section className="reveal" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ height: "1px", width: "40px", background: "var(--color-accent)", opacity: 0.4 }} />
                        <h2 style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "var(--color-accent)",
                            margin: 0,
                            fontWeight: 500,
                        }}>Description</h2>
                    </div>
                    <p style={{
                        fontFamily: "var(--font-dm-mono)",
                        fontSize: "15px",
                        lineHeight: 1.85,
                        color: "var(--color-text-secondary)",
                        margin: 0,
                    }}>
                        {repo.description}
                    </p>
                </section>

                {/* ── The Experiment (Purpose) ── */}
                <section className="reveal" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ height: "1px", width: "40px", background: "var(--color-accent)", opacity: 0.4 }} />
                        <h2 style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "var(--color-accent)",
                            margin: 0,
                            fontWeight: 500,
                        }}>The Experiment</h2>
                    </div>
                    <p style={{
                        fontSize: "20px",
                        lineHeight: 1.6,
                        color: "var(--color-text-primary)",
                        fontWeight: 300,
                        margin: 0,
                    }}>
                        {repo.reason_for_making}
                    </p>
                </section>

                {/* ── Core Insights (What was learned) ── */}
                <section className="reveal" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ height: "1px", width: "40px", background: "var(--color-accent)", opacity: 0.4 }} />
                        <h2 style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "var(--color-accent)",
                            margin: 0,
                            fontWeight: 500,
                        }}>Core Insights</h2>
                    </div>
                    <div style={{
                        borderLeft: "2px solid rgba(232, 213, 176, 0.15)",
                        paddingLeft: "24px",
                        marginLeft: "4px",
                    }}>
                        <p style={{
                            fontSize: "16px",
                            lineHeight: 1.8,
                            color: "var(--color-text-secondary)",
                            fontWeight: 300,
                            margin: 0,
                        }}>
                            {repo.what_learned}
                        </p>
                    </div>
                </section>

                {/* ── Tech Stack & Tools ── */}
                <section className="reveal" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ height: "1px", width: "40px", background: "var(--color-accent)", opacity: 0.4 }} />
                        <h2 style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "var(--color-accent)",
                            margin: 0,
                            fontWeight: 500,
                        }}>Tech Stack</h2>
                    </div>

                    {/* Tech Used */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {repo.tech_used?.map((tech, i) => (
                            <span key={`tech-${i}`} style={{
                                padding: "10px 20px",
                                border: "1px solid var(--color-border)",
                                fontFamily: "var(--font-dm-mono)",
                                fontSize: "10px",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "rgba(232, 213, 176, 0.85)",
                                background: "rgba(20,20,20,0.6)",
                                transition: "all 0.2s ease",
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Learned Tools */}
                    {repo.learned_tools && repo.learned_tools.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <span style={{
                                fontFamily: "var(--font-dm-mono)",
                                fontSize: "9px",
                                letterSpacing: "0.25em",
                                textTransform: "uppercase",
                                color: "var(--color-text-tertiary)",
                            }}>Tools &amp; Concepts Learned</span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {repo.learned_tools.map((tool, i) => (
                                    <span key={`tool-${i}`} style={{
                                        padding: "6px 14px",
                                        border: "1px dashed rgba(74, 71, 68, 0.6)",
                                        fontFamily: "var(--font-dm-mono)",
                                        fontSize: "10px",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: "var(--color-text-secondary)",
                                    }}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* ── Deployment Status ── */}
                <section className="reveal" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ height: "1px", width: "40px", background: "var(--color-accent)", opacity: 0.4 }} />
                        <h2 style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "10px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "var(--color-accent)",
                            margin: 0,
                            fontWeight: 500,
                        }}>Deployment Status</h2>
                    </div>
                    <div style={{
                        padding: "28px",
                        border: "1px solid var(--color-border)",
                        background: "rgba(17,17,17,0.6)",
                    }}>
                        {repo.is_live && repo.live_url ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.4)" }} />
                                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.15em", color: "#4ade80", textTransform: "uppercase" }}>Live in Production</span>
                                </div>
                                <a href={repo.live_url} target="_blank" rel="noopener noreferrer" style={{
                                    color: "var(--color-text-primary)",
                                    fontSize: "15px",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "4px",
                                    textDecorationColor: "var(--color-border)",
                                }}>
                                    {repo.live_url}
                                </a>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid var(--color-text-tertiary)" }} />
                                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "12px", letterSpacing: "0.15em", color: "var(--color-text-tertiary)", textTransform: "uppercase" }}>Offline / Development</span>
                                </div>
                                <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                                    {repo.why_not_live || "Project is currently not accessible live."}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Gallery (Infinite Marquee) ── */}
                {repo.project_images && repo.project_images.length > 0 && (
                    <section className="reveal" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <span style={{ height: "1px", width: "40px", background: "var(--color-accent)", opacity: 0.4 }} />
                                <h2 style={{
                                    fontFamily: "var(--font-dm-mono)",
                                    fontSize: "10px",
                                    letterSpacing: "0.3em",
                                    textTransform: "uppercase",
                                    color: "var(--color-accent)",
                                    margin: 0,
                                    fontWeight: 500,
                                }}>Gallery</h2>
                            </div>
                            <span style={{
                                fontFamily: "var(--font-dm-mono)",
                                fontSize: "9px",
                                letterSpacing: "0.15em",
                                color: "var(--color-text-tertiary)",
                                textTransform: "uppercase",
                            }}>{marqueesPaused ? "PAUSED — MOVE TO RESUME" : "CLICK TO PAUSE"}</span>
                        </div>

                        {/* Marquee strip — full viewport width */}
                        <div
                            style={{
                                position: "relative",
                                width: "100vw",
                                left: "50%",
                                transform: "translateX(-50%)",
                                overflow: "hidden",
                                cursor: marqueesPaused ? "grab" : "default",
                                userSelect: "none",
                            }}
                            onMouseDown={() => setMarqueesPaused(true)}
                            onMouseMove={() => { if (marqueesPaused) setMarqueesPaused(false); }}
                            onMouseUp={() => setMarqueesPaused(false)}
                            onMouseLeave={() => setMarqueesPaused(false)}
                            onTouchStart={() => setMarqueesPaused(true)}
                            onTouchEnd={() => setMarqueesPaused(false)}
                        >
                            {/* Top edge fade */}
                            <div style={{
                                position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
                                background: "linear-gradient(to right, #0A0A0A 40px, transparent 160px, transparent calc(100% - 160px), #0A0A0A calc(100% - 40px))"
                            }} />

                            {/* Track — duplicated for seamless loop */}
                            <div className={`marquee-track${marqueesPaused ? " marquee-paused" : ""}`}
                                style={{ display: "flex", gap: "20px", width: "max-content" }}>
                                {[...repo.project_images, ...repo.project_images].map((img, i) => (
                                    <div key={i} style={{
                                        flexShrink: 0,
                                        width: "420px",
                                        height: "280px",
                                        overflow: "hidden",
                                        border: "1px solid var(--color-border)",
                                        background: "rgba(10,10,10,0.9)",
                                        transition: "border-color 0.3s ease",
                                        position: "relative",
                                    }}
                                        onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                                        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--color-border)")}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={img}
                                            alt={`${repo.name} screenshot ${(i % repo.project_images.length) + 1}`}
                                            draggable={false}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                        <span style={{
                                            position: "absolute",
                                            bottom: "10px",
                                            right: "14px",
                                            fontFamily: "var(--font-dm-mono)",
                                            fontSize: "9px",
                                            letterSpacing: "0.2em",
                                            color: "var(--color-accent)",
                                            textTransform: "uppercase",
                                            background: "rgba(10,10,10,0.75)",
                                            padding: "3px 8px",
                                        }}>
                                            {String((i % repo.project_images.length) + 1).padStart(2, "0")} / {String(repo.project_images.length).padStart(2, "0")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* ─── STATS BAR ─── */}
            <section className="reveal" style={{
                marginTop: "96px",
                padding: "64px 24px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
                background: "rgba(17,17,17,0.4)",
                maxWidth: "900px",
                margin: "96px auto 0",
            }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "44px", color: "var(--color-accent)", lineHeight: 1 }}>{repo.year}</span>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Year Built</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "44px", color: "var(--color-accent)", lineHeight: 1 }}>{repo.language?.toUpperCase() || "N/A"}</span>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Primary Language</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "44px", color: "var(--color-accent)", lineHeight: 1 }}>
                        {repo.tech_used?.includes("Docker") || repo.tech_used?.includes("Kafka") ? "MICRO" : "MONO"}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Core Pattern</span>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer style={{
                padding: "48px 24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <span style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--color-text-tertiary)",
                    textTransform: "uppercase",
                }}>
                    © {repo.year} / {repo.name.toUpperCase().replace(/-/g, ' ')}
                </span>
            </footer>

            {/* Inline styles for interactions */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .github-btn:hover {
                    border-color: var(--color-accent) !important;
                    background: rgba(232, 213, 176, 0.08) !important;
                    transform: translateY(-2px);
                }
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track {
                    animation: marquee 18s linear infinite;
                    will-change: transform;
                }
                .marquee-paused {
                    animation-play-state: paused !important;
                }
            `}} />
        </div>
    );
}

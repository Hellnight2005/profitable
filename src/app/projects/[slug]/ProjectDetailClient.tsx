'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="proj-container">
            <style>{`
                .proj-container {
                    width: 100%;
                    overflow-x: hidden;
                    background: #0A0A0A;
                    min-height: 100vh;
                }
                .proj-hero {
                    position: relative;
                    min-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    padding: 120px 24px 80px;
                }
                .proj-hero-grid-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }
                .proj-hero-dots {
                    position: absolute;
                    inset: 0;
                    opacity: 0.06;
                    background-image: radial-gradient(var(--color-text-primary) 1px, transparent 1px);
                    background-size: 24px 24px;
                }
                .proj-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(10,10,10,0.4), transparent 30%, transparent 70%, #0A0A0A);
                }
                .proj-hero-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    width: 100%;
                    max-width: 900px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                }
                .proj-back-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--color-text-tertiary);
                    text-decoration: none;
                    margin-bottom: 16px;
                    transition: color 0.2s;
                }
                .proj-back-link:hover {
                    color: var(--color-text-primary);
                }
                .proj-title {
                    font-family: 'Bebas Neue', cursive;
                    font-size: clamp(64px, 14vw, 180px);
                    line-height: 0.9;
                    color: white;
                    letter-spacing: -0.02em;
                    text-transform: uppercase;
                    margin: 0;
                }
                .proj-subtitle {
                    font-family: var(--font-dm-mono);
                    font-size: 11px;
                    letter-spacing: 0.25em;
                    color: var(--color-accent);
                    text-transform: uppercase;
                    max-width: 560px;
                    line-height: 1.8;
                    margin: 8px 0 0;
                }
                .proj-actions {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-top: 24px;
                    justify-content: center;
                }
                .proj-action-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 32px;
                    border: 1px solid var(--color-border);
                    font-family: var(--font-dm-mono);
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    color: var(--color-accent);
                    text-decoration: none;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                    background: rgba(20,20,20,0.5);
                }
                .proj-action-btn:hover {
                    border-color: var(--color-accent) !important;
                    background: rgba(232, 213, 176, 0.08) !important;
                    transform: translateY(-2px);
                }
                .proj-cover-container {
                    padding: 0 24px;
                    max-width: 900px;
                    margin: 0 auto 80px;
                }
                .proj-cover-image {
                    width: 100%;
                    aspect-ratio: 16/9;
                    border: 1px solid var(--color-border);
                }
                .proj-section {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .proj-section-title-container {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }
                .proj-section-title-line {
                    height: 1px;
                    width: 40px;
                    background: var(--color-accent);
                    opacity: 0.4;
                }
                .proj-section-title {
                    font-family: var(--font-dm-mono);
                    font-size: 10px;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    color: var(--color-accent);
                    margin: 0;
                    font-weight: 500;
                }
                .proj-desc-text {
                    font-family: var(--font-dm-mono);
                    font-size: 15px;
                    line-height: 1.85;
                    color: var(--color-text-secondary);
                    margin: 0;
                }
                .proj-exp-text {
                    font-size: 20px;
                    line-height: 1.6;
                    color: var(--color-text-primary);
                    font-weight: 300;
                    margin: 0;
                }
                .proj-insights-box {
                    border-left: 2px solid rgba(232, 213, 176, 0.15);
                    padding-left: 24px;
                    margin-left: 4px;
                }
                .proj-insights-text {
                    font-size: 16px;
                    line-height: 1.8;
                    color: var(--color-text-secondary);
                    font-weight: 300;
                    margin: 0;
                }
                .proj-tech-used-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .proj-tech-tag {
                    padding: 10px 20px;
                    border: 1px solid var(--color-border);
                    font-family: var(--font-dm-mono);
                    font-size: 10px;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: rgba(232, 213, 176, 0.85);
                    background: rgba(20,20,20,0.6);
                    transition: all 0.2s ease;
                }
                .proj-learned-title {
                    font-family: var(--font-dm-mono);
                    font-size: 9px;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: var(--color-text-tertiary);
                }
                .proj-learned-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                .proj-learned-tag {
                    padding: 6px 14px;
                    border: 1px dashed rgba(74, 71, 68, 0.6);
                    font-family: var(--font-dm-mono);
                    font-size: 10px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--color-text-secondary);
                }
                .proj-deployment-card {
                    padding: 28px;
                    border: 1px solid var(--color-border);
                    background: rgba(17,17,17,0.6);
                }
                .proj-deployment-status {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .proj-status-dot-live {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #4ade80;
                    box-shadow: 0 0 8px rgba(74,222,128,0.4);
                }
                .proj-status-label-live {
                    font-family: var(--font-dm-mono);
                    font-size: 12px;
                    letter-spacing: 0.15em;
                    color: #4ade80;
                    text-transform: uppercase;
                }
                .proj-status-dot-dev {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    border: 1.5px solid var(--color-text-tertiary);
                }
                .proj-status-label-dev {
                    font-family: var(--font-dm-mono);
                    font-size: 12px;
                    letter-spacing: 0.15em;
                    color: var(--color-text-tertiary);
                    text-transform: uppercase;
                }
                .proj-live-link {
                    color: var(--color-text-primary);
                    font-size: 15px;
                    text-decoration: underline;
                    text-underline-offset: 4px;
                    text-decoration-color: var(--color-border);
                }
                .proj-dev-text {
                    color: var(--color-text-secondary);
                    font-size: 14px;
                    line-height: 1.7;
                    margin: 0;
                }
                .proj-gallery-marquee-container {
                    position: relative;
                    width: 100vw;
                    left: 50%;
                    transform: translateX(-50%);
                    overflow: hidden;
                }
                .proj-gallery-fade {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    pointer-events: none;
                    background: linear-gradient(to right, #0A0A0A 40px, transparent 160px, transparent calc(100% - 160px), #0A0A0A calc(100% - 40px));
                }
                .proj-gallery-track {
                    display: flex;
                    gap: 20px;
                    width: max-content;
                    animation: marquee 18s linear infinite;
                    will-change: transform;
                }
                .proj-gallery-track.paused {
                    animation-play-state: paused !important;
                }
                .proj-gallery-card {
                    flex-shrink: 0;
                    width: 420px;
                    height: 280px;
                    overflow: hidden;
                    border: 1px solid var(--color-border);
                    background: rgba(10,10,10,0.9);
                    transition: border-color 0.3s ease;
                    position: relative;
                }
                .proj-gallery-card:hover {
                    border-color: var(--color-accent) !important;
                }
                .proj-gallery-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }
                .proj-gallery-badge {
                    position: absolute;
                    bottom: 10px;
                    right: 14px;
                    font-family: var(--font-dm-mono);
                    font-size: 9px;
                    letter-spacing: 0.2em;
                    color: var(--color-accent);
                    text-transform: uppercase;
                    background: rgba(10,10,10,0.75);
                    padding: 3px 8px;
                }
                .proj-stats-bar {
                    margin-top: 96px;
                    padding: 64px 24px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    border-top: 1px solid var(--color-border);
                    border-bottom: 1px solid var(--color-border);
                    background: rgba(17,17,17,0.4);
                    max-width: 900px;
                    margin: 96px auto 0;
                }
                .proj-stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                }
                .proj-stat-value {
                    font-family: 'Bebas Neue', cursive;
                    font-size: 44px;
                    color: var(--color-accent);
                    line-height: 1;
                }
                .proj-stat-label {
                    font-family: var(--font-dm-mono);
                    font-size: 9px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--color-text-tertiary);
                }
                .proj-footer {
                    padding: 48px 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .proj-footer-text {
                    font-family: var(--font-dm-mono);
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    color: var(--color-text-tertiary);
                    text-transform: uppercase;
                }
                @keyframes marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>

            {/* ─── HERO SECTION ─── */}
            <section className="proj-hero">
                {/* Dot grid background */}
                <div className="proj-hero-grid-bg">
                    <div className="proj-hero-dots" />
                    <div className="proj-hero-overlay" />
                </div>

                <div className="reveal proj-hero-content">
                    {/* Back link */}
                    <Link href="/projects" className="proj-back-link">
                        <span style={{ fontSize: "14px" }}>←</span>
                        <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>BACK TO WORK</span>
                    </Link>

                    {/* Project Name */}
                    <h1 className="proj-title">
                        {repo.name.replace(/-/g, ' ')}
                    </h1>

                    {/* Subtitle */}
                    <p className="proj-subtitle">
                        {repo.description || "A showcase of technical architecture and purposeful execution."}
                    </p>

                    {/* Action Buttons */}
                    <div className="proj-actions">
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="proj-action-btn"
                        >
                            GITHUB →
                        </a>
                        {repo.blog_url && (
                            <a
                                href={repo.blog_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="proj-action-btn"
                            >
                                BLOG →
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── COVER IMAGE ─── */}
            {repo.cover_image && (
                <section className="reveal proj-cover-container">
                    <div
                        className="proj-cover-image"
                        style={{
                            background: `url(${repo.cover_image}) center/cover no-repeat`,
                        }}
                    />
                </section>
            )}

            {/* ─── CONTENT BODY ─── */}
            <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: "96px" }}>

                {/* ── Description ── */}
                <section className="reveal proj-section">
                    <div className="proj-section-title-container">
                        <span className="proj-section-title-line" />
                        <h2 className="proj-section-title">Description</h2>
                    </div>
                    <p className="proj-desc-text">
                        {repo.description}
                    </p>
                </section>

                {/* ── The Experiment (Purpose) ── */}
                <section className="reveal proj-section">
                    <div className="proj-section-title-container">
                        <span className="proj-section-title-line" />
                        <h2 className="proj-section-title">The Experiment</h2>
                    </div>
                    <p className="proj-exp-text">
                        {repo.reason_for_making}
                    </p>
                </section>

                {/* ── Core Insights (What was learned) ── */}
                <section className="reveal proj-section">
                    <div className="proj-section-title-container">
                        <span className="proj-section-title-line" />
                        <h2 className="proj-section-title">Core Insights</h2>
                    </div>
                    <div className="proj-insights-box">
                        <p className="proj-insights-text">
                            {repo.what_learned}
                        </p>
                    </div>
                </section>

                {/* ── Tech Stack & Tools ── */}
                <section className="reveal proj-section" style={{ gap: "24px" }}>
                    <div className="proj-section-title-container">
                        <span className="proj-section-title-line" />
                        <h2 className="proj-section-title">Tech Stack</h2>
                    </div>

                    {/* Tech Used */}
                    <div className="proj-tech-used-container">
                        {repo.tech_used?.map((tech) => (
                            <span key={tech} className="proj-tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Learned Tools */}
                    {repo.learned_tools && repo.learned_tools.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <span className="proj-learned-title">Tools &amp; Concepts Learned</span>
                            <div className="proj-learned-container">
                                {repo.learned_tools.map((tool) => (
                                    <span key={tool} className="proj-learned-tag">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* ── Deployment Status ── */}
                <section className="reveal proj-section">
                    <div className="proj-section-title-container">
                        <span className="proj-section-title-line" />
                        <h2 className="proj-section-title">Deployment Status</h2>
                    </div>
                    <div className="proj-deployment-card">
                        {repo.is_live && repo.live_url ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <div className="proj-deployment-status">
                                    <span className="proj-status-dot-live" />
                                    <span className="proj-status-label-live">Live in Production</span>
                                </div>
                                <a href={repo.live_url} target="_blank" rel="noopener noreferrer" className="proj-live-link">
                                    {repo.live_url}
                                </a>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <div className="proj-deployment-status">
                                    <span className="proj-status-dot-dev" />
                                    <span className="proj-status-label-dev">Offline / Development</span>
                                </div>
                                <p className="proj-dev-text">
                                    {repo.why_not_live || "Project is currently not accessible live."}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Gallery (Infinite Marquee) ── */}
                {repo.project_images && repo.project_images.length > 0 && (
                    <section className="reveal proj-section" style={{ gap: "24px" }}>
                        <div style={{ display: "baseline", justifyContent: "space-between" }}>
                            <div className="proj-section-title-container">
                                <span className="proj-section-title-line" />
                                <h2 className="proj-section-title">Gallery</h2>
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
                            className="proj-gallery-marquee-container"
                            style={{
                                cursor: marqueesPaused ? "grab" : "default",
                            }}
                            onMouseDown={() => setMarqueesPaused(true)}
                            onMouseMove={() => { if (marqueesPaused) setMarqueesPaused(false); }}
                            onMouseUp={() => setMarqueesPaused(false)}
                            onMouseLeave={() => setMarqueesPaused(false)}
                            onTouchStart={() => setMarqueesPaused(true)}
                            onTouchEnd={() => setMarqueesPaused(false)}
                        >
                            {/* Top edge fade */}
                            <div className="proj-gallery-fade" />

                            {/* Track — duplicated for seamless loop */}
                            <div className={`proj-gallery-track${marqueesPaused ? " paused" : ""}`}>
                                {[
                                    ...repo.project_images.map((img, idx) => ({ img, key: `gallery-img-first-${idx}-${img}`, index: idx })),
                                    ...repo.project_images.map((img, idx) => ({ img, key: `gallery-img-second-${idx}-${img}`, index: idx }))
                                ].map((item) => (
                                    <div key={item.key} className="proj-gallery-card">
                                        <Image
                                            src={item.img}
                                            alt={`${repo.name} screenshot ${item.index + 1}`}
                                            width={400}
                                            height={250}
                                            style={{ objectFit: "cover" }}
                                            draggable={false}
                                            className="proj-gallery-img"
                                            unoptimized
                                        />
                                        <span className="proj-gallery-badge">
                                            {String(item.index + 1).padStart(2, "0")} / {String(repo.project_images.length).padStart(2, "0")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* ─── STATS BAR ─── */}
            <section className="reveal proj-stats-bar">
                <div className="proj-stat-item">
                    <span className="proj-stat-value">{repo.year}</span>
                    <span className="proj-stat-label">Year Built</span>
                </div>
                <div className="proj-stat-item">
                    <span className="proj-stat-value">{repo.language?.toUpperCase() || "N/A"}</span>
                    <span className="proj-stat-label">Primary Language</span>
                </div>
                <div className="proj-stat-item">
                    <span className="proj-stat-value">
                        {repo.tech_used?.includes("Docker") || repo.tech_used?.includes("Kafka") ? "MICRO" : "MONO"}
                    </span>
                    <span className="proj-stat-label">Core Pattern</span>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="proj-footer">
                <span className="proj-footer-text">
                    © {repo.year} / {repo.name.toUpperCase().replace(/-/g, ' ')}
                </span>
            </footer>
        </div>
    );
}

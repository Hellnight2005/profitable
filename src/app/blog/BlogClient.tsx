"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { trackBlogClick } from "@/utils/analytics";

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

const CATEGORIES = [
    "All",
    "Weekly Updates",
    "Hackathon Diaries",
    "Project Logs",
    "The Architecture Lab"
];

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [activeSeries, setActiveSeries] = useState<string | null>(null);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Filtering logic
    const { filteredPosts, availableSeries } = useMemo(() => {
        let results = initialPosts;

        // 1. Filter by search query
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            results = results.filter(
                (p) =>
                    p.title.toLowerCase().includes(query) ||
                    p.brief.toLowerCase().includes(query) ||
                    p.tags.some((t) => t.toLowerCase().includes(query))
            );
        }

        // 2. Filter by category
        if (activeCategory !== "All") {
            results = results.filter((p) => p.category === activeCategory);
        }

        // Generate series available for the current category context
        const seriesSet = new Set<string>();
        results.forEach((p) => {
            if (p.series) seriesSet.add(p.series);
        });
        const currentAvailableSeries = Array.from(seriesSet).sort();

        // 3. Filter by Series if active
        if (activeSeries && currentAvailableSeries.includes(activeSeries)) {
            results = results.filter((p) => p.series === activeSeries);
        }

        // 4. Filter by Tag if active
        if (activeTag) {
            results = results.filter((p) => p.tags.includes(activeTag));
        }

        return {
            filteredPosts: results,
            availableSeries: currentAvailableSeries
        };
    }, [initialPosts, activeCategory, activeSeries, activeTag, searchQuery]);

    // Setup intersection observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.05 });

        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, [filteredPosts]);

    // The first post in the filtered list will be featured (wider, more premium layout)
    const featuredPost = filteredPosts[0];
    const regularPosts = filteredPosts.slice(1);

    return (
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "var(--space-8) 24px" }}>
            <style>{`
                .post-title {
                    color: var(--color-text-primary);
                    font-weight: 700;
                    line-height: 1.3;
                    transition: color 0.2s ease;
                }
                .post-card {
                    background: var(--color-bg);
                    border: 1px solid var(--color-border);
                    transition: background 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    display: block;
                    text-decoration: none;
                }
                .post-card:hover {
                    background: var(--color-surface);
                    border-color: var(--color-accent);
                    transform: translateY(-2px);
                }
                .post-card:hover .post-title {
                    color: var(--color-accent);
                }
                .post-card:hover .cover-img {
                    transform: scale(1.04);
                }
                .cover-img-box {
                    overflow: hidden;
                    border: 1px solid var(--color-border);
                    background: rgba(255,255,255,0.02);
                    position: relative;
                }
                .cover-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.35s ease, opacity 0.2s ease;
                }
                .featured-grid {
                    display: grid;
                    grid-template-columns: 1.3fr 1fr;
                    gap: 36px;
                    align-items: center;
                }
                .post-list-layout {
                    display: flex;
                    justify-content: space-between;
                    gap: 24px;
                    align-items: flex-start;
                }
                .post-thumb-box {
                    width: 200px;
                    min-width: 200px;
                    aspect-ratio: 16 / 9;
                    overflow: hidden;
                    border: 1px solid var(--color-border);
                    border-radius: 2px;
                    background: rgba(255,255,255,0.02);
                    flex-shrink: 0;
                }
                @media (max-width: 860px) {
                    .featured-grid {
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                    .featured-grid .featured-img-col {
                        order: -1;
                    }
                }
                @media (max-width: 640px) {
                    .post-list-layout {
                        flex-direction: column-reverse;
                        gap: 16px;
                    }
                    .post-thumb-box {
                        width: 100%;
                        min-width: 100%;
                    }
                }
                .category-filter-btn {
                    background: transparent;
                    border: 1px solid var(--color-border);
                    padding: 10px 20px;
                    font-size: 13px;
                    cursor: pointer;
                    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
                }
                .category-filter-btn:hover {
                    border-color: var(--color-text-primary);
                }
                .category-filter-btn.active {
                    background: var(--color-text-primary);
                    color: #000;
                    border-color: var(--color-text-primary);
                }
                .series-filter-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 32px;
                    background: rgba(255,255,255,0.01);
                    padding: 16px;
                    border: 1px dashed var(--color-border);
                }
                .series-filter-btn {
                    background: transparent;
                    border: 1px solid var(--color-accent);
                    padding: 4px 12px;
                    cursor: pointer;
                    font-size: 11px;
                    transition: background 0.2s ease, color 0.2s ease;
                }
                .series-filter-btn:hover {
                    background: rgba(var(--color-accent-rgb), 0.1);
                }
                .series-filter-btn.active {
                    background: var(--color-accent);
                    color: #000;
                }
                .search-input {
                    background: transparent;
                    border: 1px solid var(--color-border);
                    color: var(--color-text-primary);
                    padding: 12px 16px 12px 40px;
                    font-size: 14px;
                    width: 100%;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .search-input:focus {
                    border-color: var(--color-accent);
                    box-shadow: 0 0 0 1px var(--color-accent);
                }
                .tag-badge {
                    font-size: 10px;
                    letter-spacing: 0.05em;
                    padding: 3px 8px;
                    border: 1px solid var(--color-border);
                    color: var(--color-text-secondary);
                    cursor: pointer;
                    transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
                }
                .tag-badge:hover {
                    border-color: var(--color-accent);
                    color: var(--color-accent);
                }
                .tag-badge.active {
                    border-color: var(--color-accent);
                    background: var(--color-accent);
                    color: #000;
                }
                .brief-text {
                    font-size: 14px;
                    line-height: 1.6;
                    color: var(--color-text-secondary);
                }
                .featured-card {
                    border-left: 3px solid var(--color-accent) !important;
                }
                .featured-card:hover {
                    border-left-color: var(--color-accent) !important;
                }
            `}</style>

            {/* Header */}
            <header className="reveal" style={{ marginBottom: "48px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
                <div>
                    <h1 className="type-display" style={{ color: "var(--color-text-primary)", display: "inline-block", marginRight: "16px", marginBottom: 0 }}>WRITING</h1>
                    <span className="type-ui" style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>— {initialPosts.length} ARTICLES</span>
                </div>
                
                {/* Search Bar */}
                <div style={{ position: "relative", minWidth: "280px", maxWidth: "400px", width: "100%" }}>
                    <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-tertiary)", pointerEvents: "none" }}>
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search posts, tags, or topics..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setActiveTag(null); // Clear tag filter on text search
                        }}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--color-text-secondary)", cursor: "pointer", fontSize: "12px" }}
                            aria-label="Clear search query"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </header>

            {/* Category Primary Filters */}
            <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "12px", marginBottom: "32px" }}>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setActiveSeries(null); // Reset series on category change
                            setActiveTag(null); // Reset tag filter
                        }}
                        className={`type-mono category-filter-btn${activeCategory === cat ? " active" : ""}`}
                        style={{
                            color: activeCategory === cat ? "#000" : "var(--color-text-secondary)"
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Internal Series / Service Sub-Filters */}
            {activeCategory !== "All" && availableSeries.length > 0 && (
                <div className="reveal series-filter-container">
                    <span className="type-micro" style={{ color: "var(--color-text-tertiary)", alignSelf: "center" }}>SERIES:</span>

                    <button
                        onClick={() => setActiveSeries(null)}
                        className={`type-mono series-filter-btn${activeSeries === null ? " active" : ""}`}
                        style={{
                            color: activeSeries === null ? "#000" : "var(--color-text-secondary)"
                        }}
                    >
                        ALL
                    </button>

                    {availableSeries.map(seriesName => (
                        <button
                            key={seriesName}
                            onClick={() => setActiveSeries(seriesName)}
                            className={`type-mono series-filter-btn${activeSeries === seriesName ? " active" : ""}`}
                            style={{
                                color: activeSeries === seriesName ? "#000" : "var(--color-text-secondary)"
                            }}
                        >
                            {seriesName}
                        </button>
                    ))}
                </div>
            )}

            {/* Active Tag Filter Indicator */}
            {activeTag && (
                <div className="reveal" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                    <span className="type-micro" style={{ color: "var(--color-text-tertiary)" }}>FILTERED BY TAG:</span>
                    <span className="type-mono tag-badge active" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        {activeTag.toUpperCase()}
                        <span onClick={() => setActiveTag(null)} style={{ cursor: "pointer", fontWeight: "bold" }}>✕</span>
                    </span>
                </div>
            )}

            {/* Post Feed */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {initialPosts.length === 0 ? (
                    <div className="reveal" style={{ textAlign: "center", padding: "80px 0", color: "var(--color-text-tertiary)", border: "1px dashed var(--color-border)" }}>
                        No posts found in feeds.
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="reveal" style={{ textAlign: "center", padding: "80px 0", color: "var(--color-text-tertiary)", border: "1px dashed var(--color-border)" }}>
                        No posts found matching your criteria.
                    </div>
                ) : (
                    <>
                        {/* 1. Featured Post (First Post in list) */}
                        {featuredPost && !activeTag && searchQuery === "" && (
                            <a href={featuredPost.url} target="_blank" rel="noopener noreferrer" onClick={() => trackBlogClick(featuredPost.title)} style={{ textDecoration: "none" }}>
                                <article className="reveal interactive post-card featured-card" style={{ padding: "36px" }}>
                                    <div className={featuredPost.coverImage ? "featured-grid" : ""}>
                                        <div>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "18px", alignItems: "center" }}>
                                                <span className="type-micro" style={{ color: "var(--color-accent)", fontWeight: "600", letterSpacing: "0.1em" }}>FEATURED ARTICLE</span>
                                                <span style={{ color: "var(--color-border)" }}>•</span>
                                                <span className="type-micro" style={{ color: "var(--color-text-tertiary)" }}>
                                                    {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()}
                                                </span>
                                                <span className="tag" style={{ border: "1px solid var(--color-primary)", color: "var(--color-primary)", padding: "1px 6px", fontSize: "9px" }}>
                                                    {featuredPost.category.toUpperCase()}
                                                </span>
                                            </div>
                                            
                                            <h2 className="post-title" style={{ fontSize: "1.85rem", marginBottom: "16px" }}>
                                                {featuredPost.title}
                                            </h2>
                                            
                                            {featuredPost.brief && (
                                                <p className="brief-text" style={{ fontSize: "15px", marginBottom: "24px" }}>
                                                    {featuredPost.brief}
                                                </p>
                                            )}

                                            {/* Featured Tags */}
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} onClick={(e) => e.stopPropagation()}>
                                                {featuredPost.tags.map(tag => (
                                                    <span 
                                                        key={tag} 
                                                        onClick={() => setActiveTag(tag === activeTag ? null : tag)} 
                                                        className={`type-mono tag-badge${activeTag === tag ? " active" : ""}`}
                                                    >
                                                        #{tag.toLowerCase()}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Featured Cover Image */}
                                        {featuredPost.coverImage && (
                                            <div className="featured-img-col">
                                                <div className="cover-img-box" style={{ aspectRatio: "16 / 9", borderRadius: "3px", position: "relative" }}>
                                                    <Image
                                                        src={featuredPost.coverImage}
                                                        alt={featuredPost.title}
                                                        fill
                                                        sizes="(max-width: 860px) 100vw, 50vw"
                                                        quality={85}
                                                        className="cover-img"
                                                        priority
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </a>
                        )}

                        {/* 2. Regular Posts List */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {(activeTag || searchQuery !== "" ? filteredPosts : regularPosts).map(post => {
                                const d = new Date(post.publishedAt);
                                const formattedDate = d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();

                                return (
                                    <article key={post.slug} className="reveal interactive post-card" style={{ padding: "24px" }}>
                                        <a href={post.url} target="_blank" rel="noopener noreferrer" onClick={() => trackBlogClick(post.title)} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                                            <div className="post-list-layout">
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "10px", alignItems: "center" }}>
                                                        <span className="type-micro" style={{ color: "var(--color-text-tertiary)" }}>{formattedDate}</span>
                                                        <span className="tag" style={{ border: "1px solid var(--color-primary)", color: "var(--color-primary)", padding: "1px 6px", fontSize: "9px" }}>
                                                            {post.category.toUpperCase()}
                                                        </span>
                                                        {post.series && (
                                                            <span className="tag" style={{ border: "1px dashed var(--color-accent)", color: "var(--color-accent)", padding: "1px 6px", fontSize: "9px" }}>
                                                                {post.series}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="post-title" style={{ fontSize: "1.25rem", marginBottom: "10px" }}>
                                                        {post.title}
                                                    </h3>
                                                    {post.brief && (
                                                        <p className="brief-text" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "16px" }}>
                                                            {post.brief}
                                                        </p>
                                                    )}

                                                    {/* Tags */}
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }} onClick={(e) => e.stopPropagation()}>
                                                        {post.tags.map(tag => (
                                                            <span 
                                                                key={tag} 
                                                                onClick={() => setActiveTag(tag === activeTag ? null : tag)} 
                                                                className={`type-mono tag-badge${activeTag === tag ? " active" : ""}`}
                                                            >
                                                                #{tag.toLowerCase()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Post Thumbnail Image */}
                                                {post.coverImage && (
                                                    <div className="post-thumb-box" style={{ position: "relative" }}>
                                                        <Image
                                                            src={post.coverImage}
                                                            alt={post.title}
                                                            fill
                                                            sizes="(max-width: 640px) 100vw, 200px"
                                                            quality={80}
                                                            className="cover-img"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </a>
                                    </article>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            <div className="reveal" style={{ marginTop: "48px" }}>
                <a href="https://hashnode.com/@abhijeetshinde" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <Button variant="secondary" style={{ width: "fit-content" }}>FOLLOW ME ON HASHNODE</Button>
                </a>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ArticleDetail() {
    const params = useParams();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress((scrollPos / docHeight) * 100);
        };

        window.addEventListener("scroll", handleScroll);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <div>
            {/* Progress Bar */}
            <div style={{ position: "fixed", top: "64px", left: 0, height: "2px", background: "var(--color-accent)", width: `${scrollProgress}%`, zIndex: 99, transition: "width 0.1s" }} />

            <main style={{ maxWidth: "680px", margin: "0 auto", padding: "var(--space-8) 24px" }}>
                <header className="reveal" style={{ marginBottom: "64px" }}>
                    <span className="tag" style={{ border: "1px solid var(--color-border)", padding: "4px 10px", marginBottom: "24px", display: "inline-block" }}>ENGINEERING</span>
                    <h1 className="type-h1" style={{ color: "var(--color-text-primary)", marginBottom: "24px" }}>{params.slug?.toString().replace(/-/g, " ").toUpperCase() || "ARTICLE TITLE"}</h1>
                    <p className="body-text" style={{ fontSize: "18px", marginBottom: "32px", color: "var(--color-text-secondary)" }}>
                        A deep dive into creating robust, scalable frontend architectures that stand the test of time and traffic spikes.
                    </p>
                    <div style={{ display: "flex", gap: "24px", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "16px 0" }}>
                        <span className="type-micro" style={{ color: "var(--color-text-secondary)" }}>AUTHOR: MAKER</span>
                        <span className="type-micro" style={{ color: "var(--color-text-secondary)" }}>MAR 02, 2026</span>
                        <span className="type-micro" style={{ color: "var(--color-text-secondary)" }}>8 MIN READ</span>
                    </div>
                </header>

                <article className="reveal body-text article" style={{ color: "var(--color-text-primary)" }}>
                    <p className="drop-cap" style={{ marginBottom: "24px" }}>
                        The complexities of modern web development have pushed us toward increasingly intricate patterns. But complexity is not a goal—it is a tax. In this article, we explore how reducing abstractions can ironically lead to more resilient systems.
                    </p>
                    <p style={{ marginBottom: "24px" }}>
                        When building the foundation of any large-scale application, the very first decision you usually make is how to structure your boundaries. Boundaries dictate communication overhead.
                    </p>

                    <blockquote style={{ margin: "48px 0", paddingLeft: "24px", borderLeft: "3px solid var(--color-accent)", color: "var(--color-text-primary)" }}>
                        &quot;Abstraction is not about hiding complexity, it is about establishing firewalls between disparate domains.&quot;
                    </blockquote>

                    <h2 style={{ fontSize: "var(--type-h3)", marginBottom: "24px", marginTop: "48px" }}>The Implementation Detail</h2>
                    <p style={{ marginBottom: "24px" }}>
                        Below is an example of a simple but highly effective caching pattern using native web APIs.
                    </p>

                    <pre style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "16px", borderRadius: "2px", overflowX: "auto", marginBottom: "32px" }}>
                        <code style={{ fontFamily: "var(--font-dm-mono)", fontSize: "14px", color: "var(--color-text-primary)" }}>
                            {`async function fetchWithCache(url) {
  const cached = await caches.match(url);
  if (cached) return cached.json();

  const response = await fetch(url);
  const cache = await caches.open('v1');
  cache.put(url, response.clone());
  
  return response.json();
}`}
                        </code>
                    </pre>

                    <p style={{ marginBottom: "24px" }}>
                        Notice that we aren&apos;t relying on heavy external state managers. We empower the browser&apos;s native capabilities.
                    </p>
                </article>

                {/* Bio Card */}
                <section className="reveal card" style={{ marginTop: "96px", background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "32px", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#222", overflow: "hidden", flexShrink: 0 }}>
                        <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" alt="Author" width={80} height={80} style={{ objectFit: "cover" }} className="grayscale-hover" />
                    </div>
                    <div>
                        <h4 style={{ color: "var(--color-text-primary)", marginBottom: "8px" }}>ABOUT THE AUTHOR</h4>
                        <p className="body-text" style={{ fontSize: "14px", margin: 0 }}>Maker Builder is a software engineer focused on design systems, performance, and the intersection of code and aesthetics.</p>
                    </div>
                </section>
            </main>

            {/* More Writing */}
            <section className="reveal" style={{ borderTop: "1px solid var(--color-border)", padding: "var(--space-8) 24px", background: "var(--color-surface-alt)" }}>
                <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                    <h4 className="type-ui" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em", marginBottom: "48px" }}>MORE WRITING</h4>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                        {[
                            { tag: "DESIGN", title: "Typographic Scales for Dark Interfaces", date: "FEB 14, 2026", time: "5 MIN READ" },
                            { tag: "THOUGHTS", title: "The Value of Slow Execution", date: "JAN 28, 2026", time: "4 MIN READ" },
                            { tag: "TUTORIALS", title: "Mastering Asymmetric CSS Grids", date: "JAN 12, 2026", time: "6 MIN READ" },
                        ].map((post, i) => (
                            <div key={i} className="card interactive" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderTop: "2px solid var(--color-border)", borderRadius: "2px", padding: "32px 24px" }}
                                onMouseOver={(e) => { e.currentTarget.style.borderTopColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                                onMouseOut={(e) => { e.currentTarget.style.borderTopColor = "var(--color-border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                            >
                                <span className="tag" style={{ border: "1px solid var(--color-border)", padding: "4px 10px", borderRadius: "2px", marginBottom: "24px", display: "inline-block" }}>{post.tag}</span>
                                <h4 style={{ color: "var(--color-text-primary)", marginBottom: "48px", minHeight: "48px" }}>{post.title}</h4>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span className="type-micro" style={{ color: "var(--color-text-secondary)" }}>{post.date}</span>
                                    <span className="type-micro" style={{ color: "var(--color-text-secondary)" }}>{post.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

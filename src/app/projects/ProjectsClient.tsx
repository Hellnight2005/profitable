"use client";

import { useEffect, useRef, useState } from "react";
import { GithubRepo } from "./page";
import { trackProjectClick } from "@/utils/analytics";

interface ClientProps {
    initialRepos: GithubRepo[];
}

function ProjectRow({ proj, index }: { proj: GithubRepo; index: number }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // stagger each card by index * 80ms after it enters view
                        setTimeout(() => setRevealed(true), index * 80);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    return (
        <a
            ref={ref}
            href={`/projects/${proj.name}`}
            onClick={() => trackProjectClick(proj.name)}
            className="interactive"
            style={{
                display: "block",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border)",
                paddingBottom: "24px",
                transition: "border-color 0.2s ease",
                /* clip-path wipe: before reveal = closed (left edge), after = fully open */
                clipPath: revealed
                    ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                    : "polygon(0 0, 0 0, 0 100%, 0 100%)",
                opacity: revealed ? 1 : 0,
                transitionProperty: "clip-path, opacity, border-color",
                transitionDuration: "600ms, 200ms, 200ms",
                transitionTimingFunction:
                    "cubic-bezier(0.76, 0, 0.24, 1), ease, ease",
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.borderBottomColor = "var(--color-accent)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.borderBottomColor = "var(--color-border)";
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "8px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <h2
                        style={{
                            color: "var(--color-text-primary)",
                            fontSize: "24px",
                            margin: 0,
                        }}
                    >
                        {proj.name}
                    </h2>
                    {proj.upcoming && (
                        <span
                            className="tag"
                            style={{
                                border: "1px solid var(--color-accent)",
                                padding: "2px 8px",
                                borderRadius: "2px",
                                fontSize: "10px",
                                color: "var(--color-accent)",
                            }}
                        >
                            UPCOMING
                        </span>
                    )}
                </div>
            </div>
            <p
                className="body-text"
                style={{
                    fontSize: "16px",
                    margin: 0,
                    color: "var(--color-text-secondary)",
                }}
            >
                {proj.description || "No description provided."}
            </p>
        </a>
    );
}

export function ProjectsClient({ initialRepos }: ClientProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {initialRepos.map((proj, i) => (
                <ProjectRow key={proj.id} proj={proj} index={i} />
            ))}
        </div>
    );
}

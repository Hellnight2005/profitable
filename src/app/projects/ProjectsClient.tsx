"use client";

import { useEffect } from "react";
import { GithubRepo } from "./page";
interface ClientProps {
    initialRepos: GithubRepo[];
}

export function ProjectsClient({ initialRepos }: ClientProps) {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [initialRepos]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {initialRepos.map((proj) => (
                <a href={`/projects/${proj.name}`} key={proj.id} className="reveal interactive" style={{ display: "block", textDecoration: "none", borderBottom: "1px solid var(--color-border)", paddingBottom: "24px", transition: "border-color 0.2s ease" }}
                    onMouseOver={(e) => { e.currentTarget.style.borderBottomColor = "var(--color-accent)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderBottomColor = "var(--color-border)"; }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h2 style={{ color: "var(--color-text-primary)", fontSize: "24px", margin: 0 }}>{proj.name}</h2>
                            {proj.upcoming && (
                                <span className="tag" style={{ border: "1px solid var(--color-accent)", padding: "2px 8px", borderRadius: "2px", fontSize: "10px", color: "var(--color-accent)" }}>UPCOMING</span>
                            )}
                        </div>
                    </div>
                    <p className="body-text" style={{ fontSize: "16px", margin: 0, color: "var(--color-text-secondary)" }}>
                        {proj.description || "No description provided."}
                    </p>
                </a>
            ))}
        </div>
    );
}

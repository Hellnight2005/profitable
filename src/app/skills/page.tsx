"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

const SKILLS = [
    {
        cat: "FRONTEND",
        items: [
            "React",
            "Next.js",
            "Vite",
            "TypeScript",
            "Modern CSS",
        ],
    },
    {
        cat: "BACKEND",
        items: [
            "Node.js",
            "REST API Design",
            "GraphQL",
            "Microservices Architecture",
        ],
    },
    {
        cat: "DATA & MESSAGING",
        items: [
            "PostgreSQL",
            "Redis",
            "Kafka",
            "Neo4j",
        ],
    },
    {
        cat: "DEVOPS & TOOLS",
        items: [
            "Docker",
            "Git",
            "GitHub",
            "Linux",
            "VS Code",
        ],
    },
    {
        cat: "AI & AUTOMATION",
        items: [
            "LLM Application Development",
            "RAG (Retrieval-Augmented Generation)",
            "n8n Workflow Automation",
            "AI Agents & Chatbots",
        ],
    },

];
const TOOLS = [
    {
        name: "VS Code",
        logo: "https://imgs.search.brave.com/9-1xtLOZo8A8oQf-w0mn-kM_H9MZCH_9Mmz9m1b9cQQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb2Rl/LnZpc3VhbHN0dWRp/by5jb20vYXNzZXRz/L2JyYW5kaW5nL2Nv/ZGUtc3RhYmxlLnBu/Zw"
    },
    {
        name: "AI-Assisted IDEs",
        logo: "https://imgs.search.brave.com/hs47ZwHI3GUObzogpxWmjeOvdYNC4NuT3RmVZBJ4v60/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9vcGVuYWkt/aWNvbi1zdmctZG93/bmxvYWQtcG5nLTEy/OTAyMDIucG5nP2Y9/d2VicCZ3PTI1Ng"
    },
    {
        name: "Git",
        logo: "https://cdn.simpleicons.org/git"
    },
    {
        name: "GitHub",
        logo: "https://cdn.simpleicons.org/github"
    },
    {
        name: "Docker",
        logo: "https://cdn.simpleicons.org/docker"
    },
    {
        name: "Postman",
        logo: "https://cdn.simpleicons.org/postman"
    },
    {
        name: "DBeaver",
        logo: "https://cdn.simpleicons.org/dbeaver"
    },
    {
        name: "Vercel",
        logo: "https://cdn.simpleicons.org/vercel"
    },
    // {
    //     name: "Supabase",
    //     logo: "https://cdn.simpleicons.org/supabase"
    // }
];
const SERVICES = [
    {
        name: "FULL-STACK WEB DEVELOPMENT",
        desc: "Building modern web applications using React, Next.js, and Node.js.",
        price: "CUSTOM",
    },
    {
        name: "API & BACKEND DEVELOPMENT",
        desc: "Developing REST or GraphQL APIs with scalable backend architecture and databases.",
        price: "CUSTOM",
    },
    {
        name: "AI APPLICATION DEVELOPMENT",
        desc: "Creating AI-powered apps, RAG systems, and chatbots using modern LLM technologies.",
        price: "CUSTOM + PLATFORM FEES",
    },
    {
        name: "AUTOMATION & WORKFLOW SYSTEMS",
        desc: "Building automation workflows and integrations to streamline processes.",
        price: "CUSTOM + PLATFORM FEES",
    },
    {
        name: "MICROSERVICE BACKEND SYSTEMS",
        desc: "Designing modular backend services using Node.js, Kafka, Redis, and Docker.",
        price: "CUSTOM",
    },
];

export default function Skills() {
    const router = useRouter();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ padding: "var(--space-8) 24px" }}>
            <header className="reveal" style={{ maxWidth: "1280px", margin: "0 auto", marginBottom: "64px" }}>
                <h1 className="type-display" style={{ color: "var(--color-text-primary)" }}>SKILLS & SERVICES</h1>
            </header>

            {/* Skills */}
            <section className="reveal" style={{ maxWidth: "1280px", margin: "0 auto", marginBottom: "96px" }}>
                <h4 className="type-ui" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em", marginBottom: "48px" }}>CAPABILITIES</h4>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px" }}>
                    {SKILLS.map((skill) => (
                        <div key={skill.cat}>
                            <h3 style={{ color: "var(--color-text-primary)", marginBottom: "16px" }}>{skill.cat}</h3>
                            <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", marginBottom: "24px" }} />
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {skill.items.map((item, i) => (
                                    <li key={i} className="body-text" style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
                                        <span style={{ color: "var(--color-accent)" }}>→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tools */}
            <section className="reveal" style={{ maxWidth: "1280px", margin: "0 auto", marginBottom: "96px" }}>
                <h4 className="type-ui" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em", marginBottom: "48px" }}>TOOLS</h4>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "24px" }}>
                    {TOOLS.map((tool) => (
                        <div key={tool.name} className="interactive" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "24px", textAlign: "center", borderRadius: "2px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.transform = "scale(1.04)"; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.transform = "scale(1)"; }}>
                            <img src={tool.logo} alt={tool.name} style={{ width: "32px", height: "32px", objectFit: "contain", filter: "invert(0.8)" }} />
                            <span className="type-ui" style={{ color: "var(--color-text-primary)" }}>{tool.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="reveal" style={{ maxWidth: "1280px", margin: "0 auto", marginBottom: "96px" }}>
                <h4 className="type-ui" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em", marginBottom: "48px" }}>SERVICES</h4>

                <div>
                    {SERVICES.map((s, i) => (
                        <div key={i} onClick={() => router.push(`/contact?subject=${encodeURIComponent(s.name)}`)} className="interactive service-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", borderBottom: "2px solid var(--color-border)", padding: "32px 16px", cursor: "pointer" }}>
                            <div style={{ flex: "1 1 50%", minWidth: "300px" }}>
                                <h3 className="service-title" style={{ color: "var(--color-text-primary)", marginBottom: "8px", transition: "color 0.2s" }}>{s.name}</h3>
                                <p className="body-text" style={{ margin: 0 }}>{s.desc}</p>
                            </div>
                            <div style={{ minWidth: "150px", textAlign: "right" }}>
                                <span className="type-ui" style={{ color: "var(--color-accent)" }}>{s.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <style jsx>{`
          .service-row:hover { background: var(--color-surface); border-left: 4px solid var(--color-accent); padding-left: 28px !important; }
        `}</style>
            </section>

            {/* Engagement */}
            <section className="reveal" style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <h4 className="type-ui" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em", marginBottom: "48px" }}>ENGAGEMENT MODEL</h4>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                    {[
                        {
                            tag: "FREELANCE",
                            title: "Project-Based Work",
                            desc: "Building full features or applications with clear scope, deliverables, and timelines.",
                        },
                        {
                            tag: "CONTRACT",
                            title: "Part-Time Development",
                            desc: "Working with your team for ongoing development, integrations, or feature implementation.",
                        },
                        {
                            tag: "COLLABORATION",
                            title: "Startup / MVP Builds",
                            desc: "Helping startups and founders build MVPs, prototypes, and technical foundations.",
                        },
                    ].map((m) => (
                        <div key={m.tag} className="card interactive" style={{ background: "var(--color-surface-alt)", border: "1px solid var(--color-border)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                            <div>
                                <span className="tag" style={{ border: "1px solid var(--color-border)", padding: "4px 10px", marginBottom: "24px", display: "inline-block" }}>{m.tag}</span>
                                <h3 style={{ color: "var(--color-text-primary)", marginBottom: "16px" }}>{m.title}</h3>
                                <p className="body-text" style={{ marginBottom: "32px" }}>{m.desc}</p>
                            </div>
                            <Button onClick={() => router.push(`/contact?subject=${encodeURIComponent(m.tag + " - " + m.title)}`)} variant="primary" style={{ width: "100%" }}>LET&apos;S TALK</Button>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

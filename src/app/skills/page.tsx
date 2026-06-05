"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import Image from "next/image";

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
        <div className="skills-container">
            <style>{`
                .skills-container {
                    padding: var(--space-8) 24px;
                }
                .skills-section {
                    max-width: 1280px;
                    margin: 0 auto;
                    margin-bottom: 96px;
                }
                .skills-header {
                    max-width: 1280px;
                    margin: 0 auto 64px;
                }
                .skills-title {
                    color: var(--color-text-primary);
                }
                .skills-section-label {
                    color: var(--color-text-tertiary);
                    letter-spacing: 0.16em;
                    margin-bottom: 48px;
                }
                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 48px;
                }
                .skills-cat-title {
                    color: var(--color-text-primary);
                    margin-bottom: 16px;
                }
                .skills-cat-hr {
                    border: none;
                    border-top: 1px solid var(--color-border);
                    margin-bottom: 24px;
                }
                .skills-list {
                    list-style: none;
                    padding: 0;
                }
                .skills-item {
                    margin-bottom: 12px;
                    display: flex;
                    gap: 12px;
                }
                .skills-item-arrow {
                    color: var(--color-accent);
                }
                .tools-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 24px;
                }
                .tool-card {
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    padding: 24px;
                    text-align: center;
                    border-radius: 2px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    transition: border-color 0.2s, transform 0.2s;
                }
                .tool-card:hover {
                    border-color: var(--color-accent);
                    transform: scale(1.04);
                }
                .tool-logo-img {
                    object-fit: contain;
                    filter: invert(0.8);
                }
                .tool-name {
                    color: var(--color-text-primary);
                }
                .service-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 24px;
                    border-bottom: 2px solid var(--color-border);
                    padding: 32px 16px;
                    cursor: pointer;
                    transition: background 0.2s, border-left 0.2s, padding-left 0.2s;
                }
                .service-row:hover {
                    background: var(--color-surface);
                    border-left: 4px solid var(--color-accent);
                    padding-left: 28px;
                }
                .service-row-main {
                    flex: 1 1 50%;
                    min-width: 300px;
                }
                .service-title {
                    color: var(--color-text-primary);
                    margin-bottom: 8px;
                    transition: color 0.2s;
                }
                .service-row:hover .service-title {
                    color: var(--color-accent);
                }
                .service-desc {
                    margin: 0;
                }
                .service-price-container {
                    min-width: 150px;
                    text-align: right;
                }
                .service-price {
                    color: var(--color-accent);
                }
                .engagement-section {
                    max-width: 1280px;
                    margin: 0 auto;
                }
                .engagement-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                }
                .engagement-card {
                    background: var(--color-surface-alt);
                    border: 1px solid var(--color-border);
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .engagement-tag {
                    border: 1px solid var(--color-border);
                    padding: 4px 10px;
                    margin-bottom: 24px;
                    display: inline-block;
                }
                .engagement-title {
                    color: var(--color-text-primary);
                    margin-bottom: 16px;
                }
                .engagement-desc {
                    margin-bottom: 32px;
                }
                .engagement-btn {
                    width: 100%;
                }
            `}</style>

            <header className="reveal skills-header">
                <h1 className="type-display skills-title">SKILLS & SERVICES</h1>
            </header>

            {/* Skills */}
            <section className="reveal skills-section">
                <h4 className="type-ui skills-section-label">CAPABILITIES</h4>

                <div className="skills-grid">
                    {SKILLS.map((skill) => (
                        <div key={skill.cat}>
                            <h3 className="skills-cat-title">{skill.cat}</h3>
                            <hr className="skills-cat-hr" />
                            <ul className="skills-list">
                                {skill.items.map((item) => (
                                    <li key={item} className="body-text skills-item">
                                        <span className="skills-item-arrow">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tools */}
            <section className="reveal skills-section">
                <h4 className="type-ui skills-section-label">TOOLS</h4>

                <div className="tools-grid">
                    {TOOLS.map((tool) => (
                        <div key={tool.name} className="interactive tool-card">
                            <Image
                                src={tool.logo}
                                alt={tool.name}
                                width={32}
                                height={32}
                                className="tool-logo-img"
                                unoptimized
                            />
                            <span className="type-ui tool-name">{tool.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="reveal skills-section">
                <h4 className="type-ui skills-section-label">SERVICES</h4>

                <div>
                    {SERVICES.map((s) => (
                        <div
                            key={s.name}
                            onClick={() => router.push(`/contact?subject=${encodeURIComponent(s.name)}`)}
                            className="interactive service-row"
                        >
                            <div className="service-row-main">
                                <h3 className="service-title">{s.name}</h3>
                                <p className="body-text service-desc">{s.desc}</p>
                            </div>
                            <div className="service-price-container">
                                <span className="type-ui service-price">{s.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Engagement */}
            <section className="reveal engagement-section">
                <h4 className="type-ui skills-section-label">ENGAGEMENT MODEL</h4>

                <div className="engagement-grid">
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
                        <div key={m.tag} className="card interactive engagement-card">
                            <div>
                                <span className="tag engagement-tag">{m.tag}</span>
                                <h3 className="engagement-title">{m.title}</h3>
                                <p className="body-text engagement-desc">{m.desc}</p>
                            </div>
                            <Button
                                onClick={() => router.push(`/contact?subject=${encodeURIComponent(m.tag + " - " + m.title)}`)}
                                variant="primary"
                                className="engagement-btn"
                            >
                                LET&apos;S TALK
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

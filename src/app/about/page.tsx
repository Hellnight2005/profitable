"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export default function About() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Horizontal scroll support with wheel for the interests section
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (scrollContainerRef.current) {
                if (e.deltaY !== 0) {
                    scrollContainerRef.current.scrollLeft += e.deltaY;
                    e.preventDefault();
                }
            }
        };
        const el = scrollContainerRef.current;
        if (el) {
            el.addEventListener("wheel", handleWheel, { passive: false });
        }
        return () => {
            if (el) el.removeEventListener("wheel", handleWheel);
        };
    }, []);

    // Carousel Drag Handlers
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - startX;
        setRotation(prev => prev + deltaX * 0.1); // Adjust sensitivity
        setStartX(clientX);
    }, [isDragging, startX]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setRotation(prev => Math.round(prev / 30) * 30);
    }, []);

    return (
        <div style={{ width: "100%", overflowX: "hidden", paddingBottom: "128px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

                {/* HERO SECTION */}
                <header className="reveal" style={{ paddingTop: "128px", paddingBottom: "128px", display: "flex", flexDirection: "column", gap: "32px", marginBottom: "96px" }}>
                    <div style={{ overflow: "hidden" }}>
                        <span className="type-mono" style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.5em", color: "var(--color-accent)", opacity: 0.8, display: "block" }}>Profile No. 001</span>
                    </div>

                    <h1 className="type-display" style={{ fontSize: "clamp(60px, 12vw, 160px)", lineHeight: 0.85, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-0.02em" }}>
                        ABHIJEET<br />SHINDE
                    </h1>

                    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px" }}>
                        <p className="type-mono" style={{ fontSize: "clamp(16px, 2vw, 24px)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                            Self-taught. Curious by nature, <span style={{ color: "var(--color-text-primary)" }}>builder by habit</span>.
                        </p>
                        <p className="type-mono" style={{ fontSize: "14px", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>
                            I explore the intersection of backend architecture, DevOps, and scalable systems — not just to ship things, but to truly understand them. I believe the best engineers are the ones who never stop asking questions.
                        </p>
                        <p className="type-mono" style={{ fontSize: "14px", color: "var(--color-text-tertiary)", lineHeight: 1.6 }}>
                            Currently: learning in public, building things that matter, and connecting dots across disciplines.
                        </p>
                    </div>

                    <div style={{ marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", borderTop: "1px solid var(--color-border)", paddingTop: "32px" }}>
                        <div>
                            <span className="type-micro" style={{ color: "var(--color-accent)", letterSpacing: "0.2em", display: "block", marginBottom: "8px" }}>LOCATION</span>
                            <span className="type-mono" style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Mumbai, India</span>
                        </div>
                        <div>
                            <span className="type-micro" style={{ color: "var(--color-accent)", letterSpacing: "0.2em", display: "block", marginBottom: "8px" }}>SPECIALIZATION</span>
                            <span className="type-mono" style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Backend & Systems Engineering</span>
                        </div>
                    </div>
                </header>

                {/* PROFILE IMAGE */}
                {/* <section className="reveal" style={{ paddingBottom: "128px" }}>
                    <div className="group interactive" style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
                        <div style={{ position: "absolute", top: "-16px", right: "-16px", bottom: "-16px", left: "-16px", border: "1px solid var(--color-border)", zIndex: -1, pointerEvents: "none" }} />
                        <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                            <Image
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200"
                                alt="Alexander Vance Portrait Pattern"
                                fill
                                style={{ objectFit: "cover", transition: "transform 0.7s ease" }}
                                className="grayscale brightness-90 contrast-110 group-hover-scale"
                            />
                            <div style={{ position: "absolute", bottom: "16px", left: "16px" }}>
                                <span className="type-display text-outline" style={{ fontSize: "48px", opacity: 0.3, letterSpacing: "0.05em" }}>AV-92</span>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* INTERESTS (Orbiting Image Carousel) */}
                <section className="reveal" style={{ paddingBottom: "128px", width: "100%", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "48px", borderBottom: "1px solid var(--color-border)", paddingBottom: "16px" }}>
                        <h2 className="type-display" style={{ fontSize: "32px", color: "var(--color-text-primary)", letterSpacing: "0.1em", margin: 0 }}>INTERESTS</h2>
                        <span className="type-mono" style={{ fontSize: "9px", color: "var(--color-text-tertiary)" }}>SLIDE HORIZONTALLY</span>
                    </div>

                    <div
                        className="carousel-wrapper"
                        style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)", height: "800px", overflow: "hidden", cursor: isDragging ? "grabbing" : "grab" }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                    >
                        {/* Huge Invisible Rotating Arc */}
                        <div className="carousel-orbit" style={{
                            position: "absolute",
                            width: "3000px",
                            height: "3000px",
                            borderRadius: "50%",
                            border: "1px solid var(--color-border)",
                            opacity: 0.5,
                            left: "50%",
                            top: "1800px",
                            zIndex: 1,
                            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
                        }}>
                            {[
                                {
                                    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
                                    title: "System Design",
                                    desc: "Designing scalable systems by understanding how everything connects."
                                },
                                {
                                    src: "https://i.pinimg.com/736x/04/45/2e/04452ee9b50e1db5ed174f1d260ca5d1.jpg",
                                    title: "Tech Explorer",
                                    desc: "Exploring emerging technologies and testing new ideas."
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1200",
                                    title: "Builder Mindset",
                                    desc: "Creating from scratch to understand how things actually work."
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200",
                                    title: "Problem Solver",
                                    desc: "Breaking complex problems into simple, logical steps."
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
                                    title: "First Principles",
                                    desc: "Understanding systems by questioning assumptions and basics."
                                },
                                {
                                    src: "https://i.pinimg.com/736x/96/d7/cd/96d7cd12dd797ab37c113787bd9bdfb2.jpg",
                                    title: "Music Listener",
                                    desc: "Listening to music to relax, focus, and stay in the flow."
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
                                    title: "Systems Thinking",
                                    desc: "Seeing patterns and connections across complex environments."
                                },
                                {
                                    src: "https://i.pinimg.com/736x/af/15/13/af1513343b64c79360f6b1376d75970f.jpg",
                                    title: "Hardware Curiosity",
                                    desc: "Exploring how physical systems and components function."
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=1200",
                                    title: "Deep Focus",
                                    desc: "Working with intense concentration for long problem-solving sessions."
                                },
                                {
                                    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
                                    title: "Curious Mind",
                                    desc: "Driven to explore, question, and understand things deeply."
                                },
                                {
                                    src: "https://i.pinimg.com/1200x/3d/31/ef/3d31ef975700b3d9c15bbc30f46be45a.jpg",
                                    title: "Movie Enthusiast",
                                    desc: "Interested in storytelling, ideas, and cinematic perspectives."
                                },
                                {
                                    src: "https://i.pinimg.com/avif/736x/74/56/43/7456432bd045d1f74bed6265fa0b51c6.avf",
                                    title: "Anime Lover",
                                    desc: "Drawn to creativity, world-building, and unique narratives."
                                }
                            ].map((item, i) => {
                                const baseAngle = i * 30; // Closer spacing of 30deg
                                // Calculate the absolute effective angle to determine if it's currently at the top dead center
                                // The top of the circle relative to the DOM is at 0 degrees.
                                const effectiveAngle = (baseAngle + rotation) % 360;
                                const normalizedAngle = effectiveAngle > 180 ? effectiveAngle - 360 : effectiveAngle < -180 ? effectiveAngle + 360 : effectiveAngle;

                                // Center window threshold
                                const isActive = Math.abs(normalizedAngle) < 15;

                                return (
                                    <div key={i} className="group" style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: `translate(-50%, -50%) rotate(${baseAngle}deg) translateY(-1500px)`,
                                        transformOrigin: "center center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "32px",
                                        width: "360px",
                                        pointerEvents: "none", // Allow drag events to pass through
                                        opacity: isActive ? 1 : 0.4,
                                        transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
                                    }}>
                                        <div style={{
                                            width: "360px",
                                            height: "480px",
                                            position: "relative",
                                            borderRadius: "32px",
                                            overflow: "hidden",
                                            border: "1px solid var(--color-border)",
                                            transform: `scale(${isActive ? 1 : 0.85})`,
                                            transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
                                        }}>
                                            <Image src={item.src} alt={item.title} fill style={{ objectFit: "cover", transition: "transform 0.7s ease", filter: isActive ? "brightness(1.25)" : "grayscale(100%) brightness(1.25)" }} />
                                            <div style={{ position: "absolute", inset: 0, background: "var(--color-bg)", opacity: isActive ? 0 : 0.4, transition: "opacity 0.6s ease" }} />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "12px",
                                            textAlign: "center",
                                            opacity: isActive ? 1 : 0,
                                            transform: `translateY(${isActive ? 0 : 20}px)`,
                                            transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
                                        }}>
                                            <h3 className="type-display" style={{ fontSize: "28px", color: "var(--color-text-primary)", margin: 0 }}>{item.title}</h3>
                                            <p className="type-mono" style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: "280px" }}>{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CHRONOLOGY */}
                {/* <section className="reveal" style={{ paddingBottom: "128px" }}>
                    <h2 className="type-display" style={{ fontSize: "32px", color: "var(--color-text-primary)", letterSpacing: "0.1em", marginBottom: "64px" }}>CHRONOLOGY</h2>

                    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "64px", paddingLeft: "40px" }}>
                        
                        <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "1px", background: "var(--color-border)" }} />

                        {[
                            { dates: "2023 — CURRENT", title: "Founder, Synthetic Artifacts", desc: "Pioneering the application of neural networks in high-precision hardware manufacturing and procedural design systems.", active: true },
                            { dates: "2020 — 2022", title: "Sr. Product Lead, Velocity", desc: "Architected the cockpit interface and flight-management systems for next-gen electric aerospace platforms.", active: false },
                            { dates: "2017 — 2020", title: "Design Engineer, Kinetic", desc: "Focused on parametric modeling and CNC-optimized construction methodologies for modular architecture.", active: false }
                        ].map((item, i) => (
                            <div key={i} className="group" style={{ position: "relative" }}>
                                
                                <div style={{ position: "absolute", left: "-43px", top: "4px", width: "7px", height: "7px", background: item.active ? "var(--color-accent)" : "var(--color-text-tertiary)", transform: "rotate(45deg)", transition: "background 0.3s" }} className={item.active ? "pulse-node" : "group-hover-active"} />

                                <span className="type-mono" style={{ fontSize: "10px", color: "var(--color-text-tertiary)", display: "block", marginBottom: "8px", letterSpacing: "0.2em" }}>{item.dates}</span>
                                <h3 className="type-display" style={{ fontSize: "24px", color: "var(--color-text-primary)", marginBottom: "8px", letterSpacing: "-0.01em" }}>{item.title}</h3>
                                <p className="type-mono" style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: "600px" }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section> */}

                {/* ETHOS */}
                <section className="reveal" style={{ paddingBottom: "96px" }}>
                    <h2 className="type-display" style={{ fontSize: "32px", color: "var(--color-text-primary)", letterSpacing: "0.1em", marginBottom: "64px" }}>ETHOS</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px" }}>
                        {[
                            { num: "01", title: "HONEST UTILITY", desc: "Function is the highest form of beauty. We remove the unnecessary until only the essential logic remains—clear, purposeful, and unapologetic." },
                            { num: "02", title: "DIGITAL TACTILITY", desc: "Software should feel as deliberate as a crafted tool. Weight, friction, and response are not merely physical qualities—they are fundamental to digital experience." },
                            { num: "03", title: "SYSTEMIC RIGOR", desc: "Design is not a moment of inspiration but a disciplined system. We create frameworks where complexity can emerge from clear rules and precise structure." }
                        ].map((ethos, i) => (
                            <div key={i} style={{ position: "relative" }}>
                                <span className="type-display" style={{ position: "absolute", top: "-40px", left: "0", fontSize: "120px", color: "var(--color-text-primary)", opacity: 0.03, userSelect: "none" }}>{ethos.num}</span>
                                <h3 className="type-display" style={{ fontSize: "32px", color: "var(--color-text-primary)", marginBottom: "16px", letterSpacing: "-0.02em", position: "relative", zIndex: 1 }}>{ethos.title}</h3>
                                <p className="type-mono" style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6, paddingLeft: "24px", borderLeft: "1px solid var(--color-accent)", position: "relative", zIndex: 1 }}>{ethos.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .text-outline {
                    -webkit-text-stroke: 1px var(--color-border);
                    color: transparent;
                }
                .group:hover .group-hover-active {
                    background: var(--color-accent) !important;
                }
                .group:hover .group-hover-scale {
                    transform: scale(1.05);
                }
                .grayscale {
                    filter: grayscale(100%);
                }
                @keyframes nodePulse {
                    0% { box-shadow: 0 0 0 0 rgba(236, 160, 19, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(236, 160, 19, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(236, 160, 19, 0); }
                }
                .pulse-node {
                    animation: nodePulse 2s infinite;
                }

                /* IMAGE CAROUSEL CSS */
                .group:hover .group-hover-opacity {
                    opacity: 0 !important;
                }
            `}} />
        </div>
    );
}
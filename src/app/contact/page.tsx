"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
    const [focus, setFocus] = useState<string | null>(null);

    // Form states
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const subject = params.get("subject");
            if (subject) {
                setForm(f => ({ ...f, subject }));
            }
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) e.target.classList.add("visible");
            });
        }, { threshold: 0.1 });
        document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const inputStyle = (id: string): React.CSSProperties => ({
        background: "transparent",
        border: "none",
        borderBottom: focus === id ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
        width: "100%",
        padding: "16px 0",
        color: "var(--color-text-primary)",
        fontFamily: "var(--font-dm-mono)",
        fontSize: "var(--type-body)",
        outline: "none",
        transition: "border-color 0.2s ease",
    });

    const setField = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");
        
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            
            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error — please try again.");
        }
    };

    return (
        <div style={{ padding: "var(--space-8) 24px 0" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "64px" }}>

                {/* Left Col */}
                <section className="reveal" style={{ flex: "1 1 45%", minWidth: "300px" }}>
                    <h1 className="type-display" style={{ color: "var(--color-text-primary)", marginBottom: "32px" }}>SAY HELLO.</h1>
                    <p className="body-text" style={{ marginBottom: "48px", maxWidth: "400px" }}>
                        Whether you have a project in mind, want to discuss a potential collaboration, or just want to say hi, my inbox is always open.
                    </p>
                    <div style={{ marginBottom: "64px" }}>
                        <span className="type-micro" style={{ color: "var(--color-text-tertiary)", display: "block", marginBottom: "8px" }}>DIRECT EMAIL</span>
                        <a href="mailto:abhijeet2005shinde@gmail.com" style={{ fontFamily: "var(--font-dm-mono)", fontSize: "24px", color: "var(--color-accent)", textDecoration: "none" }}>abhijeet2005shinde@gmail.com</a>
                        <span className="type-micro" style={{ color: "var(--color-text-tertiary)", display: "block", marginTop: "16px" }}>I typically respond within 24–48 hours.</span>
                    </div>

                    <span className="type-micro" style={{ color: "var(--color-text-tertiary)", display: "block", marginBottom: "16px" }}>CONNECT ON</span>
                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "48px" }}>
                        <a href="https://github.com/Hellnight2005" target="_blank" rel="noopener noreferrer" className="nav-link type-ui" style={{ color: "var(--color-text-primary)" }}>GitHub</a>
                        <a href="https://www.linkedin.com/in/abhi2005jeet/" target="_blank" rel="noopener noreferrer" className="nav-link type-ui" style={{ color: "var(--color-text-primary)" }}>LinkedIn</a>
                        <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link type-ui" style={{ color: "var(--color-text-primary)" }}>Resume</a>
                    </div>
                </section>

                {/* Right Col Form */}
                <section className="reveal" style={{ flex: "1 1 45%", minWidth: "300px" }}>
                    {status === "success" ? (
                        <div style={{ padding: "64px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                            <span style={{ fontSize: "40px", color: "#4ade80" }}>✓</span>
                            <h3 style={{ color: "var(--color-text-primary)" }}>Message Sent</h3>
                            <p className="body-text">Thanks for reaching out! I&apos;ll get back to you soon.</p>
                            <Button variant="secondary" onClick={() => setStatus("idle")} style={{ marginTop: "24px" }}>Send Another</Button>
                        </div>
                    ) : (
                        <form style={{ display: "flex", flexDirection: "column", gap: "32px" }} onSubmit={handleSubmit}>
                            
                            {status === "error" && (
                                <div style={{ color: "#f87171", fontFamily: "var(--font-dm-mono)", fontSize: "12px", border: "1px solid rgba(248,113,113,0.3)", padding: "12px", background: "rgba(248,113,113,0.05)" }}>
                                    Error: {errorMsg}
                                </div>
                            )}

                            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                                <div style={{ flex: "1 1 calc(50% - 16px)", minWidth: "200px", position: "relative" }}>
                                    <span className="type-micro" style={{ position: "absolute", top: focus === "name" || form.name ? "-16px" : "16px", color: focus === "name" ? "var(--color-accent)" : "var(--color-text-secondary)", transition: "all 0.2s" }}>{focus === "name" || form.name ? "NAME" : ""}</span>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder={focus === "name" ? "" : "NAME"} 
                                        value={form.name}
                                        onChange={setField("name")}
                                        onFocus={() => setFocus("name")} 
                                        onBlur={() => setFocus(null)} 
                                        style={inputStyle("name")} 
                                    />
                                </div>
                                <div style={{ flex: "1 1 calc(50% - 16px)", minWidth: "200px", position: "relative" }}>
                                    <span className="type-micro" style={{ position: "absolute", top: focus === "email" || form.email ? "-16px" : "16px", color: focus === "email" ? "var(--color-accent)" : "var(--color-text-secondary)", transition: "all 0.2s" }}>{focus === "email" || form.email ? "EMAIL" : ""}</span>
                                    <input 
                                        type="email" 
                                        required
                                        placeholder={focus === "email" ? "" : "EMAIL"} 
                                        value={form.email}
                                        onChange={setField("email")}
                                        onFocus={() => setFocus("email")} 
                                        onBlur={() => setFocus(null)} 
                                        style={inputStyle("email")} 
                                    />
                                </div>
                            </div>

                            <div style={{ position: "relative" }}>
                                <span className="type-micro" style={{ position: "absolute", top: focus === "subject" || form.subject ? "-16px" : "16px", color: focus === "subject" ? "var(--color-accent)" : "var(--color-text-secondary)", transition: "all 0.2s" }}>{focus === "subject" || form.subject ? "SUBJECT" : ""}</span>
                                <input 
                                    type="text"
                                    required
                                    placeholder={focus === "subject" ? "" : "SUBJECT"}
                                    value={form.subject}
                                    onChange={setField("subject")}
                                    onFocus={() => setFocus("subject")} 
                                    onBlur={() => setFocus(null)} 
                                    style={inputStyle("subject")}
                                />
                            </div>

                            <div style={{ position: "relative" }}>
                                <span className="type-micro" style={{ position: "absolute", top: focus === "message" || form.message ? "-16px" : "16px", color: focus === "message" ? "var(--color-accent)" : "var(--color-text-secondary)", transition: "all 0.2s" }}>{focus === "message" || form.message ? "MESSAGE" : ""}</span>
                                <textarea 
                                    required
                                    value={form.message}
                                    onChange={setField("message")}
                                    placeholder={focus === "message" ? "" : "MESSAGE"} 
                                    onFocus={() => setFocus("message")} 
                                    onBlur={() => setFocus(null)} 
                                    rows={5} 
                                    style={{ ...inputStyle("message"), resize: "none" }} 
                                />
                            </div>

                            <Button 
                                type="submit"
                                disabled={status === "loading"}
                                variant="primary" 
                                style={{ width: "100%", marginTop: "16px", opacity: status === "loading" ? 0.7 : 1, cursor: status === "loading" ? "wait" : "pointer" }}
                            >
                                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
                            </Button>
                        </form>
                    )}
                </section>
            </div>

            {/* Bottom CTA */}
            <section className="reveal" style={{ background: "var(--color-surface)", padding: "var(--space-8) 24px", textAlign: "center", marginTop: "128px", borderTop: "1px solid var(--color-border)" }}>
                <h2 style={{ color: "var(--color-text-primary)", marginBottom: "16px" }}>OPEN TO OPPORTUNITIES</h2>
                <p className="body-text" style={{ maxWidth: "400px", margin: "0 auto" }}>Currently accepting freelance projects for Q3 2026. Reach out if you&apos;d like to collaborate.</p>
            </section>
        </div>
    );
}

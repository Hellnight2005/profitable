import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 — Page Not Found",
    description: "This page does not exist.",
};

export default function NotFound() {
    return (
        <>
            <style>{`
                .nf-btn-primary {
                    display: inline-block;
                    padding: 14px 32px;
                    background: var(--color-accent);
                    color: #000;
                    font-family: var(--font-bebas-neue), sans-serif;
                    font-size: 16px;
                    letter-spacing: 0.1em;
                    border: 1px solid var(--color-accent);
                    transition: background 0.2s ease;
                    text-decoration: none;
                }
                .nf-btn-primary:hover { background: var(--color-accent-hot); }

                .nf-btn-secondary {
                    display: inline-block;
                    padding: 14px 32px;
                    background: transparent;
                    color: var(--color-text-primary);
                    font-family: var(--font-bebas-neue), sans-serif;
                    font-size: 16px;
                    letter-spacing: 0.1em;
                    border: 1px solid var(--color-border);
                    transition: border-color 0.2s ease, color 0.2s ease;
                    text-decoration: none;
                }
                .nf-btn-secondary:hover {
                    border-color: var(--color-accent);
                    color: var(--color-accent);
                }
            `}</style>

            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 24px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    background: "var(--color-bg)",
                }}
            >
                {/* Background grid */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                        opacity: 0.25,
                        pointerEvents: "none",
                    }}
                />

                {/* Glow blob */}
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        top: "30%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "600px",
                        height: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    <p
                        className="type-mono"
                        style={{
                            fontSize: "11px",
                            letterSpacing: "0.24em",
                            color: "var(--color-accent)",
                            marginBottom: "24px",
                        }}
                    >
                        ERROR · 404 · NOT FOUND
                    </p>

                    <h1
                        className="type-display"
                        style={{
                            fontSize: "clamp(120px, 22vw, 220px)",
                            lineHeight: 0.88,
                            color: "var(--color-text-primary)",
                            marginBottom: "32px",
                        }}
                    >
                        404
                    </h1>

                    <div
                        style={{
                            width: "1px",
                            height: "48px",
                            background: "var(--color-border)",
                            margin: "0 auto 32px",
                        }}
                    />

                    <p
                        className="body-text"
                        style={{
                            maxWidth: "420px",
                            margin: "0 auto 48px",
                            lineHeight: 1.7,
                        }}
                    >
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Double-check the URL or head back to safety.
                    </p>

                    <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link href="/" className="nf-btn-primary">GO HOME</Link>
                        <Link href="/projects" className="nf-btn-secondary">VIEW WORK</Link>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "32px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginTop: "48px",
                        }}
                    >
                        {[
                            { label: "About", href: "/about" },
                            { label: "Blog", href: "/blog" },
                            { label: "Skills", href: "/skills" },
                            { label: "Contact", href: "/contact" },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="nav-link type-ui"
                                style={{ color: "var(--color-text-tertiary)" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

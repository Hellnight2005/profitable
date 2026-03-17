import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 — Page Not Found",
    description: "This page does not exist.",
};

export default function NotFound() {
    return (
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
            {/* Background glitch grid */}
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
                {/* Error code */}
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

                {/* Big number */}
                <h1
                    className="type-display"
                    style={{
                        fontSize: "clamp(120px, 22vw, 220px)",
                        lineHeight: 0.88,
                        color: "var(--color-text-primary)",
                        marginBottom: "32px",
                        letterSpacing: "0.02em",
                    }}
                >
                    404
                </h1>

                {/* Divider */}
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
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.7,
                    }}
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Double-check the URL or head back to safety.
                </p>

                {/* Action links */}
                <div
                    style={{
                        display: "flex",
                        gap: "24px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            padding: "14px 32px",
                            background: "var(--color-accent)",
                            color: "#000",
                            fontFamily: "var(--font-bebas-neue), sans-serif",
                            fontSize: "16px",
                            letterSpacing: "0.1em",
                            border: "1px solid var(--color-accent)",
                            transition: "all 0.2s ease",
                            textDecoration: "none",
                        }}
                        onMouseOver={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-accent-hot)";
                        }}
                        onMouseOut={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.background = "var(--color-accent)";
                        }}
                    >
                        GO HOME
                    </Link>

                    <Link
                        href="/projects"
                        style={{
                            display: "inline-block",
                            padding: "14px 32px",
                            background: "transparent",
                            color: "var(--color-text-primary)",
                            fontFamily: "var(--font-bebas-neue), sans-serif",
                            fontSize: "16px",
                            letterSpacing: "0.1em",
                            border: "1px solid var(--color-border)",
                            transition: "all 0.2s ease",
                            textDecoration: "none",
                        }}
                        onMouseOver={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-accent)";
                            (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-accent)";
                        }}
                        onMouseOut={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border)";
                            (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-text-primary)";
                        }}
                    >
                        VIEW WORK
                    </Link>
                </div>

                {/* Nav links */}
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
    );
}

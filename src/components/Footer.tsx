import Link from "next/link";

export default function Footer() {
    return (
        <footer
            style={{
                background: "var(--color-surface)",
                borderTop: "1px solid var(--color-border)",
                padding: "var(--space-6) 48px",
                marginTop: "128px",
            }}
        >
            <div
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "48px",
                    paddingBottom: "48px",
                }}
            >
                {/* Left */}
                <div>
                    <h4
                        style={{
                            fontFamily: "var(--font-bebas-neue)",
                            color: "var(--color-text-primary)",
                            margin: 0,
                            fontSize: "24px",
                            marginBottom: "16px",
                        }}
                    >
                        PORTFOLIO.
                    </h4>
                    <p style={{ fontSize: "var(--type-ui)" }}>
                        Maker. Writer. Builder.
                    </p>
                </div>

                {/* Center */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <p className="type-micro" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em" }}>NAVIGATION</p>
                    <Link href="/" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>Home</Link>
                    <Link href="/projects" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>Work</Link>
                    <Link href="/blog" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>Writing</Link>
                    <Link href="/skills" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>Skills & Services</Link>
                    <Link href="/about" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>About</Link>
                </div>

                {/* Right */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <p className="type-micro" style={{ color: "var(--color-text-tertiary)", letterSpacing: "0.16em" }}>SOCIALS</p>
                    <a href="https://github.com/Hellnight2005" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>GitHub</a>
                    <a href="https://www.linkedin.com/in/abhi2005jeet/" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>LinkedIn</a>
                    <a href="https://hashnode.com/@abhijeet2005" className="nav-link" style={{ width: "fit-content", fontSize: "var(--type-ui)" }}>Hashnode</a>
                </div>
            </div>

            {/* Bottom */}
            <div
                style={{
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "24px",
                    maxWidth: "1280px",
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p style={{ fontSize: "var(--type-micro)", color: "var(--color-text-tertiary)" }}>
                    © {new Date().getFullYear()} All Rights Reserved.
                </p>
                <p style={{ fontSize: "var(--type-micro)", color: "var(--color-text-tertiary)" }}>
                    Built with Next.js & Vanilla CSS
                </p>
            </div>
        </footer>
    );
}

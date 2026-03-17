"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { name: "Home", path: "/" },
        { name: "Work", path: "/projects" },
        { name: "Writing", path: "/blog" },
        { name: "About", path: "/about" },
        { name: "Skills", path: "/skills" },
    ];

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 100,
                    background: "rgba(10,10,10,0.85)",
                    backdropFilter: "blur(12px)",
                    borderBottom: "1px solid var(--color-border)",
                    padding: "0 24px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ paddingLeft: "24px" }} className="desktop-nav-pad">
                    <Link href="/">
                        <h4
                            style={{
                                fontFamily: "var(--font-bebas-neue)",
                                color: "var(--color-text-primary)",
                                margin: 0,
                                letterSpacing: "0.04em",
                                fontSize: "24px",
                            }}
                        >
                            PORTFOLIO.
                        </h4>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex flex-row items-center gap-6" style={{ display: "none" }}>
                    <style>{`
            @media (min-width: 768px) {
              .desktop-nav { display: flex !important; gap: 32px; align-items: center; }
              .desktop-nav-pad { padding-left: 24px !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>

                    <div className="desktop-nav">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`nav-link type-ui`}
                                style={{
                                    fontFamily: "var(--font-dm-mono)",
                                    fontSize: "var(--type-ui)",
                                    letterSpacing: "0.14em",
                                    color: pathname === link.path ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                                    textTransform: "uppercase",
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="desktop-nav" style={{ paddingRight: "24px" }}>
                    <Link href="/contact" style={{ display: "none" }} className="desktop-nav">
                        <button
                            style={{
                                background: "transparent",
                                color: "var(--color-text-primary)",
                                fontFamily: "var(--font-bebas-neue)",
                                fontSize: "var(--type-h4)",
                                letterSpacing: "0.12em",
                                padding: "8px 20px",
                                borderRadius: "2px",
                                border: "1px solid var(--color-border)",
                                cursor: "pointer",
                                transition: "all 200ms ease",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = "var(--color-accent)";
                                e.currentTarget.style.color = "var(--color-accent)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = "var(--color-border)";
                                e.currentTarget.style.color = "var(--color-text-primary)";
                            }}
                        >
                            GET IN TOUCH
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-text-primary)",
                        cursor: "pointer",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        padding: "6px",
                    }}
                >
                    <div style={{ width: "100%", height: "2px", background: "currentColor", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
                    <div style={{ width: "100%", height: "2px", background: "currentColor", opacity: mobileMenuOpen ? 0 : 1, transition: "all 0.3s" }} />
                    <div style={{ width: "100%", height: "2px", background: "currentColor", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "var(--color-bg)",
                    zIndex: 99,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: mobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
                    transition: "transform 400ms cubic-bezier(0.76,0,0.24,1)",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "center" }}>
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                fontFamily: "var(--font-bebas-neue)",
                                fontSize: "var(--type-h1)",
                                color: pathname === link.path ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                            fontFamily: "var(--font-bebas-neue)",
                            fontSize: "var(--type-h1)",
                            color: "var(--color-accent)",
                            marginTop: "16px",
                        }}
                    >
                        CONTACT
                    </Link>
                </div>
            </div>
        </>
    );
}

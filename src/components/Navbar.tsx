"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/projects" },
    { name: "Writing", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="nav-container">
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
            .nav-container {
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 100;
                background: rgba(10,10,10,0.85);
                backdrop-filter: blur(12px);
                border-bottom: 1px solid var(--color-border);
                padding: 0 24px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .nav-contact-btn {
                background: transparent;
                color: var(--color-text-primary);
                font-family: var(--font-bebas-neue);
                font-size: var(--type-h4);
                letter-spacing: 0.12em;
                padding: 8px 20px;
                border-radius: 2px;
                border: 1px solid var(--color-border);
                cursor: pointer;
                transition: all 200ms ease;
            }
            .nav-contact-btn:hover {
                border-color: var(--color-accent) !important;
                color: var(--color-accent) !important;
            }
            .mobile-toggle-btn {
                background: none;
                border: none;
                color: var(--color-text-primary);
                cursor: pointer;
                width: 32px;
                height: 32px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                padding: 6px;
            }
            .mobile-menu-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: var(--color-bg);
                z-index: 99;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: transform 400ms cubic-bezier(0.76,0,0.24,1);
            }
            @media (min-width: 768px) {
              .desktop-nav { display: flex !important; gap: 32px; align-items: center; }
              .desktop-nav-pad { padding-left: 24px !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>

                    <div className="desktop-nav">
                        {LINKS.map((link) => (
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
                        <button className="nav-contact-btn">
                            GET IN TOUCH
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle mobile-toggle-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div style={{ width: "100%", height: "2px", background: "currentColor", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
                    <div style={{ width: "100%", height: "2px", background: "currentColor", opacity: mobileMenuOpen ? 0 : 1, transition: "all 0.3s" }} />
                    <div style={{ width: "100%", height: "2px", background: "currentColor", transition: "all 0.3s", transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className="mobile-menu-overlay"
                style={{
                    transform: mobileMenuOpen ? "translateY(0)" : "translateY(-100%)",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "32px", textAlign: "center" }}>
                    {LINKS.map((link) => (
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

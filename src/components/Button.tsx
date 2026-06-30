"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    href?: string;
    children: React.ReactNode;
}

export function Button({ variant = "primary", children, style, href, ...props }: ButtonProps) {
    const isPrimary = variant === "primary";

    const baseStyle: React.CSSProperties = {
        fontFamily: "var(--font-bebas-neue)",
        fontSize: "var(--type-h4)",
        letterSpacing: "0.12em",
        padding: "14px 32px",
        borderRadius: "2px",
        cursor: "pointer",
        transition: "all 200ms ease",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
        display: "inline-block",
        textDecoration: "none",
        textAlign: "center",
        ...style,
    };

    const primaryStyle: React.CSSProperties = {
        background: "var(--color-accent)",
        color: "#0A0A0A",
        border: "1px solid var(--color-accent)",
        ...baseStyle,
    };

    const secondaryStyle: React.CSSProperties = {
        background: "transparent",
        color: "var(--color-text-primary)",
        border: "1px solid var(--color-border)",
        ...baseStyle,
    };

    const buttonStyle = isPrimary ? primaryStyle : secondaryStyle;

    if (href) {
        return (
            <Link
                href={href}
                style={buttonStyle}
                className={`btn-${variant}`}
                {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
            </Link>
        );
    }

    return (
        <button
            style={buttonStyle}
            className={`btn-${variant}`}
            {...props}
        >
            <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
        </button>
    );
}

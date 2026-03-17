"use client";

import { useEffect, useState } from "react";

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("card")
            ) {
                setHovering(true);
            }
        };

        const handleMouseOut = () => {
            setHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <div
            id="cursor"
            className={hovering ? "cursor--hover" : ""}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
                mixBlendMode: "difference",
                transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                width: hovering ? "40px" : "8px",
                height: hovering ? "40px" : "8px",
                backgroundColor: "var(--color-accent)",
                borderRadius: "50%",
                transition: "width 200ms ease, height 200ms ease, opacity 200ms ease",
                opacity: hovering ? 0.6 : 1,
            }}
        />
    );
}

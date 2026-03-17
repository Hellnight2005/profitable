"use client";

import { useEffect, useState } from "react";

export default function Loader() {
    const [loading, setLoading] = useState(true);
    const [stage, setStage] = useState(0); // 0 = entering, 1 = wipe out word, 2 = fade out overlay

    useEffect(() => {
        // Stage 0: entering (CSS handles initial stagger)
        const holdTimer = setTimeout(() => {
            setStage(1); // Start wipe out
        }, 1200); // 300ms + 7*60ms + 400ms pause ~ 1120ms

        const fadeTimer = setTimeout(() => {
            setStage(2); // Start overlay fade out
        }, 1700); // 1200 + 500ms wipe out

        const doneTimer = setTimeout(() => {
            setLoading(false); // remove from DOM
        }, 2000); // 1700 + 300ms fade out

        return () => {
            clearTimeout(holdTimer);
            clearTimeout(fadeTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    if (!loading) return null;

    const characters = "LOADING".split("");

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "#0A0A0A",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: stage === 2 ? 0 : 1,
                pointerEvents: stage === 2 ? "none" : "auto",
                transition: "opacity 300ms ease",
            }}
        >
            <div
                style={{
                    overflow: "hidden",
                    display: "flex",
                    clipPath: stage >= 1 ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    transition: "clip-path 500ms cubic-bezier(0.76,0,0.24,1)",
                }}
            >
                {characters.map((char, index) => (
                    <span
                        key={index}
                        style={{
                            fontFamily: "var(--font-bebas-neue)",
                            fontSize: "48px",
                            color: "var(--color-text-primary)",
                            opacity: 0,
                            transform: "translateY(20px)",
                            animation: `char-reveal 300ms ease-out forwards ${index * 60 + 100}ms`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
            <style>{`
        @keyframes char-reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}

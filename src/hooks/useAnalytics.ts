"use client";

import { useEffect } from "react";
import { trackEvent } from "@/utils/analytics";

interface PerformanceObserverEntry extends PerformanceEntry {
    id?: string;
    processingStart?: number;
    value?: number;
    hadRecentInput?: boolean;
}

/**
 * Custom hook to automate analytics tracking for the application.
 * Manages event listeners for scroll depth, page timers, JS errors,
 * outbound external links, and Core Web Vitals performance.
 */
export function useAnalytics(): void {
    useEffect(() => {
        if (typeof window === "undefined") return;

        // ==========================================
        // 1. Scroll Depth Tracking
        // ==========================================
        const thresholds = [25, 50, 75, 90];
        const firedThresholds = new Set<number>();

        const handleScroll = () => {
            const scrollTop = window.scrollY || window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;

            const scrollPercentage = Math.round((scrollTop / docHeight) * 100);

            thresholds.forEach((threshold) => {
                if (scrollPercentage >= threshold && !firedThresholds.has(threshold)) {
                    firedThresholds.add(threshold);
                    trackEvent("scroll_depth", { percentage: threshold });
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // ==========================================
        // 2. Time on Page (Engagement Dwell Time)
        // ==========================================
        const intervals = [30, 60, 120];
        const timers = intervals.map((seconds) =>
            setTimeout(() => {
                trackEvent("time_on_page", { seconds });
            }, seconds * 1000)
        );

        // ==========================================
        // 3. Global JavaScript Error Tracking
        // ==========================================
        const handleJsError = (event: ErrorEvent) => {
            // Ignore cross-origin script errors or simple browser extension noise
            if (!event.message || event.message.includes("Script error")) return;

            trackEvent("javascript_error", {
                message: event.message,
                filename: event.filename || "unknown",
                line_number: event.lineno || 0
            });
        };

        window.addEventListener("error", handleJsError);

        // ==========================================
        // 4. Automatic Link Tracking (Social, Email, Resume, Outbound)
        // ==========================================
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (anchor && anchor.href) {
                try {
                    // 1. Direct Email Link Tracking
                    if (anchor.href.startsWith("mailto:")) {
                        trackEvent("email_click", {
                            destination: anchor.href
                        });
                        return;
                    }

                    // 2. Resume View Tracking
                    if (anchor.href.includes("Resume.pdf")) {
                        trackEvent("resume_view", {
                            file_name: "Abhijeet_Shinde_Resume.pdf",
                            destination: anchor.href
                        });
                        return;
                    }

                    const url = new URL(anchor.href);

                    // Check if it's external (different hostname) and not tel links
                    if (
                        url.hostname !== window.location.hostname &&
                        !anchor.href.startsWith("tel:")
                    ) {
                        // Skip github and linkedin outbound clicks in the global listener
                        // to prevent duplicate events from inline handlers
                        if (url.hostname.includes("github.com") || url.hostname.includes("linkedin.com")) {
                            return;
                        }

                        trackEvent("external_link_click", {
                            destination: anchor.href
                        });
                    }
                } catch {
                    // Invalid URL structure, ignore
                }
            }
        };

        document.addEventListener("click", handleLinkClick);

        // ==========================================
        // 5. Performance Web Vitals Tracking
        // ==========================================
        let lcpObserver: PerformanceObserver | null = null;
        let fidObserver: PerformanceObserver | null = null;
        let clsObserver: PerformanceObserver | null = null;
        let clsValue = 0;

        const reportCls = () => {
            if (document.visibilityState === "hidden" && clsValue > 0) {
                trackEvent("performance_cls", {
                    value: parseFloat(clsValue.toFixed(4))
                });
            }
        };

        try {
            // LCP (Largest Contentful Paint)
            lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                trackEvent("performance_lcp", {
                    value: Math.round(lastEntry.startTime),
                    id: (lastEntry as PerformanceObserverEntry).id || "lcp"
                });
            });
            lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

            // FID (First Input Delay)
            fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach((entry) => {
                    const delay = Math.round(
                        ((entry as PerformanceObserverEntry).processingStart ?? entry.startTime) - entry.startTime
                    );
                    trackEvent("performance_fid", {
                        value: delay,
                        name: entry.name
                    });
                });
            });
            fidObserver.observe({ type: "first-input", buffered: true });

            // CLS (Cumulative Layout Shift)
            clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!(entry as PerformanceObserverEntry).hadRecentInput) {
                        clsValue += (entry as PerformanceObserverEntry).value || 0;
                    }
                }
            });
            clsObserver.observe({ type: "layout-shift", buffered: true });

            window.addEventListener("visibilitychange", reportCls);
        } catch {
            // Older browser support fallback
            if (process.env.NODE_ENV === "development") {
                console.log("[Analytics] PerformanceObserver not supported in this browser.");
            }
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            timers.forEach((t) => clearTimeout(t));
            window.removeEventListener("error", handleJsError);
            document.removeEventListener("click", handleLinkClick);
            window.removeEventListener("visibilitychange", reportCls);

            if (lcpObserver) {
                lcpObserver.disconnect();
            }
            if (fidObserver) {
                fidObserver.disconnect();
            }
            if (clsObserver) {
                clsObserver.disconnect();
            }
        };
    }, []);
}

/**
 * Reusable Client Component that mounts useAnalytics in the root layout.
 */
export default function AnalyticsTracker(): null {
    useAnalytics();
    return null;
}

/**
 * Google Analytics 4 (GA4) Event Tracking Utility
 * 
 * Safe, type-safe wrapper functions around global `gtag` tracking.
 */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * Base tracking function that safely dispatches events to GA4.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
    } else {
        if (process.env.NODE_ENV === "development") {
            console.log(`[Analytics Dev] Event: "${eventName}"`, params || "");
        }
    }
}

/**
 * Tracks page views.
 */
export function trackPageView(pageName: string): void {
    trackEvent("page_view", {
        page_title: pageName,
        page_path: typeof window !== "undefined" ? window.location.pathname : ""
    });
}

/**
 * Tracks when a user clicks hero section call-to-actions.
 */
export function trackHeroCtaClick(ctaName: string, ctaDestination: string): void {
    trackEvent("hero_cta_click", {
        cta_name: ctaName,
        cta_destination: ctaDestination,
        page_location: typeof window !== "undefined" ? window.location.pathname : "/"
    });
}

/**
 * Tracks when a user clicks a project card.
 */
export function trackProjectCardClick(
    projectName: string,
    projectSlug: string,
    position?: number,
    sourceSection: string = "featured_projects"
): void {
    trackEvent("project_card_click", {
        project_name: projectName,
        project_slug: projectSlug,
        project_position: position,
        source_section: sourceSection
    });
}

/**
 * Tracks when a user lands on/views a project details page.
 */
export function trackProjectDetailView(projectName: string, projectSlug: string): void {
    trackEvent("project_detail_view", {
        project_name: projectName,
        project_slug: projectSlug
    });
}

/**
 * Tracks when a user clicks an article/writing item.
 */
export function trackWritingArticleClick(
    articleTitle: string,
    articleCategory: string,
    sourceSection: string = "latest_writing"
): void {
    trackEvent("writing_article_click", {
        article_title: articleTitle,
        article_category: articleCategory,
        source_section: sourceSection
    });
}

/**
 * Tracks when a user clicks external GitHub links.
 * Accepts string section name or MouseEvent for direct onClick binding.
 */
export function trackGitHubClick(sourceSectionOrEvent?: unknown): void {
    const sourceSection = typeof sourceSectionOrEvent === "string" ? sourceSectionOrEvent : "footer";
    trackEvent("github_click", {
        source_section: sourceSection,
        destination: "https://github.com/Hellnight2005"
    });
}

/**
 * Tracks when a user clicks external LinkedIn links.
 * Accepts string section name or MouseEvent for direct onClick binding.
 */
export function trackLinkedInClick(sourceSectionOrEvent?: unknown): void {
    const sourceSection = typeof sourceSectionOrEvent === "string" ? sourceSectionOrEvent : "footer";
    trackEvent("linkedin_click", {
        source_section: sourceSection,
        destination: "https://linkedin.com/in/abhijeet-shinde"
    });
}

/**
 * Tracks when a user clicks contact CTAs.
 */
export function trackContactCtaClick(ctaName: string, sourceSection: string = "homepage_cta"): void {
    trackEvent("contact_cta_click", {
        cta_name: ctaName,
        source_section: sourceSection
    });
}

/**
 * Tracks resume view clicks.
 */
export function trackResumeView(): void {
    trackEvent("resume_view", {
        file_name: "Abhijeet_Shinde_Resume.pdf"
    });
}

/**
 * Tracks email mailto clicks.
 */
export function trackEmailClick(): void {
    trackEvent("email_click", {
        destination: "mailto:abhijeet2005shinde@gmail.com"
    });
}

/**
 * Tracks contact form submissions.
 */
export function trackContactFormSubmit(): void {
    trackEvent("contact_form_submit", {
        method: "portfolio_contact_form"
    });
}

/**
 * Legacy project click tracker for backwards compatibility.
 */
export function trackProjectClick(projectName: string): void {
    trackEvent("project_click", {
        project_name: projectName
    });
}

/**
 * Legacy blog click tracker for backwards compatibility.
 */
export function trackBlogClick(blogTitle: string): void {
    trackEvent("blog_read", {
        blog_title: blogTitle
    });
}

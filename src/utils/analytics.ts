/**
 * Google Analytics 4 (GA4) Event Tracking Utility
 * 
 * This utility provides safe, type-safe wrapper functions around the standard
 * global `gtag` tracking function. It prevents errors by checking whether
 * `window.gtag` exists before attempting to dispatch events.
 * 
 * Usage:
 * import { trackEvent, trackContactFormSubmit } from '@/utils/analytics';
 * trackContactFormSubmit();
 */

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

/**
 * Base tracking function that safely dispatches events to GA4.
 * 
 * @param eventName The standard or custom GA4 event name (e.g., 'contact_form_submit').
 * @param params Optional key-value parameters to send along with the event.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
    } else {
        // Log in development mode if GA is not loaded yet
        if (process.env.NODE_ENV === "development") {
            console.log(`[Analytics Dev] Event: "${eventName}"`, params || "");
        }
    }
}

/**
 * Tracks page views. Under Next.js, standard page views are tracked automatically by GA4,
 * but this is useful for virtual page views or tabs.
 */
export function trackPageView(pageName: string): void {
    trackEvent("page_view", {
        page_title: pageName,
        page_path: typeof window !== "undefined" ? window.location.pathname : ""
    });
}

/**
 * Tracks when a user clicks the button to download the professional resume.
 * Category: Resume
 */
export function trackResumeDownload(): void {
    trackEvent("resume_download", {
        file_name: "Abhijeet_Shinde_Resume.pdf"
    });
}

/**
 * Tracks when a user clicks the external GitHub link.
 * Category: Social / Outbound
 */
export function trackGitHubClick(): void {
    trackEvent("github_click", {
        destination: "https://github.com/Hellnight2005"
    });
}

/**
 * Tracks when a user clicks the external LinkedIn profile link.
 * Category: Social / Outbound
 */
export function trackLinkedInClick(): void {
    trackEvent("linkedin_click", {
        destination: "https://linkedin.com/in/abhijeet-shinde"
    });
}

/**
 * Tracks when a user clicks a direct mailto email link.
 * Category: Contact
 */
export function trackEmailClick(): void {
    trackEvent("email_click", {
        destination: "mailto:abhijeet2005shinde@gmail.com"
    });
}

/**
 * Tracks when a user successfully submits the contact form.
 * Should only be fired after server validation and success response.
 * Category: Contact Conversion
 */
export function trackContactFormSubmit(): void {
    trackEvent("contact_form_submit", {
        method: "portfolio_contact_form"
    });
}

/**
 * Tracks when a user clicks to view project details.
 * Category: Projects
 * 
 * @param projectName The name of the project clicked (e.g. 'Cognidesk').
 */
export function trackProjectClick(projectName: string): void {
    trackEvent("project_click", {
        project_name: projectName
    });
}

/**
 * Tracks when a user clicks to read a blog post.
 * Category: Blog
 * 
 * @param blogTitle The title of the blog post clicked.
 */
export function trackBlogClick(blogTitle: string): void {
    trackEvent("blog_read", {
        blog_title: blogTitle
    });
}

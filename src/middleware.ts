import { NextRequest, NextResponse } from "next/server";

// All valid top-level routes in the app
const VALID_ROUTES = new Set([
    "/",
    "/about",
    "/blog",
    "/contact",
    "/projects",
    "/skills",
]);

// Prefixes that are valid (dynamic segments like /blog/post-slug, /projects/repo-name)
const VALID_PREFIXES = ["/blog/", "/projects/"];

// Static assets / Next.js internals to always allow through
const SKIP_PREFIXES = ["/_next/", "/api/", "/favicon.ico", "/Image/", "/blog/posts.json"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Always allow Next.js internals, static files and API routes
    if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
        return NextResponse.next();
    }

    // Allow public files (anything with a file extension)
    if (/\.\w+$/.test(pathname)) {
        return NextResponse.next();
    }

    // Exact match — valid route
    if (VALID_ROUTES.has(pathname)) {
        return NextResponse.next();
    }

    // Dynamic segment match — e.g. /blog/my-post or /projects/my-project
    if (VALID_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
        // Make sure it's not a deeper nesting like /blog/a/b/c
        const sub = pathname.split("/").filter(Boolean);
        if (sub.length === 2) {
            return NextResponse.next();
        }
    }

    // Everything else → 404
    return NextResponse.rewrite(new URL("/not-found", request.url));
}

export const config = {
    // Run on all routes except Next.js internals
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

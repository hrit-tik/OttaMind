import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
    title: "OttaMind — Plan Your Perfect Trip",
    description:
        "AI-powered travel planning. Compare destinations, build itineraries, and explore smarter.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {/* ── Background Blobs ── */}
                <div className="bg-blobs" aria-hidden="true">
                    <div className="blob blob-1" />
                    <div className="blob blob-2" />
                    <div className="blob blob-3" />
                </div>

                {/* ── Navigation ── */}
                <nav className="nav-bar">
                    <Link href="/dashboard" className="nav-logo gradient-text">
                        OttaMind
                    </Link>
                    <ul className="nav-links">
                        <li>
                            <Link href="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/planner" className="nav-link">
                                Planner
                            </Link>
                        </li>
                        <li>
                            <Link href="/compare" className="nav-link">
                                Compare
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* ── Page Content ── */}
                {children}
            </body>
        </html>
    );
}

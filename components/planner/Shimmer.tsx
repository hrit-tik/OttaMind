"use client";

import { ReactNode } from "react";

interface ShimmerProps {
    lines?: number;
    className?: string;
    children?: ReactNode;
    loading?: boolean;
}

export default function Shimmer({
    lines = 3,
    className = "",
    children,
    loading = true,
}: ShimmerProps) {
    if (!loading) return <>{children}</>;

    return (
        <div className={`shimmer-wrap ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="shimmer-line"
                    style={{
                        width: `${75 + Math.random() * 25}%`,
                        animationDelay: `${i * 0.12}s`,
                    }}
                />
            ))}
        </div>
    );
}

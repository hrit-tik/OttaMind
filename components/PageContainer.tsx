"use client";

import { ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

export default function PageContainer({
    children,
    className = "",
}: PageContainerProps) {
    return <main className={`page-container ${className}`}>{children}</main>;
}

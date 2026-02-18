"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function GlassCard({
    children,
    className = "",
    delay = 0,
    ...rest
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={`glass ${className}`}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    gradient?: boolean;
    center?: boolean;
    delay?: number;
}

export default function SectionTitle({
    title,
    subtitle,
    gradient = true,
    center = false,
    delay = 0,
}: SectionTitleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            style={{ textAlign: center ? "center" : "left" }}
        >
            <h2 className={`section-title ${gradient ? "gradient-text" : ""}`}>
                {title}
            </h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </motion.div>
    );
}

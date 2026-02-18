"use client";

import { motion, type Transition } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

interface AnimatedButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    delay?: number;
}

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function AnimatedButton({
    children,
    href,
    onClick,
    className = "",
    delay = 0,
}: AnimatedButtonProps) {
    const transition: Transition = { duration: 0.45, delay, ease };

    if (href) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transition}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-block" }}
            >
                <Link href={href} className={`btn-gradient ${className}`}>
                    {children}
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className={`btn-gradient ${className}`}
        >
            {children}
        </motion.button>
    );
}

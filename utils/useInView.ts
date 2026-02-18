/**
 * useInView — Intersection Observer hook
 * ─────────────────────────────────────────────
 * Returns a ref and a boolean indicating whether the element
 * is visible in the viewport. Used to lazy-load heavy components
 * (map, charts) only when they scroll into view.
 */

"use client";

import { useState, useRef, useEffect, type RefObject } from "react";

interface UseInViewOptions {
    /** Root margin for early trigger, e.g. "200px" to start loading before visible */
    rootMargin?: string;
    /** Fraction of element that must be visible (0-1) */
    threshold?: number;
    /** If true, stays true once triggered (no re-hiding) */
    once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {},
): [RefObject<T | null>, boolean] {
    const { rootMargin = "100px", threshold = 0, once = true } = options;
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            { rootMargin, threshold },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin, threshold, once]);

    return [ref, inView];
}

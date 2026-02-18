"use client";

import { motion, AnimatePresence } from "framer-motion";

const AVAILABLE_TAGS = [
    "beach",
    "mountain",
    "heritage",
    "adventure",
    "nature",
    "spiritual",
    "nightlife",
    "romantic",
    "food",
    "photography",
    "trekking",
    "water-sports",
    "snow",
    "relaxation",
    "culture",
    "shopping",
];

interface Props {
    selected: string[];
    onChange: (tags: string[]) => void;
}

export default function PreferenceTagSelector({ selected, onChange }: Props) {
    const toggle = (tag: string) => {
        if (selected.includes(tag)) {
            onChange(selected.filter((t) => t !== tag));
        } else {
            onChange([...selected, tag]);
        }
    };

    return (
        <div className="tag-selector">
            <AnimatePresence>
                {AVAILABLE_TAGS.map((tag) => {
                    const active = selected.includes(tag);
                    return (
                        <motion.button
                            key={tag}
                            layout
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 22 }}
                            onClick={() => toggle(tag)}
                            className={`tag-pill ${active ? "tag-active" : ""}`}
                        >
                            {tag}
                        </motion.button>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

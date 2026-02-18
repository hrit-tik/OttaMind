/**
 * DestinationCard — Top-ranked destination display
 * ─────────────────────────────────────────────
 * Memoized to prevent re-renders when parent state
 * changes but the destination stays the same.
 */

"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, IndianRupee } from "lucide-react";
import type { RankedDestination } from "@/store/useTripStore";

interface Props {
    dest: RankedDestination | null;
}

function DestinationCard({ dest }: Props) {
    if (!dest) return null;

    const { stay, travel, food, activities } = dest.dailyBudgetBreakdown;
    const totalDaily = stay + travel + food + activities;

    return (
        <motion.div
            className="glass dest-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            key={dest.id}
        >
            <div className="dest-card-header">
                <div className="dest-card-rank">🏆 Top Pick</div>
                <h3 className="dest-card-name gradient-text">{dest.name}</h3>
            </div>

            <div className="dest-card-stats">
                <div className="dest-stat">
                    <MapPin size={16} />
                    <span>{dest.id}</span>
                </div>
                <div className="dest-stat">
                    <Star size={16} />
                    <span>{dest.score} pts</span>
                </div>
                <div className="dest-stat">
                    <IndianRupee size={16} />
                    <span>₹{totalDaily.toLocaleString("en-IN")}/day</span>
                </div>
            </div>
        </motion.div>
    );
}

export default memo(DestinationCard);

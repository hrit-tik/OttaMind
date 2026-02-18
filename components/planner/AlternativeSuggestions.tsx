"use client";

import { motion } from "framer-motion";
import type { RankedDestination } from "@/store/useTripStore";
import { MapPin, Star, IndianRupee } from "lucide-react";

interface Props {
    destinations: RankedDestination[];
}

export default function AlternativeSuggestions({ destinations }: Props) {
    if (destinations.length === 0) return null;

    return (
        <motion.div
            className="glass alt-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
        >
            <h4 className="chart-title">Alternative Destinations</h4>
            <div className="alt-grid">
                {destinations.map((dest, i) => {
                    const total =
                        dest.dailyBudgetBreakdown.stay +
                        dest.dailyBudgetBreakdown.travel +
                        dest.dailyBudgetBreakdown.food +
                        dest.dailyBudgetBreakdown.activities;
                    return (
                        <motion.div
                            key={dest.id}
                            className="alt-card card-lift"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        >
                            <div className="alt-card-rank">#{i + 2}</div>
                            <h5 className="alt-card-name">{dest.name}</h5>
                            <div className="alt-card-stats">
                                <span className="alt-stat">
                                    <Star size={14} /> {dest.score} pts
                                </span>
                                <span className="alt-stat">
                                    <IndianRupee size={14} /> ₹{total.toLocaleString("en-IN")}/day
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { RankedDestination } from "@/store/useTripStore";

interface Props {
    dest: RankedDestination | null;
    days: number;
}

/** Placeholder activities per day — will be replaced by real itinerary engine later */
function buildDayPlan(day: number, dest: RankedDestination) {
    const { stay, travel, food, activities } = dest.dailyBudgetBreakdown;
    const morning =
        day === 1
            ? "Arrive & check in to your accommodation"
            : "Breakfast and morning exploration";
    const afternoon =
        day === 1
            ? "Explore the local area, light sightseeing"
            : "Visit key attractions & local experiences";
    const evening = "Dinner at a local spot, leisure time";
    const budget = `Stay ₹${stay} · Travel ₹${travel} · Food ₹${food} · Activities ₹${activities}`;

    return { morning, afternoon, evening, budget };
}

function DayTimeline({ dest, days }: Props) {
    const [open, setOpen] = useState<number | null>(0);

    if (!dest || days <= 0) return null;

    const dayList = Array.from({ length: days }, (_, i) => i + 1);

    return (
        <motion.div
            className="glass timeline-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
        >
            <h4 className="chart-title">Day-by-Day Plan</h4>

            <div className="timeline">
                {dayList.map((day) => {
                    const plan = buildDayPlan(day, dest);
                    const isOpen = open === day;

                    return (
                        <div key={day} className="timeline-item">
                            {/* Dot + Line */}
                            <div className="timeline-track">
                                <div className={`timeline-dot ${isOpen ? "dot-active" : ""}`} />
                                {day < days && <div className="timeline-line" />}
                            </div>

                            {/* Content */}
                            <div className="timeline-content">
                                <button
                                    className="timeline-header"
                                    onClick={() => setOpen(isOpen ? null : day)}
                                >
                                    <span className="timeline-day">Day {day}</span>
                                    <motion.span
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="timeline-chevron"
                                    >
                                        <ChevronDown size={18} />
                                    </motion.span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            className="timeline-body"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="timeline-row">
                                                <span className="tl-label">🌅 Morning</span>
                                                <span>{plan.morning}</span>
                                            </div>
                                            <div className="timeline-row">
                                                <span className="tl-label">☀️ Afternoon</span>
                                                <span>{plan.afternoon}</span>
                                            </div>
                                            <div className="timeline-row">
                                                <span className="tl-label">🌙 Evening</span>
                                                <span>{plan.evening}</span>
                                            </div>
                                            <div className="timeline-budget">{plan.budget}</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

export default memo(DayTimeline);

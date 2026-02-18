"use client";

import { motion } from "framer-motion";

interface Insight {
    icon: string;
    text: string;
    type: "tip" | "warning" | "info";
}

interface Props {
    insights: Insight[];
}

const typeBg: Record<string, string> = {
    tip: "insight-tip",
    warning: "insight-warning",
    info: "insight-info",
};

export default function SmartInsightBox({ insights }: Props) {
    if (insights.length === 0) return null;

    return (
        <motion.div
            className="glass insight-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
        >
            <h4 className="chart-title">💡 Smart Insights</h4>
            <div className="insight-list">
                {insights.map((ins, i) => (
                    <motion.div
                        key={i}
                        className={`insight-item ${typeBg[ins.type]}`}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                    >
                        <span className="insight-icon">{ins.icon}</span>
                        <span className="insight-text">{ins.text}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import type { RankedDestination } from "@/store/useTripStore";

const COLORS = ["#22d3ee", "#8b5cf6", "#6366f1", "#a78bfa"];
const LABELS = ["Stay", "Travel", "Food", "Activities"];

interface Props {
    dest: RankedDestination | null;
}

export default function BudgetPieChart({ dest }: Props) {
    if (!dest) return null;

    const { stay, travel, food, activities } = dest.dailyBudgetBreakdown;
    const data = [
        { name: LABELS[0], value: stay },
        { name: LABELS[1], value: travel },
        { name: LABELS[2], value: food },
        { name: LABELS[3], value: activities },
    ];

    return (
        <motion.div
            className="glass chart-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            key={`chart-${dest.id}-${stay}-${travel}`}
        >
            <h4 className="chart-title">Daily Budget Breakdown</h4>
            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                        animationDuration={600}
                        animationBegin={0}
                    >
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: "rgba(15,15,30,0.9)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "0.75rem",
                            color: "#f0f0f5",
                            fontSize: "0.85rem",
                        }}
                        formatter={(value: number | undefined) =>
                            `₹${(value ?? 0).toLocaleString("en-IN")}`
                        }
                    />
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{ fontSize: "0.8rem", color: "#9ca3af" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </motion.div>
    );
}

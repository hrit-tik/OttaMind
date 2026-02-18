"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import destinations from "@/data/destinations.json";
import type { Destination } from "@/utils/plannerEngine";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import { Star, IndianRupee, MapPin, Sun } from "lucide-react";

const allDests = destinations as Destination[];

function DestSelector({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="compare-selector">
            <label className="input-label">{label}</label>
            <select
                className="select-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select a destination</option>
                {allDests.map((d) => (
                    <option key={d.id} value={d.id}>
                        {d.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

function StatRow({
    label,
    valA,
    valB,
    icon,
}: {
    label: string;
    valA: string;
    valB: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="compare-row">
            <div className="compare-cell compare-label-cell">
                {icon}
                <span>{label}</span>
            </div>
            <div className="compare-cell">{valA || "—"}</div>
            <div className="compare-cell">{valB || "—"}</div>
        </div>
    );
}

export default function ComparePage() {
    const [idA, setIdA] = useState("");
    const [idB, setIdB] = useState("");

    const destA = useMemo(() => allDests.find((d) => d.id === idA) ?? null, [idA]);
    const destB = useMemo(() => allDests.find((d) => d.id === idB) ?? null, [idB]);

    const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

    return (
        <PageContainer>
            <SectionTitle
                title="Compare Destinations"
                subtitle="Side-by-side analysis to find your perfect match."
            />

            <div className="compare-selectors">
                <DestSelector label="Destination A" value={idA} onChange={setIdA} />
                <div className="compare-vs">VS</div>
                <DestSelector label="Destination B" value={idB} onChange={setIdB} />
            </div>

            {(destA || destB) && (
                <motion.div
                    className="glass compare-table"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    {/* Header */}
                    <div className="compare-row compare-header">
                        <div className="compare-cell compare-label-cell">Metric</div>
                        <div className="compare-cell gradient-text">
                            {destA?.name ?? "—"}
                        </div>
                        <div className="compare-cell gradient-text">
                            {destB?.name ?? "—"}
                        </div>
                    </div>

                    <StatRow
                        label="Rating"
                        icon={<Star size={15} />}
                        valA={destA ? `${destA.rating} ★` : ""}
                        valB={destB ? `${destB.rating} ★` : ""}
                    />
                    <StatRow
                        label="Stay / Day"
                        icon={<IndianRupee size={15} />}
                        valA={destA ? fmt(destA.avgStayCostPerDay) : ""}
                        valB={destB ? fmt(destB.avgStayCostPerDay) : ""}
                    />
                    <StatRow
                        label="Food / Day"
                        icon={<IndianRupee size={15} />}
                        valA={destA ? fmt(destA.avgFoodCostPerDay) : ""}
                        valB={destB ? fmt(destB.avgFoodCostPerDay) : ""}
                    />
                    <StatRow
                        label="Transport / Day"
                        icon={<IndianRupee size={15} />}
                        valA={destA ? fmt(destA.avgLocalTransportCostPerDay) : ""}
                        valB={destB ? fmt(destB.avgLocalTransportCostPerDay) : ""}
                    />
                    <StatRow
                        label="Total / Day"
                        icon={<IndianRupee size={15} />}
                        valA={
                            destA
                                ? fmt(
                                    destA.avgStayCostPerDay +
                                    destA.avgFoodCostPerDay +
                                    destA.avgLocalTransportCostPerDay,
                                )
                                : ""
                        }
                        valB={
                            destB
                                ? fmt(
                                    destB.avgStayCostPerDay +
                                    destB.avgFoodCostPerDay +
                                    destB.avgLocalTransportCostPerDay,
                                )
                                : ""
                        }
                    />
                    <StatRow
                        label="Best Season"
                        icon={<Sun size={15} />}
                        valA={destA?.bestSeason ?? ""}
                        valB={destB?.bestSeason ?? ""}
                    />
                    <StatRow
                        label="Type"
                        icon={<MapPin size={15} />}
                        valA={destA?.type ?? ""}
                        valB={destB?.type ?? ""}
                    />

                    {/* Tags */}
                    <div className="compare-row">
                        <div className="compare-cell compare-label-cell">Tags</div>
                        <div className="compare-cell compare-tags">
                            {destA?.tags.map((t) => (
                                <span key={t} className="tag-pill tag-active">
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="compare-cell compare-tags">
                            {destB?.tags.map((t) => (
                                <span key={t} className="tag-pill tag-active">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </PageContainer>
    );
}

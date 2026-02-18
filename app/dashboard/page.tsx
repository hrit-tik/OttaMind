"use client";

import { Globe, CalendarDays, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import GlassCard from "@/components/GlassCard";
import AnimatedButton from "@/components/AnimatedButton";

const features = [
    {
        icon: Globe,
        title: "Discover Destinations",
        desc: "Explore curated travel destinations powered by real-time data and community insights.",
    },
    {
        icon: CalendarDays,
        title: "Smart Itineraries",
        desc: "Generate optimized day-by-day plans tailored to your preferences and budget.",
    },
    {
        icon: TrendingUp,
        title: "Compare & Decide",
        desc: "Side-by-side comparisons on cost, weather, safety, and activities to find your perfect trip.",
    },
];

export default function DashboardPage() {
    return (
        <PageContainer>
            {/* ── Hero ── */}
            <section className="hero">
                <motion.h1
                    className="section-title gradient-text"
                    style={{ fontSize: "3.5rem", maxWidth: 720, margin: "0 auto" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Plan Your Perfect Trip Within Seconds
                </motion.h1>

                <motion.p
                    className="section-subtitle"
                    style={{ margin: "1.25rem auto 0", maxWidth: 560, textAlign: "center" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                >
                    OttaMind combines AI-driven insights with real traveler data so you
                    can build, compare, and lock in your dream itinerary — effortlessly.
                </motion.p>

                <div className="hero-cta">
                    <AnimatedButton href="/planner" delay={0.3}>
                        Start Planning <ArrowRight size={18} />
                    </AnimatedButton>
                </div>
            </section>

            {/* ── Feature Cards ── */}
            <div className="features-grid">
                {features.map((f, i) => (
                    <GlassCard
                        key={f.title}
                        className="feature-card"
                        delay={0.35 + i * 0.12}
                    >
                        <div className="feature-icon">
                            <f.icon size={24} />
                        </div>
                        <h3 className="feature-title">{f.title}</h3>
                        <p className="feature-desc">{f.desc}</p>
                    </GlassCard>
                ))}
            </div>
        </PageContainer>
    );
}

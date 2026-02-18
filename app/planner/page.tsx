/**
 * Planner Page — Orchestrator
 * ─────────────────────────────────────────────
 * Connects all planner panel components to the Zustand store
 * with debounced recalculation, shimmer loading states, and
 * lazy-loaded heavy components (map, charts).
 *
 * Performance:
 * - Inputs are debounced (350ms) before triggering recalc
 * - Heavy components (BudgetPieChart, Map) are lazy-loaded
 * - Child components are memoized to prevent unnecessary re-renders
 * - Zustand selector pattern avoids full-store subscriptions
 */

"use client";

import { useMemo, useState, useEffect, lazy, Suspense } from "react";
import { useTripStore } from "@/store/useTripStore";
import { generatePlan } from "@/utils/plannerEngine";
import { generateInsights } from "@/utils/insightEngine";
import { useDebounce } from "@/utils/useDebounce";

import InputPanel from "@/components/planner/InputPanel";
import DestinationCard from "@/components/planner/DestinationCard";
import DayTimeline from "@/components/planner/DayTimeline";
import Shimmer from "@/components/planner/Shimmer";
import AlternativeSuggestions from "@/components/planner/AlternativeSuggestions";
import SmartInsightBox from "@/components/planner/SmartInsightBox";
import SaveTrip from "@/components/planner/SaveTrip";
import MonetizationBar from "@/components/planner/MonetizationBar";
import SectionTitle from "@/components/SectionTitle";

/* ── Lazy-loaded heavy components ── */
const BudgetPieChart = lazy(() => import("@/components/planner/BudgetPieChart"));
const DestinationMap = lazy(() => import("@/components/planner/DestinationMap"));

/** Inline fallback for lazy-loaded sections */
function LazyFallback() {
    return (
        <div className="shimmer-wrap glass" style={{ padding: "1.5rem" }}>
            <div className="shimmer-line" style={{ width: "60%" }} />
            <div className="shimmer-line" style={{ width: "80%", animationDelay: "0.15s" }} />
            <div className="shimmer-line" style={{ width: "45%", animationDelay: "0.3s" }} />
        </div>
    );
}

export default function PlannerPage() {
    /* ── Zustand selectors (granular to avoid extra re-renders) ── */
    const budget = useTripStore((s) => s.budget);
    const days = useTripStore((s) => s.days);
    const travelers = useTripStore((s) => s.travelers);
    const preferences = useTripStore((s) => s.preferences);
    const travelStyle = useTripStore((s) => s.travelStyle);
    const setGeneratedPlan = useTripStore((s) => s.setGeneratedPlan);
    const generatedPlan = useTripStore((s) => s.generatedPlan);

    /* ── Debounced inputs ── */
    const debouncedBudget = useDebounce(budget, 350);
    const debouncedDays = useDebounce(days, 350);
    const debouncedTravelers = useDebounce(travelers, 350);
    const debouncedPrefs = useDebounce(preferences, 350);
    const debouncedStyle = useDebounce(travelStyle, 250);

    const [loading, setLoading] = useState(false);

    /* ── Memoized plan recalculation ── */
    const plan = useMemo(
        () =>
            generatePlan({
                budget: debouncedBudget,
                days: debouncedDays,
                travelers: debouncedTravelers,
                preferences: debouncedPrefs,
                travelStyle: debouncedStyle,
            }),
        [debouncedBudget, debouncedDays, debouncedTravelers, debouncedPrefs, debouncedStyle],
    );

    /* ── Memoized insights ── */
    const insights = useMemo(() => {
        const top = plan.rankedDestinations[0];
        if (!top) return [];
        return generateInsights({
            destination: top.name,
            travelStyle: debouncedStyle,
            budgetPerDay: plan.budgetPerDay,
            days: debouncedDays,
            preferences: debouncedPrefs,
        });
    }, [plan, debouncedStyle, debouncedDays, debouncedPrefs]);

    /* ── Shimmer while debounce settles ── */
    useEffect(() => {
        setLoading(true);
        const id = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(id);
    }, [budget, days, travelers, preferences, travelStyle]);

    /* ── Push computed plan to store ── */
    useEffect(() => {
        setGeneratedPlan(plan);
    }, [plan, setGeneratedPlan]);

    /* ── Derived data ── */
    const topDest = generatedPlan?.rankedDestinations[0] ?? null;
    const altDests = generatedPlan?.rankedDestinations.slice(1) ?? [];

    return (
        <main className="planner-layout">
            {/* ── Left Panel: Inputs ── */}
            <aside className="planner-left glass">
                <SectionTitle title="Plan Your Trip" subtitle="Adjust the inputs to see live results" />
                <InputPanel />
            </aside>

            {/* ── Right Panel: Live Preview ── */}
            <section className="planner-right">
                <Shimmer loading={loading} lines={5}>
                    {/* Top destination + alternatives */}
                    <DestinationCard dest={topDest} />
                    <AlternativeSuggestions destinations={altDests} />

                    {/* Monetization CTAs */}
                    <MonetizationBar destinationName={topDest?.name ?? null} />

                    {/* Budget chart (lazy) */}
                    <Suspense fallback={<LazyFallback />}>
                        <BudgetPieChart dest={topDest} />
                    </Suspense>

                    {/* Smart insights */}
                    <SmartInsightBox insights={insights} />

                    {/* Day-by-day timeline */}
                    <DayTimeline dest={topDest} days={days} />

                    {/* Map (lazy, loaded via IntersectionObserver inside component) */}
                    <Suspense fallback={<LazyFallback />}>
                        <DestinationMap destinationId={topDest?.id ?? null} />
                    </Suspense>

                    {/* Save & export actions */}
                    <SaveTrip
                        plan={generatedPlan}
                        days={days}
                        travelers={travelers}
                        travelStyle={travelStyle}
                        preferences={preferences}
                    />
                </Shimmer>
            </section>
        </main>
    );
}

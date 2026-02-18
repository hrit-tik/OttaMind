"use client";

import { useMemo, useState, useEffect } from "react";
import { useTripStore } from "@/store/useTripStore";
import { generatePlan } from "@/utils/plannerEngine";
import { useDebounce } from "@/utils/useDebounce";

import InputPanel from "@/components/planner/InputPanel";
import DestinationCard from "@/components/planner/DestinationCard";
import BudgetPieChart from "@/components/planner/BudgetPieChart";
import DayTimeline from "@/components/planner/DayTimeline";
import Shimmer from "@/components/planner/Shimmer";
import SectionTitle from "@/components/SectionTitle";

export default function PlannerPage() {
    const {
        budget,
        days,
        travelers,
        preferences,
        travelStyle,
        setGeneratedPlan,
        generatedPlan,
    } = useTripStore();

    /* Debounce inputs so we don't recalculate on every keystroke */
    const debouncedBudget = useDebounce(budget, 350);
    const debouncedDays = useDebounce(days, 350);
    const debouncedTravelers = useDebounce(travelers, 350);
    const debouncedPrefs = useDebounce(preferences, 350);
    const debouncedStyle = useDebounce(travelStyle, 250);

    const [loading, setLoading] = useState(false);

    /* Recalculate when debounced values settle */
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

    /* Show shimmer while waiting for debounce to settle */
    useEffect(() => {
        setLoading(true);
        const id = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(id);
    }, [budget, days, travelers, preferences, travelStyle]);

    /* Push to store */
    useEffect(() => {
        setGeneratedPlan(plan);
    }, [plan, setGeneratedPlan]);

    const topDest = generatedPlan?.rankedDestinations[0] ?? null;

    return (
        <main className="planner-layout">
            {/* ── Left Panel ── */}
            <aside className="planner-left glass">
                <SectionTitle title="Plan Your Trip" subtitle="Adjust the inputs to see live results" />
                <InputPanel />
            </aside>

            {/* ── Right Panel ── */}
            <section className="planner-right">
                <Shimmer loading={loading} lines={5}>
                    <DestinationCard dest={topDest} />
                    <BudgetPieChart dest={topDest} />
                    <DayTimeline dest={topDest} days={days} />
                </Shimmer>
            </section>
        </main>
    );
}

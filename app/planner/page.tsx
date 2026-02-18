"use client";

import { useMemo, useState, useEffect } from "react";
import { useTripStore } from "@/store/useTripStore";
import { generatePlan } from "@/utils/plannerEngine";
import { generateInsights } from "@/utils/insightEngine";
import { useDebounce } from "@/utils/useDebounce";

import InputPanel from "@/components/planner/InputPanel";
import DestinationCard from "@/components/planner/DestinationCard";
import BudgetPieChart from "@/components/planner/BudgetPieChart";
import DayTimeline from "@/components/planner/DayTimeline";
import Shimmer from "@/components/planner/Shimmer";
import AlternativeSuggestions from "@/components/planner/AlternativeSuggestions";
import SmartInsightBox from "@/components/planner/SmartInsightBox";
import SaveTrip from "@/components/planner/SaveTrip";
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

    /* Smart insights */
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
    const altDests = generatedPlan?.rankedDestinations.slice(1) ?? [];

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
                    <AlternativeSuggestions destinations={altDests} />
                    <BudgetPieChart dest={topDest} />
                    <SmartInsightBox insights={insights} />
                    <DayTimeline dest={topDest} days={days} />
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

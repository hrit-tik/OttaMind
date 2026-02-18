import destinationsData from "@/data/destinations.json";
import type {
    TravelStyle,
    GeneratedPlan,
    RankedDestination,
} from "@/store/useTripStore";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

export interface Destination {
    id: string;
    name: string;
    type: string;
    avgStayCostPerDay: number;
    avgFoodCostPerDay: number;
    avgLocalTransportCostPerDay: number;
    tags: string[];
    bestSeason: string;
    rating: number;
    coordinates: { lat: number; lng: number };
}

interface PlannerInput {
    budget: number;
    days: number;
    travelers: number;
    preferences: string[];
    travelStyle: TravelStyle;
}

interface BudgetAllocation {
    stay: number;   // fraction
    travel: number;
    food: number;
    activities: number;
}

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const destinations: Destination[] = destinationsData as Destination[];

/** Base allocation percentages */
const BASE_ALLOCATION: BudgetAllocation = {
    stay: 0.4,
    travel: 0.3,
    food: 0.2,
    activities: 0.1,
};

/** Style-specific multipliers applied on top of the base allocation */
const STYLE_MODIFIERS: Record<TravelStyle, BudgetAllocation> = {
    budget: {
        stay: 0.3,       // less on stay (hostels)
        travel: 0.3,
        food: 0.25,      // slightly more street food budget
        activities: 0.15,
    },
    moderate: { ...BASE_ALLOCATION },
    premium: {
        stay: 0.45,      // more on premium stay
        travel: 0.25,
        food: 0.15,
        activities: 0.15, // more on premium experiences
    },
};

/* ─────────────────────────────────────────────
   Step 1 — Budget per day (per person)
   ───────────────────────────────────────────── */

function calcBudgetPerDay(
    totalBudget: number,
    days: number,
    travelers: number,
): number {
    if (days <= 0 || travelers <= 0) return 0;
    return totalBudget / travelers / days;
}

/* ─────────────────────────────────────────────
   Step 2 — Allocate budget by travel style
   ───────────────────────────────────────────── */

function allocateBudget(
    budgetPerDay: number,
    style: TravelStyle,
): { stay: number; travel: number; food: number; activities: number } {
    const pct = STYLE_MODIFIERS[style];
    return {
        stay: Math.round(budgetPerDay * pct.stay),
        travel: Math.round(budgetPerDay * pct.travel),
        food: Math.round(budgetPerDay * pct.food),
        activities: Math.round(budgetPerDay * pct.activities),
    };
}

/* ─────────────────────────────────────────────
   Step 3 — Score each destination
   ───────────────────────────────────────────── */

function getCurrentSeason(): string {
    const month = new Date().getMonth(); // 0-11
    if (month >= 2 && month <= 5) return "summer";
    if (month >= 6 && month <= 8) return "monsoon";
    if (month >= 9 && month <= 10) return "autumn";
    return "winter"; // Nov–Feb
}

function scoreDestination(
    dest: Destination,
    budgetPerDay: number,
    preferences: string[],
    style: TravelStyle,
): number {
    let score = 0;

    /* 1. Budget compatibility (max 30 pts)
       ──────────────────────────────────────
       Total estimated daily cost vs user's per-day budget.
       Perfect fit → 30, over budget → 0, well under → scaled. */
    const destDailyCost =
        dest.avgStayCostPerDay +
        dest.avgFoodCostPerDay +
        dest.avgLocalTransportCostPerDay;

    if (budgetPerDay >= destDailyCost) {
        // Under or equal budget — closer to 1x is better
        const ratio = destDailyCost / budgetPerDay; // 0..1
        score += 30 * ratio; // spending closer to budget => better value
    } else {
        // Over budget — penalise but don't zero-out completely
        const overRatio = budgetPerDay / destDailyCost; // 0..1
        score += 30 * overRatio * 0.5; // harsh penalty
    }

    /* 2. Tag match score (max 30 pts)
       ──────────────────────────────────────
       Each matching tag contributes proportionally. */
    if (preferences.length > 0) {
        const matchCount = dest.tags.filter((t) =>
            preferences.some((p) => p.toLowerCase() === t.toLowerCase()),
        ).length;
        score += (matchCount / preferences.length) * 30;
    } else {
        score += 15; // neutral if no preferences specified
    }

    /* 3. Season match (max 20 pts)
       ──────────────────────────────────────
       Full points if destination's best season matches current season. */
    const currentSeason = getCurrentSeason();
    if (dest.bestSeason === currentSeason) {
        score += 20;
    } else {
        score += 5; // small base — any season is still visitable
    }

    /* 4. Rating weight (max 20 pts)
       ──────────────────────────────────────
       Scale the 0–5 rating to 0–20. */
    score += (dest.rating / 5) * 20;

    /* 5. Style bonus (small nudge)
       ──────────────────────────────────────
       Budget travelers prefer cheaper destinations;
       Premium travelers prefer higher-rated ones. */
    if (style === "budget" && destDailyCost < budgetPerDay * 0.6) {
        score += 5;
    }
    if (style === "premium" && dest.rating >= 4.5) {
        score += 5;
    }

    return Math.round(score * 100) / 100; // two decimals
}

/* ─────────────────────────────────────────────
   Step 4 — Generate plan (top 3)
   ───────────────────────────────────────────── */

export function generatePlan(input: PlannerInput): GeneratedPlan {
    const { budget, days, travelers, preferences, travelStyle } = input;

    // Step 1
    const budgetPerDay = calcBudgetPerDay(budget, days, travelers);

    // Step 2
    const allocation = allocateBudget(budgetPerDay, travelStyle);

    // Step 3 — score every destination
    const scored: RankedDestination[] = destinations.map((dest) => ({
        id: dest.id,
        name: dest.name,
        score: scoreDestination(dest, budgetPerDay, preferences, travelStyle),
        dailyBudgetBreakdown: { ...allocation },
    }));

    // Step 4 — sort descending by score, take top 3
    scored.sort((a, b) => b.score - a.score);
    const rankedDestinations = scored.slice(0, 3);

    return {
        totalBudget: budget,
        budgetPerDay: Math.round(budgetPerDay),
        rankedDestinations,
    };
}

import { create } from "zustand";

/* ── Types ── */

export type TravelStyle = "budget" | "moderate" | "premium";
export type AccommodationType = "hostel" | "hotel" | "resort" | "homestay";
export type FoodPreference = "street" | "local" | "restaurant" | "mixed";
export type TransportPreference = "public" | "shared" | "private" | "mixed";

export interface RankedDestination {
    id: string;
    name: string;
    score: number;
    dailyBudgetBreakdown: {
        stay: number;
        travel: number;
        food: number;
        activities: number;
    };
}

export interface GeneratedPlan {
    totalBudget: number;
    budgetPerDay: number;
    rankedDestinations: RankedDestination[];
}

export interface TripState {
    /* ── Inputs ── */
    budget: number;
    days: number;
    travelers: number;
    preferences: string[];
    travelStyle: TravelStyle;
    accommodationType: AccommodationType;
    foodPreference: FoodPreference;
    transportPreference: TransportPreference;
    selectedDestination: string | null;

    /* ── Output ── */
    generatedPlan: GeneratedPlan | null;

    /* ── Actions ── */
    setBudget: (v: number) => void;
    setDays: (v: number) => void;
    setTravelers: (v: number) => void;
    setPreferences: (v: string[]) => void;
    setTravelStyle: (v: TravelStyle) => void;
    setAccommodationType: (v: AccommodationType) => void;
    setFoodPreference: (v: FoodPreference) => void;
    setTransportPreference: (v: TransportPreference) => void;
    setSelectedDestination: (v: string | null) => void;
    setGeneratedPlan: (v: GeneratedPlan | null) => void;
    reset: () => void;
}

/* ── Defaults ── */

const initialState = {
    budget: 30000,
    days: 5,
    travelers: 2,
    preferences: [] as string[],
    travelStyle: "moderate" as TravelStyle,
    accommodationType: "hotel" as AccommodationType,
    foodPreference: "mixed" as FoodPreference,
    transportPreference: "mixed" as TransportPreference,
    selectedDestination: null as string | null,
    generatedPlan: null as GeneratedPlan | null,
};

/* ── Store ── */

export const useTripStore = create<TripState>((set) => ({
    ...initialState,

    setBudget: (v) => set({ budget: v }),
    setDays: (v) => set({ days: v }),
    setTravelers: (v) => set({ travelers: v }),
    setPreferences: (v) => set({ preferences: v }),
    setTravelStyle: (v) => set({ travelStyle: v }),
    setAccommodationType: (v) => set({ accommodationType: v }),
    setFoodPreference: (v) => set({ foodPreference: v }),
    setTransportPreference: (v) => set({ transportPreference: v }),
    setSelectedDestination: (v) => set({ selectedDestination: v }),
    setGeneratedPlan: (v) => set({ generatedPlan: v }),
    reset: () => set(initialState),
}));

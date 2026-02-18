import type { TravelStyle } from "@/store/useTripStore";

interface InsightInput {
    destination: string;
    travelStyle: TravelStyle;
    budgetPerDay: number;
    days: number;
    preferences: string[];
}

interface Insight {
    icon: string;
    text: string;
    type: "tip" | "warning" | "info";
}

function getCurrentSeason(): string {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 5) return "summer";
    if (month >= 6 && month <= 8) return "monsoon";
    if (month >= 9 && month <= 10) return "autumn";
    return "winter";
}

export function generateInsights(input: InsightInput): Insight[] {
    const { destination, travelStyle, budgetPerDay, days, preferences } = input;
    const season = getCurrentSeason();
    const insights: Insight[] = [];
    const destLower = destination.toLowerCase();

    // Season-based insights
    if (season === "monsoon") {
        insights.push({
            icon: "🌧️",
            text: "Traveling during monsoon may increase local transport delays and cause road closures in hilly areas.",
            type: "warning",
        });
    }
    if (season === "summer" && (destLower.includes("goa") || destLower.includes("jaipur"))) {
        insights.push({
            icon: "☀️",
            text: `${destination} gets extremely hot in summer. Carry sunscreen and stay hydrated.`,
            type: "warning",
        });
    }
    if (season === "winter" && (destLower.includes("manali") || destLower.includes("shimla") || destLower.includes("ladakh"))) {
        insights.push({
            icon: "❄️",
            text: `Heavy snowfall expected in ${destination}. Pack warm layers and check road conditions before travel.`,
            type: "warning",
        });
    }

    // Budget-based insights
    if (budgetPerDay < 1500) {
        insights.push({
            icon: "💡",
            text: "With a tight daily budget, consider hostels and street food to maximize your experience.",
            type: "tip",
        });
    }
    if (budgetPerDay > 5000) {
        insights.push({
            icon: "✨",
            text: "Your generous budget unlocks premium stays and exclusive local experiences.",
            type: "info",
        });
    }

    // Style-based insights
    if (travelStyle === "budget") {
        insights.push({
            icon: "🎒",
            text: "Budget travelers save up to 40% by booking accommodations 2 weeks in advance.",
            type: "tip",
        });
    }
    if (travelStyle === "premium") {
        insights.push({
            icon: "🏨",
            text: "Look for boutique heritage stays — they often offer better value than chain hotels.",
            type: "tip",
        });
    }

    // Duration-based insights
    if (days <= 2) {
        insights.push({
            icon: "⚡",
            text: "Short trips benefit from pre-planned itineraries. Focus on 2-3 key experiences.",
            type: "tip",
        });
    }
    if (days >= 7) {
        insights.push({
            icon: "🗺️",
            text: "Longer trips let you explore off-beat areas. Consider day trips to nearby towns.",
            type: "info",
        });
    }

    // Preference-based insights
    if (preferences.includes("adventure")) {
        insights.push({
            icon: "🧗",
            text: "Book adventure activities (rafting, paragliding) a day in advance for best slots.",
            type: "tip",
        });
    }
    if (preferences.includes("food")) {
        insights.push({
            icon: "🍛",
            text: "Ask locals for hidden food gems — the best meals are often in unmarked stalls.",
            type: "tip",
        });
    }
    if (preferences.includes("spiritual")) {
        insights.push({
            icon: "🕉️",
            text: "Morning aartis and temple visits are best between 5–7 AM for a peaceful experience.",
            type: "info",
        });
    }

    // Destination-specific
    if (destLower.includes("ladakh") || destLower.includes("leh")) {
        insights.push({
            icon: "🏔️",
            text: "Acclimatize for at least 1 day in Leh before heading to higher passes.",
            type: "warning",
        });
    }
    if (destLower.includes("kerala")) {
        insights.push({
            icon: "🛶",
            text: "A houseboat overnight in Alleppey backwaters is a must-do for first-time visitors.",
            type: "info",
        });
    }

    // Return max 3 most relevant insights
    return insights.slice(0, 3);
}

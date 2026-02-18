/**
 * API Service Layer
 * ─────────────────────────────────────────────
 * Centralised abstraction for all external API calls.
 * Currently returns mock/placeholder data. Each function
 * is designed to be swapped with a real API when ready.
 *
 * SCALABILITY: Add new service functions here as OttaMind
 * integrates with Weather API, hotel pricing, AI chat, etc.
 */

/* ── Types ── */

export interface WeatherData {
    temp: number;
    condition: string;
    humidity: number;
    icon: string;
}

export interface HotelPrice {
    name: string;
    pricePerNight: number;
    rating: number;
    link: string;
}

export interface FlightResult {
    airline: string;
    price: number;
    duration: string;
    link: string;
}

export interface AIChatMessage {
    role: "user" | "assistant";
    content: string;
}

/* ── Service Functions (stubs) ── */

/**
 * Fetch current weather for a destination.
 * TODO: Replace with OpenWeatherMap or WeatherAPI integration.
 */
export async function fetchWeather(_destinationId: string): Promise<WeatherData> {
    // Placeholder — simulates API latency
    await delay(300);
    return {
        temp: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        icon: "⛅",
    };
}

/**
 * Fetch real-time hotel prices for a destination.
 * TODO: Replace with Booking.com / MakeMyTrip affiliate API.
 */
export async function fetchHotelPrices(_destinationId: string): Promise<HotelPrice[]> {
    await delay(400);
    return [
        { name: "Comfort Inn", pricePerNight: 2500, rating: 4.2, link: "#" },
        { name: "Heritage Suites", pricePerNight: 5500, rating: 4.7, link: "#" },
    ];
}

/**
 * Search flights to a destination.
 * TODO: Replace with Skyscanner / Cleartrip affiliate API.
 */
export async function searchFlights(
    _from: string,
    _to: string,
): Promise<FlightResult[]> {
    await delay(350);
    return [
        { airline: "IndiGo", price: 4500, duration: "2h 15m", link: "#" },
        { airline: "Air India", price: 5200, duration: "2h 05m", link: "#" },
    ];
}

/**
 * Send a message to the AI travel assistant.
 * TODO: Replace with OpenAI / Gemini API integration.
 */
export async function chatWithAssistant(
    _messages: AIChatMessage[],
): Promise<string> {
    await delay(500);
    return "I'd recommend visiting the local markets in the morning for the best experience!";
}

/* ── Helpers ── */

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

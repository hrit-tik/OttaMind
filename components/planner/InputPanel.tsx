"use client";

import { useTripStore } from "@/store/useTripStore";
import type {
    TravelStyle,
    AccommodationType,
    FoodPreference,
    TransportPreference,
} from "@/store/useTripStore";
import PreferenceTagSelector from "./PreferenceTagSelector";
import { motion } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
};

export default function InputPanel() {
    const {
        budget,
        days,
        travelers,
        preferences,
        travelStyle,
        accommodationType,
        foodPreference,
        transportPreference,
        setBudget,
        setDays,
        setTravelers,
        setPreferences,
        setTravelStyle,
        setAccommodationType,
        setFoodPreference,
        setTransportPreference,
    } = useTripStore();

    return (
        <div className="input-panel">
            {/* ── Budget ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0 }}>
                <label className="input-label">
                    Budget
                    <span className="input-value">₹{budget.toLocaleString("en-IN")}</span>
                </label>
                <input
                    type="range"
                    min={5000}
                    max={500000}
                    step={1000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="slider slider-glow"
                />
                <input
                    type="number"
                    min={5000}
                    max={500000}
                    step={1000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="number-input"
                />
            </motion.div>

            {/* ── Days ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0.05 }}>
                <label className="input-label">Days</label>
                <input
                    type="range"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="slider slider-glow"
                />
                <input
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="number-input"
                />
            </motion.div>

            {/* ── Travelers ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0.1 }}>
                <label className="input-label">Travelers</label>
                <input
                    type="range"
                    min={1}
                    max={10}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="slider slider-glow"
                />
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="number-input"
                />
            </motion.div>

            {/* ── Preferences ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0.15 }}>
                <label className="input-label">Preferences</label>
                <PreferenceTagSelector selected={preferences} onChange={setPreferences} />
            </motion.div>

            {/* ── Travel Style ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0.2 }}>
                <label className="input-label">
                    Travel Style
                    <span className="input-value">{travelStyle}</span>
                </label>
                <div className="style-slider-wrap">
                    {(["budget", "moderate", "premium"] as TravelStyle[]).map((s) => (
                        <button
                            key={s}
                            onClick={() => setTravelStyle(s)}
                            className={`style-btn ${travelStyle === s ? "style-btn-active" : ""}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* ── Accommodation ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0.25 }}>
                <label className="input-label">Accommodation</label>
                <select
                    value={accommodationType}
                    onChange={(e) => setAccommodationType(e.target.value as AccommodationType)}
                    className="select-input"
                >
                    <option value="hostel">Hostel</option>
                    <option value="hotel">Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="homestay">Homestay</option>
                </select>
            </motion.div>

            {/* ── Food ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0.3 }}>
                <label className="input-label">Food Preference</label>
                <select
                    value={foodPreference}
                    onChange={(e) => setFoodPreference(e.target.value as FoodPreference)}
                    className="select-input"
                >
                    <option value="street">Street Food</option>
                    <option value="local">Local Restaurants</option>
                    <option value="restaurant">Fine Dining</option>
                    <option value="mixed">Mixed</option>
                </select>
            </motion.div>

            {/* ── Transport ── */}
            <motion.div className="input-group" {...fadeUp} transition={{ delay: 0.35 }}>
                <label className="input-label">Transport</label>
                <select
                    value={transportPreference}
                    onChange={(e) =>
                        setTransportPreference(e.target.value as TransportPreference)
                    }
                    className="select-input"
                >
                    <option value="public">Public</option>
                    <option value="shared">Shared (Cab Pool)</option>
                    <option value="private">Private Cab</option>
                    <option value="mixed">Mixed</option>
                </select>
            </motion.div>
        </div>
    );
}

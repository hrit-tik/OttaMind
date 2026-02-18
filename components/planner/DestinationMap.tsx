/**
 * DestinationMap — Lazy-loaded Google Maps placeholder
 * ─────────────────────────────────────────────
 * Renders an interactive-looking map area with stay
 * and attraction markers. Uses IntersectionObserver
 * to only mount when visible.
 *
 * TODO: Replace with @react-google-maps/api when
 * a Google Maps API key is configured.
 */

"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { MapPin, Hotel, Camera, Mountain, UtensilsCrossed } from "lucide-react";
import { useInView } from "@/utils/useInView";
import destinations from "@/data/destinations.json";
import type { Destination } from "@/utils/plannerEngine";

const allDests = destinations as Destination[];

interface Props {
    destinationId: string | null;
}

/** Simulated attraction markers for each destination */
const ATTRACTIONS: Record<string, { name: string; type: string }[]> = {
    goa: [
        { name: "Baga Beach", type: "attraction" },
        { name: "Fort Aguada", type: "attraction" },
        { name: "Dudhsagar Falls", type: "attraction" },
    ],
    manali: [
        { name: "Rohtang Pass", type: "attraction" },
        { name: "Solang Valley", type: "attraction" },
        { name: "Old Manali", type: "attraction" },
    ],
    jaipur: [
        { name: "Hawa Mahal", type: "attraction" },
        { name: "Amber Fort", type: "attraction" },
        { name: "City Palace", type: "attraction" },
    ],
    varanasi: [
        { name: "Dashashwamedh Ghat", type: "attraction" },
        { name: "Kashi Vishwanath", type: "attraction" },
        { name: "Sarnath", type: "attraction" },
    ],
    kerala: [
        { name: "Alleppey Backwaters", type: "attraction" },
        { name: "Munnar Tea Gardens", type: "attraction" },
        { name: "Fort Kochi", type: "attraction" },
    ],
};

function getIconForType(type: string) {
    switch (type) {
        case "stay": return <Hotel size={14} />;
        case "food": return <UtensilsCrossed size={14} />;
        case "nature": return <Mountain size={14} />;
        default: return <Camera size={14} />;
    }
}

function DestinationMap({ destinationId }: Props) {
    const [ref, isVisible] = useInView<HTMLDivElement>({ rootMargin: "200px" });

    const dest = destinationId
        ? allDests.find((d) => d.id === destinationId) ?? null
        : null;

    const attractions = destinationId
        ? ATTRACTIONS[destinationId] ?? [{ name: "Main Attraction", type: "attraction" }]
        : [];

    return (
        <div ref={ref} className="map-lazy-wrapper">
            {isVisible ? (
                <motion.div
                    className="glass map-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h4 className="chart-title">📍 Map View</h4>

                    {dest ? (
                        <>
                            {/* Placeholder map area */}
                            <div className="map-placeholder">
                                <div className="map-grid-bg" />
                                <div className="map-center-pin">
                                    <MapPin size={28} />
                                    <span className="map-pin-label">{dest.name}</span>
                                </div>
                                <div className="map-coords">
                                    {dest.coordinates.lat.toFixed(4)}°N,{" "}
                                    {dest.coordinates.lng.toFixed(4)}°E
                                </div>
                            </div>

                            {/* Markers list */}
                            <div className="map-markers">
                                {/* Stay marker */}
                                <div className="map-marker map-marker-stay">
                                    <Hotel size={14} />
                                    <span>Stay Location — {dest.name}</span>
                                </div>
                                {/* Attraction markers */}
                                {attractions.map((a, i) => (
                                    <div key={i} className="map-marker map-marker-attraction">
                                        {getIconForType(a.type)}
                                        <span>{a.name}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="map-api-note">
                                🗺️ Interactive map available with Google Maps API key
                            </p>
                        </>
                    ) : (
                        <p className="map-empty">
                            Select a destination to see map markers
                        </p>
                    )}
                </motion.div>
            ) : (
                /* Placeholder shown before element scrolls into view */
                <div className="map-skeleton glass">
                    <div className="shimmer-line" style={{ height: "200px", borderRadius: "0.75rem" }} />
                </div>
            )}
        </div>
    );
}

/* Prevent re-render when parent re-renders with same destinationId */
export default memo(DestinationMap);

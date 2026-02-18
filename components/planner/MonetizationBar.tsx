/**
 * MonetizationBar — Affiliate & Premium placeholders
 * ─────────────────────────────────────────────
 * Contains placeholder buttons for:
 * - Find Flights (affiliate)
 * - Book Stay (affiliate)
 * - Premium PDF Export (future paid feature)
 * Plus a commented AdSense container.
 */

"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Plane, Hotel, FileText, ExternalLink } from "lucide-react";

interface Props {
    destinationName: string | null;
}

function MonetizationBar({ destinationName }: Props) {
    const dest = destinationName ?? "your destination";

    const handleFlights = () => {
        // TODO: Replace with affiliate partner URL (Skyscanner, Cleartrip, etc.)
        const query = encodeURIComponent(`flights to ${dest}`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    };

    const handleStay = () => {
        // TODO: Replace with affiliate partner URL (Booking.com, MakeMyTrip, etc.)
        const query = encodeURIComponent(`hotels in ${dest}`);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    };

    const handlePremiumPDF = () => {
        // TODO: Gate behind authentication + payment
        alert("🔒 Premium PDF Export — coming soon! This will generate a beautifully formatted PDF itinerary.");
    };

    return (
        <motion.div
            className="monetization-bar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
        >
            <button className="monetize-btn monetize-flights btn-pulse" onClick={handleFlights}>
                <Plane size={16} />
                Find Flights
                <ExternalLink size={12} className="monetize-external" />
            </button>

            <button className="monetize-btn monetize-stay btn-pulse" onClick={handleStay}>
                <Hotel size={16} />
                Book Stay
                <ExternalLink size={12} className="monetize-external" />
            </button>

            <button className="monetize-btn monetize-premium" onClick={handlePremiumPDF}>
                <FileText size={16} />
                Premium PDF
                <span className="premium-badge">PRO</span>
            </button>

            {/* ── AdSense Placeholder ──
             * Uncomment and insert your AdSense client ID when ready.
             *
             * <div className="adsense-container">
             *   <ins
             *     className="adsbygoogle"
             *     style={{ display: "block" }}
             *     data-ad-client="ca-pub-XXXXXXXXXX"
             *     data-ad-slot="XXXXXXXXXX"
             *     data-ad-format="auto"
             *     data-full-width-responsive="true"
             *   />
             * </div>
             */}
        </motion.div>
    );
}

export default memo(MonetizationBar);

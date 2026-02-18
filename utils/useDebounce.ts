import { useEffect, useState } from "react";

/**
 * Debounce a value — returns the latest value only after `delayMs`
 * milliseconds of inactivity.
 */
export function useDebounce<T>(value: T, delayMs = 400): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(id);
    }, [value, delayMs]);

    return debounced;
}

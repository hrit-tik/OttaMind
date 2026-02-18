import { create } from "zustand";

interface AppState {
    /** Placeholder — extend with real state as features are built */
    initialized: boolean;
    setInitialized: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    initialized: false,
    setInitialized: (v) => set({ initialized: v }),
}));

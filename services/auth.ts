/**
 * Auth Service Placeholder
 * ─────────────────────────────────────────────
 * Types and stubs for user authentication.
 * TODO: Replace with NextAuth.js, Clerk, or Firebase Auth.
 */

export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    isPremium: boolean;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

/** Stub — returns null (no user logged in) */
export function getCurrentUser(): User | null {
    // TODO: Implement with real auth provider
    return null;
}

/** Stub — always resolves to null */
export async function signIn(
    _email: string,
    _password: string,
): Promise<User | null> {
    // TODO: Implement with real auth provider
    return null;
}

/** Stub */
export async function signOut(): Promise<void> {
    // TODO: Implement with real auth provider
}

/** Check if a feature requires premium access */
export function requiresPremium(feature: string): boolean {
    const PREMIUM_FEATURES = ["pdf-export", "ai-chat", "unlimited-comparisons"];
    return PREMIUM_FEATURES.includes(feature);
}

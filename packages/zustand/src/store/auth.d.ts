import * as schema from "@chirp/db";
import { InferSelectModel } from "drizzle-orm";
export type User = Omit<InferSelectModel<typeof schema.users>, "password">;
export type BackendTokens = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number | null;
};
export type AuthSlice = {
    user: User | null;
    backendTokens: BackendTokens | null;
    onSignInSuccess: (payload: Omit<AuthSlice, "onSignInSuccess" | "onSignOutSuccess">) => void;
    onSignOutSuccess: () => void;
};
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthSlice>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AuthSlice, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthSlice) => void) => () => void;
        onFinishHydration: (fn: (state: AuthSlice) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AuthSlice, unknown>>;
    };
}>;
//# sourceMappingURL=auth.d.ts.map
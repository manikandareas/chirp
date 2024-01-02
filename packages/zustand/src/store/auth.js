import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useAuthStore = create()(persist((set, get) => ({
    user: null,
    backendTokens: null,
    onSignInSuccess: ({ user, backendTokens }) => set({
        user,
        backendTokens,
    }),
    onSignOutSuccess: () => {
        localStorage.removeItem("chirp-storage");
        return set({
            user: null,
            backendTokens: null,
        });
    },
}), {
    name: "chirp-storage",
    storage: createJSONStorage(() => localStorage),
}));

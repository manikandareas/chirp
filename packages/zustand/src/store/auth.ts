import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  image: string;
};

type BackendTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number | null;
};

type AuthSlice = {
  user: User;
  backendTokens: BackendTokens;
  onSignInSuccess: (
    payload: Omit<AuthSlice, "setInitialData" | "onSignOut">
  ) => void;
  onSignOutSuccess: () => void;
};

const defaultValue = {
  user: {
    username: "",
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    image: "",
  },

  backendTokens: {
    accessToken: "",
    refreshToken: "",
    expiresIn: null,
  },
};

export const useAuthStore = create<AuthSlice>()(
  persist(
    (set, get) => ({
      user: defaultValue.user,
      backendTokens: defaultValue.backendTokens,

      onSignInSuccess: ({ user, backendTokens }) =>
        set({
          user,
          backendTokens,
        }),
      onSignOutSuccess: () =>
        set({
          user: defaultValue.user,
          backendTokens: defaultValue.backendTokens,
        }),
    }),
    {
      name: "chirp-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

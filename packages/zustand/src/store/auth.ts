import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  gender: "male" | "female" | null;
  address: string;
};

type BackendTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number | null;
};

type AuthSlice = {
  user: User | null;
  backendTokens: BackendTokens | null;
  onSignInSuccess: (
    payload: Omit<AuthSlice, "onSignInSuccess" | "onSignOutSuccess">
  ) => void;
  onSignOutSuccess: () => void;
};

const defaultValue = {
  user: {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    image: "",
    gender: null,
    address: "",
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
      onSignOutSuccess: () => {
        localStorage.removeItem("chirp-storage");
        return set({
          user: null,
          backendTokens: null,
        });
      },
    }),
    {
      name: "chirp-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

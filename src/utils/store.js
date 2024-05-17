import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const createThemeSlice = (set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
});

const createUserSlice = (set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) =>
    set({
      isLoggedIn: true,
      user,
    }),
  logout: () =>
    set({
      isLoggedIn: false,
      user: null,
    }),
});

export const useThemeStore = create(
  devtools(
    persist(
      (...a) => ({
        ...createThemeSlice(...a),
      }),
      { name: "theme-store" }
    )
  )
);

export const useUserStore = create(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
      }),
      { name: "user-store" }
    )
  )
);

import { create } from "zustand"

interface UIState {
  theme: "light" | "dark"
  language: "en" | "hi"
  toggleTheme: () => void
  setLanguage: (lang: "en" | "hi") => void
}

export const useUIStore = create<UIState>((set) => ({
  theme: "light",
  language: "en",

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  setLanguage: (language) => set({ language }),
}))

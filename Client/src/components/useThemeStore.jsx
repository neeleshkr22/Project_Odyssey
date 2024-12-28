import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "cupcake",  // Default to dark theme
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);  // Store theme in localStorage
    set({ theme });
  },
}));

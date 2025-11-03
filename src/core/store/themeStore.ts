import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
    let initialTheme: Theme = "light"

    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("theme") as Theme | null
        if (stored === "dark" || stored === "light") {
            initialTheme = stored
        } else {
            initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }

        // Aplica la clase dark al document
        document.documentElement.classList.toggle("dark", initialTheme === "dark")
    }

    return {
        theme: initialTheme,

        toggleTheme: () =>
            set((state) => {
                const newTheme: Theme = state.theme === "dark" ? "light" : "dark"
                localStorage.setItem("theme", newTheme)
                document.documentElement.classList.toggle("dark", newTheme === "dark")
                return { theme: newTheme }
            }),

        setTheme: (theme: Theme) => {
            localStorage.setItem("theme", theme)
            document.documentElement.classList.toggle("dark", theme === "dark")
            set({ theme })
        },
    }
})
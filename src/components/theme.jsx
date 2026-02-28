import { createContext, useContext, useEffect } from "react";
import { themes } from "@/theme-data";
import { checkThemeContrast } from "@/utils/contrast";

export { themes };

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const t = themes.dark;

  useEffect(() => {
    document.documentElement.style.backgroundColor = t.bg;
    document.body.style.backgroundColor = t.bg;
  }, [t.bg]);

  useEffect(() => {
    if (import.meta.env.DEV !== true) return;
    const failures = checkThemeContrast(themes);
    const relevant = failures.filter((f) => f.mode === "dark");
    if (relevant.length > 0) {
      console.warn(
        "[Contrast] The following theme pairings do not meet WCAG AA:",
        relevant.map(
          (f) =>
            ` ${f.fg} (${f.fgHex}) on ${f.bg} (${f.bgHex}): ${f.ratio}:1 (need ${f.minRatio}:1)`
        )
      );
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ dark: true, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

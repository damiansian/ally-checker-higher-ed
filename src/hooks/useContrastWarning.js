"use client";
import { useEffect } from "react";
import { useTheme } from "@/components/theme";
import { contrastRatio } from "@/utils/contrast";

/**
 * In development only: warns to the console if the given foreground/background
 * theme token pair fails the minimum contrast ratio (WCAG AA).
 * Use for ad-hoc color pairings not in THEME_PAIRINGS.
 * @param {string} fgToken - Theme token key for foreground (e.g. 'accent', 'text')
 * @param {string} bgToken - Theme token key for background (e.g. 'surface', 'accentBg')
 * @param {{ minRatio?: number }} [options] - minRatio defaults to 4.5 (normal text)
 */
export function useContrastWarning(fgToken, bgToken, options = {}) {
  const { t } = useTheme();
  const minRatio = options.minRatio ?? 4.5;

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const fgHex = t[fgToken];
    const bgHex = t[bgToken];
    if (!fgHex || !bgHex) return;
    const ratio = contrastRatio(fgHex, bgHex);
    if (ratio < minRatio) {
      console.warn(
        `[Contrast] ${fgToken} (${fgHex}) on ${bgToken} (${bgHex}): ${ratio.toFixed(2)}:1 (need ${minRatio}:1)`
      );
    }
  }, [t, fgToken, bgToken, minRatio]);
}

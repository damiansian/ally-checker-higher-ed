"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const themes = {
  light: {
    bg: "#FAFAF9",
    surface: "#FFFFFF",
    surfaceAlt: "#F5F5F4",
    border: "#E7E5E4",
    borderLight: "#F0EFED",
    text: "#1C1917",
    textSecondary: "#57534E",
    textTertiary: "#A8A29E",
    accent: "#B91C1C",
    accentBg: "#FEF2F2",
    accentBorder: "#FECACA",
    green: "#15803d",
    greenBg: "#F0FDF4",
    greenBorder: "#BBF7D0",
    amber: "#b45309",
    amberBg: "#FFFBEB",
    amberBorder: "#FDE68A",
    pink: "#be123c",
    pinkBg: "#FFF1F2",
    pinkBorder: "#FDA4AF",
    cyan: "#0e7490",
    cyanBg: "#ECFEFF",
    cyanBorder: "#67E8F9",
    codeBg: "#F5F5F4",
    codeText: "#44403C",
    link: "#B91C1C",
    tocActive: "#B91C1C",
    tocHover: "#F5F5F4",
    navBg: "#FFFFFF",
    // File type tile: checked state
    tileCheckedBg: "#47556912",
    tileCheckedBorder: "#47556960",
    tileCheckedText: "#1e293b",
    tileCheckedStatus: "#15803d",
    tileCheckedStatusBg: "#f0fdf4",
    // File type tile: gap state
    tileGapBg: "#fff1f2",
    tileGapBorder: "#fda4af40",
    tileGapText: "#1e293b",
    tileGapStatus: "#be123c",
    tileGapStatusBg: "#fff1f2",
    // File type tile: unreliable state
    tileUnreliableBg: "#ecfeff",
    tileUnreliableBorder: "#67e8f940",
    tileUnreliableText: "#1e293b",
    tileUnreliableStatus: "#0e7490",
    tileUnreliableStatusBg: "#ecfeff",
    // File type tile: na state
    tileNaBg: "#f8fafc",
    tileNaBorder: "#e2e8f0",
    tileNaText: "#78716c",
    tileNaStatus: "#78716c",
    // Metrics
    likelihoodColor: "#f59e0b",
    impactColor: "#8b5cf6",
    impactCriticalColor: "#ef4444",
  },
  dark: {
    bg: "#0C0A09",
    surface: "#1C1917",
    surfaceAlt: "#292524",
    border: "#44403C",
    borderLight: "#292524",
    text: "#FAFAF9",
    textSecondary: "#A8A29E",
    textTertiary: "#78716C",
    accent: "#FCA5A5",
    accentBg: "#451A1A",
    accentBorder: "#7F1D1D",
    green: "#4ade80",
    greenBg: "#052E16",
    greenBorder: "#166534",
    amber: "#fbbf24",
    amberBg: "#451A03",
    amberBorder: "#92400E",
    pink: "#fb7185",
    pinkBg: "#4C0519",
    pinkBorder: "#9F1239",
    cyan: "#22d3ee",
    cyanBg: "#083344",
    cyanBorder: "#155E75",
    codeBg: "#292524",
    codeText: "#D6D3D1",
    link: "#FCA5A5",
    tocActive: "#FCA5A5",
    tocHover: "#292524",
    navBg: "#1C1917",
    // File type tile: checked state
    tileCheckedBg: "#47556918",
    tileCheckedBorder: "#47556960",
    tileCheckedText: "#e2e8f0",
    tileCheckedStatus: "#4ade80",
    tileCheckedStatusBg: "#052e1680",
    // File type tile: gap state
    tileGapBg: "#50061210",
    tileGapBorder: "#9f124480",
    tileGapText: "#cbd5e1",
    tileGapStatus: "#fb7185",
    tileGapStatusBg: "#4c0519",
    // File type tile: unreliable state
    tileUnreliableBg: "#06474710",
    tileUnreliableBorder: "#0e787850",
    tileUnreliableText: "#cbd5e1",
    tileUnreliableStatus: "#22d3ee",
    tileUnreliableStatusBg: "#083344",
    // File type tile: na state
    tileNaBg: "#0f172a",
    tileNaBorder: "#1e293b",
    tileNaText: "#9ca3af",
    tileNaStatus: "#9ca3af",
    // Metrics
    likelihoodColor: "#f59e0b",
    impactColor: "#8b5cf6",
    impactCriticalColor: "#ef4444",
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const t = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ dark, setDark, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

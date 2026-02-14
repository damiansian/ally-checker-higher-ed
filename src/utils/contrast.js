/**
 * WCAG 2.x contrast utilities. Pure JS, no React — safe to run in Node at build time.
 * Used to validate theme token pairings (4.5:1 normal text, 3:1 large text/UI).
 */

/**
 * Parse hex color to RGB values 0–255. Supports #RGB and #RRGGBB (and #RRGGBBAA; alpha ignored).
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number } | null}
 */
function hexToRgb(hex) {
  const m = hex.match(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/);
  if (!m) return null;
  let r, g, b;
  if (m[1].length === 3) {
    r = parseInt(m[1][0] + m[1][0], 16);
    g = parseInt(m[1][1] + m[1][1], 16);
    b = parseInt(m[1][2] + m[1][2], 16);
  } else {
    r = parseInt(m[1].slice(0, 2), 16);
    g = parseInt(m[1].slice(2, 4), 16);
    b = parseInt(m[1].slice(4, 6), 16);
  }
  return { r, g, b };
}

/**
 * WCAG 2.x relative luminance from sRGB.
 * @param {string} hex
 * @returns {number}
 */
export function relativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Contrast ratio of two colors (1–21). Order-agnostic (always L1 >= L2 internally).
 * @param {string} fgHex
 * @param {string} bgHex
 * @returns {number}
 */
export function contrastRatio(fgHex, bgHex) {
  const L1 = relativeLuminance(fgHex);
  const L2 = relativeLuminance(bgHex);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Every foreground/background token pairing used in the UI.
 * minRatio: 4.5 for normal text (WCAG AA), 3.0 for large text / UI components.
 */
export const THEME_PAIRINGS = [
  { fg: "text", bg: "bg", minRatio: 4.5 },
  { fg: "text", bg: "surface", minRatio: 4.5 },
  { fg: "text", bg: "surfaceAlt", minRatio: 4.5 },
  { fg: "text", bg: "accentBg", minRatio: 4.5 },
  { fg: "text", bg: "greenBg", minRatio: 4.5 },
  { fg: "text", bg: "amberBg", minRatio: 4.5 },
  { fg: "text", bg: "cyanBg", minRatio: 4.5 },
  { fg: "textSecondary", bg: "bg", minRatio: 4.5 },
  { fg: "textSecondary", bg: "surface", minRatio: 4.5 },
  { fg: "textSecondary", bg: "surfaceAlt", minRatio: 4.5 },
  { fg: "textSecondary", bg: "accentBg", minRatio: 4.5 },
  { fg: "textTertiary", bg: "bg", minRatio: 4.5 },
  { fg: "textTertiary", bg: "surface", minRatio: 4.5 },
  { fg: "textTertiary", bg: "surfaceAlt", minRatio: 4.5 },
  { fg: "accent", bg: "accentBg", minRatio: 4.5 },
  { fg: "accentContrast", bg: "accent", minRatio: 4.5 },
  { fg: "link", bg: "surface", minRatio: 4.5 },
  { fg: "tocActive", bg: "bg", minRatio: 4.5 },
  { fg: "codeText", bg: "codeBg", minRatio: 4.5 },
  { fg: "tileCheckedText", bg: "tileCheckedBg", minRatio: 4.5 },
  { fg: "tileCheckedStatus", bg: "tileCheckedStatusBg", minRatio: 3 },
  { fg: "tileGapText", bg: "tileGapBg", minRatio: 4.5 },
  { fg: "tileGapStatus", bg: "tileGapStatusBg", minRatio: 3 },
  { fg: "tileUnreliableText", bg: "tileUnreliableBg", minRatio: 4.5 },
  { fg: "tileUnreliableStatus", bg: "tileUnreliableStatusBg", minRatio: 3 },
  { fg: "tileNaText", bg: "tileNaBg", minRatio: 4.5 },
  { fg: "tileNaStatus", bg: "tileNaBg", minRatio: 3 },
  { fg: "green", bg: "greenBg", minRatio: 4.5 },
  { fg: "amber", bg: "amberBg", minRatio: 4.5 },
  { fg: "cyan", bg: "cyanBg", minRatio: 4.5 },
  { fg: "pink", bg: "pinkBg", minRatio: 4.5 },
  { fg: "likelihoodColor", bg: "surface", minRatio: 3 },
  { fg: "impactColor", bg: "surface", minRatio: 3 },
  { fg: "impactCriticalColor", bg: "surface", minRatio: 3 },
];

/**
 * Validate all THEME_PAIRINGS for light and dark themes.
 * @param {{ light: Record<string, string>, dark: Record<string, string> }} themes
 * @returns {{ mode: string, fg: string, bg: string, fgHex: string, bgHex: string, ratio: number, minRatio: number }[]}
 */
export function checkThemeContrast(themes) {
  const failures = [];
  for (const mode of ["light", "dark"]) {
    const theme = themes[mode];
    if (!theme) continue;
    for (const { fg, bg, minRatio } of THEME_PAIRINGS) {
      const fgHex = theme[fg];
      const bgHex = theme[bg];
      if (!fgHex || !bgHex) continue;
      const ratio = contrastRatio(fgHex, bgHex);
      if (ratio < minRatio) {
        failures.push({
          mode,
          fg,
          bg,
          fgHex,
          bgHex,
          ratio: Math.round(ratio * 100) / 100,
          minRatio,
        });
      }
    }
  }
  return failures;
}

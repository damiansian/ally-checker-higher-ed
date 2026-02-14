/**
 * Build-time contrast check. Exits with 1 if any theme pairing fails WCAG AA.
 * Run via: npm run contrast-check
 */
import { themes } from "../src/theme-data.js";
import { checkThemeContrast } from "../src/utils/contrast.js";

const failures = checkThemeContrast(themes);

if (failures.length === 0) {
  console.log("Contrast check passed: all theme pairings meet WCAG AA.");
  process.exit(0);
}

console.error("Contrast check failed: the following pairings do not meet the required ratio.\n");
for (const f of failures) {
  console.error(
    `  FAIL [${f.mode}] ${f.fg} (${f.fgHex}) on ${f.bg} (${f.bgHex}): ${f.ratio}:1 (need ${f.minRatio}:1)`
  );
}
console.error("");
process.exit(1);

import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { isExpectedViolationRoute } from "./utils/expected-violations.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const pagesDir = join(__dirname, "..", "src", "pages");

/**
 * Discovers routes from src/pages (all .astro files).
 * e.g. index.astro -> /, language/index.astro -> /language, language/word.astro -> /language/word
 */
function discoverRoutes(dir, base = "") {
  const entries = readdirSync(dir, { withFileTypes: true });
  const routes = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      routes.push(...discoverRoutes(join(dir, e.name), rel));
    } else if (e.name.endsWith(".astro")) {
      const urlPath =
        e.name === "index.astro" ? (base ? `/${base}` : "/") : `/${rel.replace(/\.astro$/, "")}`;
      routes.push(urlPath);
    }
  }
  return routes;
}

const routes = discoverRoutes(pagesDir);

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag22aa"];

const VIEWPORTS = [
  { name: "default viewport", size: null },
  { name: "200% zoom proxy (640px)", size: { width: 640, height: 960 } },
  { name: "400% zoom proxy (320px)", size: { width: 320, height: 1024 } },
];
const TEXT_SPACING_OVERRIDE_CSS = `
  * {
    line-height: 1.5 !important;
    letter-spacing: 0.12em !important;
    word-spacing: 0.16em !important;
  }
  p {
    margin-bottom: 2em !important;
  }
`;
const TEXT_SPACING_VARIANTS = [
  { name: "normal text spacing", apply: false },
  { name: "text spacing override (SC 1.4.12)", apply: true },
];
const FORCED_COLORS_VARIANTS = [
  { name: "normal colors", forcedColors: "none" },
  { name: "forced colors active", forcedColors: "active" },
];

async function runAxeAndAssertNoViolations(page, routeLabel, disabledRules = []) {
  let axe = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  if (disabledRules.length > 0) {
    axe = axe.disableRules(disabledRules);
  }
  const results = await axe.analyze();
  const violations = results.violations ?? [];
  if (violations.length > 0) {
    const summary = violations
      .map(
        (v) =>
          `[${v.id}] ${v.help}: ${v.nodes?.length ?? 0} node(s) — ${v.helpUrl ?? ""}`
      )
      .join("\n");
    expect(
      violations,
      `Accessibility violations on ${routeLabel}:\n${summary}`
    ).toHaveLength(0);
  }
}

test.describe("Accessibility (WCAG 2.2 AA)", () => {
  const strictRoutes = routes.filter((pathname) => !isExpectedViolationRoute(pathname));
  for (const pathname of strictRoutes) {
    for (const viewport of VIEWPORTS) {
      for (const spacing of TEXT_SPACING_VARIANTS) {
        for (const colors of FORCED_COLORS_VARIANTS) {
          test(
            `${pathname} (${viewport.name}, ${spacing.name}, ${colors.name})`,
            async ({ page }) => {
              if (viewport.size) {
                await page.setViewportSize(viewport.size);
              }
              await page.emulateMedia({ forcedColors: colors.forcedColors });
              await page.goto(pathname, { waitUntil: "networkidle" });
              if (spacing.apply) {
                await page.addStyleTag({ content: TEXT_SPACING_OVERRIDE_CSS });
              }
              const disabledRules =
                colors.forcedColors === "active" ? ["color-contrast"] : [];
              await runAxeAndAssertNoViolations(
                page,
                `${pathname} (${viewport.name}, ${spacing.name}, ${colors.name})`,
                disabledRules
              );
            }
          );
        }
      }
    }
  }
});

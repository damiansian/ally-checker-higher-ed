import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

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
const THEME_TOGGLE_SELECTOR = "button[aria-label*='Switch to']";

async function runAxeAndAssertNoViolations(page, routeLabel) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
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
  for (const pathname of routes) {
    test(`${pathname} (default theme)`, async ({ page }) => {
      await page.goto(pathname, { waitUntil: "networkidle" });
      await runAxeAndAssertNoViolations(page, pathname);
    });

    test(`${pathname} (toggled theme)`, async ({ page }) => {
      await page.goto(pathname, { waitUntil: "networkidle" });
      const toggle = page.locator(THEME_TOGGLE_SELECTOR);
      await toggle.click();
      await page.waitForTimeout(300);
      await runAxeAndAssertNoViolations(page, `${pathname} (toggled theme)`);
    });
  }
});

import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { keyRoutes } from "./utils/routes.mjs";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag22aa"];

/**
 * The /color overview page contains intentional contrast failures used as
 * educational demos (WCAG 1.4.3). These are marked with
 * data-a11y-demo="intentional-contrast-fail" and excluded from axe scans
 * so the test suite passes without disabling the color-contrast rule globally.
 */
const DEMO_CONTRAST_EXCLUDE = ['[data-a11y-demo="intentional-contrast-fail"]'];

async function expectNoViolations(page, label, excludeSelectors = []) {
  let axe = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  for (const sel of excludeSelectors) {
    axe = axe.exclude(sel);
  }
  const results = await axe.analyze();
  const violations = results.violations ?? [];
  expect(violations, `Axe violations on ${label}`).toHaveLength(0);
}

test.describe("Media Preference Variants", () => {
  for (const pathname of keyRoutes) {
    const excludeSelectors =
      pathname === "/color" || pathname === "/color/"
        ? DEMO_CONTRAST_EXCLUDE
        : [];

    test(`${pathname} reduced motion`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(pathname, { waitUntil: "networkidle" });
      await expectNoViolations(page, `${pathname} reduced motion`, excludeSelectors);
    });

    test(`${pathname} prefers contrast more`, async ({ page }) => {
      await page.emulateMedia({ contrast: "more" });
      await page.goto(pathname, { waitUntil: "networkidle" });
      await expectNoViolations(page, `${pathname} prefers contrast more`, excludeSelectors);
    });
  }
});

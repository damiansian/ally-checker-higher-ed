import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { keyRoutes } from "./utils/routes.mjs";
import { isExpectedViolationRoute } from "./utils/expected-violations.mjs";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag22aa"];

async function expectNoViolations(page, label) {
  let axe = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  const results = await axe.analyze();
  const violations = results.violations ?? [];
  expect(violations, `Axe violations on ${label}`).toHaveLength(0);
}

test.describe("Media Preference Variants", () => {
  const strictKeyRoutes = keyRoutes.filter((pathname) => !isExpectedViolationRoute(pathname));
  for (const pathname of strictKeyRoutes) {

    test(`${pathname} reduced motion`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(pathname, { waitUntil: "networkidle" });
      await expectNoViolations(page, `${pathname} reduced motion`);
    });

    test(`${pathname} prefers contrast more`, async ({ page }) => {
      await page.emulateMedia({ contrast: "more" });
      await page.goto(pathname, { waitUntil: "networkidle" });
      await expectNoViolations(page, `${pathname} prefers contrast more`);
    });
  }
});

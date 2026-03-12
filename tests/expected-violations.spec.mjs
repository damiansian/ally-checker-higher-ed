import { test, expect } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { expectedViolationPages } from "./utils/expected-violations.mjs";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag22aa"];

test.describe("Expected Accessibility Violations", () => {
  for (const pageDef of expectedViolationPages) {
    for (const pathname of pageDef.routes) {
      test(`${pathname} reports expected rule violations`, async ({ page }) => {
        await page.goto(pathname, { waitUntil: "networkidle" });

        if (pageDef.demoSelector) {
          const demoCount = await page.locator(pageDef.demoSelector).count();
          expect(
            demoCount,
            `${pathname} should include intentional demo block(s): ${pageDef.demoSelector}`
          ).toBeGreaterThan(0);
        }

        const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
        const violationIds = new Set((results.violations ?? []).map((v) => v.id));

        for (const ruleId of pageDef.requiredRuleIds) {
          expect(
            violationIds.has(ruleId),
            `${pathname} should include expected violation rule: ${ruleId}`
          ).toBe(true);
        }
      });
    }
  }
});

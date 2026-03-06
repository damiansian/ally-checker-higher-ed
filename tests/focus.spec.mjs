import { test, expect } from "@playwright/test";

const focusTargets = [
  { route: "/", role: "link", name: "Skip to main content" },
  { route: "/color/canvas", role: "link", name: "Home" },
  { route: "/color/canvas", role: "link", name: "Canvas editor" },
  { route: "/", role: "button", name: /Expand category detail/i },
];

for (const forcedColors of ["none", "active"]) {
  test.describe(`Focus visibility (forced-colors: ${forcedColors})`, () => {
    for (const target of focusTargets) {
      test(`${target.route} ${String(target.name)}`, async ({ page }) => {
        await page.emulateMedia({ forcedColors });
        await page.goto(target.route, { waitUntil: "networkidle" });

        const locator =
          target.role === "button"
            ? page.getByRole("button", { name: target.name }).first()
            : page.getByRole("link", { name: target.name }).first();

        await locator.focus();
        await expect(locator).toBeFocused();

        const focusStyles = await locator.evaluate((el) => {
          const s = window.getComputedStyle(el);
          return {
            outlineStyle: s.outlineStyle,
            outlineWidth: parseFloat(s.outlineWidth || "0"),
            boxShadow: s.boxShadow,
            borderColor: s.borderColor,
          };
        });

        const hasOutline = focusStyles.outlineStyle !== "none" && focusStyles.outlineWidth > 0;
        const hasBoxShadow = focusStyles.boxShadow !== "none";
        expect(
          hasOutline || hasBoxShadow,
          `No visible focus indicator for ${target.route} / ${String(target.name)} with forced-colors=${forcedColors}`
        ).toBe(true);
      });
    }
  });
}

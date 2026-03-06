import { test, expect } from "@playwright/test";
import { keyRoutes } from "./utils/routes.mjs";

test.describe("Keyboard Navigation", () => {
  for (const pathname of keyRoutes) {
    test(`${pathname} skip link reaches main`, async ({ page }) => {
      await page.goto(pathname, { waitUntil: "networkidle" });
      await page.keyboard.press("Tab");
      const skipLink = page.getByRole("link", { name: "Skip to main content" });
      await expect(skipLink).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("main#main-content")).toBeFocused();
    });
  }

  test("Top nav is keyboard reachable and actionable", async ({ page }) => {
    await page.goto("/color/canvas", { waitUntil: "networkidle" });
    const textAlternativesLink = page
      .getByRole("link", { name: "Text Alternatives" })
      .first();
    await textAlternativesLink.focus();
    await expect(textAlternativesLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/text-alternatives\/?$/);
  });

  test("Home category expansion works with keyboard", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const toggle = page
      .getByRole("button", { name: /(Expand|Collapse) category detail/i })
      .first();
    const before = await toggle.getAttribute("aria-expanded");
    await toggle.focus();
    await page.keyboard.press(" ");
    const after = await toggle.getAttribute("aria-expanded");
    expect(after).not.toBe(before);
  });
});

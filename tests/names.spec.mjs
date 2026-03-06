import { test, expect } from "@playwright/test";
import { keyRoutes } from "./utils/routes.mjs";

test.describe("Accessible Names", () => {
  for (const pathname of keyRoutes) {
    test(`${pathname} interactive controls and images are named`, async ({ page }) => {
      await page.goto(pathname, { waitUntil: "networkidle" });

      const unnamedControls = await page.evaluate(() => {
        const controls = Array.from(
          document.querySelectorAll('a, button, input:not([type="hidden"]), select, textarea, [role="button"], [role="link"]')
        );
        return controls
          .filter((el) => {
            const name =
              el.getAttribute("aria-label") ||
              el.getAttribute("aria-labelledby") ||
              (el.textContent || "").trim();
            return name.length === 0;
          })
          .map((el) => el.outerHTML.slice(0, 180));
      });

      expect(unnamedControls, `Unnamed controls on ${pathname}:\n${unnamedControls.join("\n")}`).toEqual([]);

      const missingAlt = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("img"))
          .filter((img) => !img.hasAttribute("alt"))
          .map((img) => img.getAttribute("src") || "<inline>");
      });

      expect(missingAlt, `Images missing alt on ${pathname}: ${missingAlt.join(", ")}`).toEqual([]);
    });
  }
});

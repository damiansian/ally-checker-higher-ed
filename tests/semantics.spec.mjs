import { test, expect } from "@playwright/test";
import { allRoutes } from "./utils/routes.mjs";

function parseHeadingLevel(tagName) {
  const m = /^H([1-6])$/.exec(tagName);
  return m ? Number(m[1]) : null;
}

test.describe("Semantic Structure", () => {
  for (const pathname of allRoutes) {
    test(`${pathname} landmarks and heading order`, async ({ page }) => {
      await page.goto(pathname, { waitUntil: "networkidle" });

      const main = page.locator("main#main-content").first();
      await expect(main).toHaveCount(1);
      const navCount = await page.locator("nav").count();
      expect(navCount).toBeGreaterThan(0);
      await expect(page.locator("footer")).toHaveCount(1);
      const h1Count = await main.locator("h1").count();
      expect(h1Count).toBeGreaterThanOrEqual(1);

      const headingTags = await main.evaluate((mainEl) =>
        Array.from(mainEl.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(
          (el) => el.tagName
        )
      );

      let prev = 0;
      for (const tag of headingTags) {
        const level = parseHeadingLevel(tag);
        if (!level) continue;
        if (prev && level > prev + 1) {
          throw new Error(`Skipped heading level: ${prev} -> ${level}`);
        }
        prev = level;
      }
    });
  }
});

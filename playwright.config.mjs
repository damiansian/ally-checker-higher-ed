import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PW_PORT) || 4322;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: 2,
  reporter: [
    ["html", { open: "never" }],
    ["json", { outputFile: "test-results/playwright-results.json" }],
  ],
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
    actionTimeout: 10000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
  webServer: {
    command: `npm run build && npx astro preview --host 127.0.0.1 --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
  timeout: 30_000,
});

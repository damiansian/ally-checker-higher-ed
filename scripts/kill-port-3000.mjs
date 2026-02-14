#!/usr/bin/env node
/**
 * Kills any process listening on port 3000 so one dev server can bind to it.
 * Used by npm run dev:fresh to avoid multiple servers on 3003, 3004, etc.
 */
import { execSync } from "node:child_process";

try {
  const pids = execSync("lsof -ti :3000", { encoding: "utf8" })
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  for (const pid of pids) {
    process.kill(Number(pid), "SIGKILL");
  }
  if (pids.length > 0) {
    console.log("Freed port 3000 (stopped existing dev server).");
  }
} catch {
  // lsof exits non-zero when nothing uses the port; ignore
}

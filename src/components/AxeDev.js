"use client";

import { useEffect } from "react";

/**
 * Runs axe-core in the browser during development for WCAG 2.2 AA.
 * Only active when NODE_ENV is development. No-op in production.
 *
 * @axe-core/react is listed in serverExternalPackages (next.config.mjs)
 * so webpack never bundles it into the SSR chunk. The dynamic import()
 * inside useEffect only fires on the client, avoiding the "window is
 * not defined" error that the package triggers at module scope.
 */
export function AxeDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    Promise.all([
      import("@axe-core/react"),
      import("react"),
      import("react-dom"),
    ]).then(([{ default: reactAxe }, React, ReactDOM]) => {
      // Spread into plain objects so axe can monkey-patch createElement.
      // ES module namespace objects are sealed and have read-only getters,
      // which causes "Cannot set property createElement" at runtime.
      reactAxe({ ...React }, { ...ReactDOM }, 1000, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag22aa"],
        },
      });
    });
  }, []);

  return null;
}

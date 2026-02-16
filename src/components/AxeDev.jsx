import { useEffect, useRef } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * Runs axe-core in the browser during development for WCAG 2.2 AA.
 * Only active in dev. No-op in production. Dynamically imports @axe-core/react
 * (references `window` at module scope) so it only runs client-side.
 */
export function AxeDev() {
  const initialized = useRef(false);

  useEffect(() => {
    if (import.meta.env.DEV !== true) return;
    if (initialized.current) return;
    initialized.current = true;

    import("@axe-core/react").then(({ default: reactAxe }) => {
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

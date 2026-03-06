import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL("..", import.meta.url));
const pagesDir = join(__dirname, "..", "src", "pages");

export function discoverRoutes(dir = pagesDir, base = "") {
  const entries = readdirSync(dir, { withFileTypes: true });
  const routes = [];
  for (const e of entries) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) {
      routes.push(...discoverRoutes(join(dir, e.name), rel));
    } else if (e.name.endsWith(".astro")) {
      const urlPath =
        e.name === "index.astro" ? (base ? `/${base}` : "/") : `/${rel.replace(/\.astro$/, "")}`;
      routes.push(urlPath);
    }
  }
  return routes.sort();
}

export const allRoutes = discoverRoutes();

// Keep non-axe suites fast by sampling representative pages.
export const keyRoutes = [
  "/",
  "/color/",
  "/color/canvas",
  "/language/word",
  "/semantic-structure/",
  "/text-alternatives/pdf",
  "/tables/",
  "/seizure-risk/",
];

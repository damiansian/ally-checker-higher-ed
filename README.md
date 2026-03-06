# Canvas LMS Accessibility

A practical reference for higher education instructors using Anthology Ally to improve course accessibility.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## When things go wrong

### Why do these errors keep happening?

The dev server writes compiled output into `.astro/`. When something gets out of sync (e.g. you restart dev, switch branches, or the process was killed), the browser or the server can end up using stale output. Fix: stop duplicate dev servers, restart fresh on one port, and hard-refresh.

### One dev server, one URL

Use **one terminal** for the dev server. Always use **http://localhost:3000**.

- **Normal start:** `npm run dev` (runs on port 3000; if something is already on 3000, Astro will say "port in use" — close that other terminal or app).
- **Start fresh (kill whatever is on 3000, then start):** `npm run dev:fresh` — use this when you’re not sure if an old server is still running, so you don’t get 3003, 3004, etc.

### When you see random dev/build errors

1. **Clean and rebuild:**
   ```bash
   npm run build
   ```
2. **Start one dev server:** `npm run dev:fresh` (or `npm run dev` if nothing is on 3000).
3. Open **http://localhost:3000** and hard-refresh (Cmd+Shift+R / Ctrl+Shift+R).

## What's Built

- **Home page** (`/`) -- Interactive category cards with likelihood/impact metrics, file type coverage states, and expandable Ally catches/misses detail. Cards link to content pages.
- **Text Alternatives: Word** (`/text-alternatives/word`) -- Complete content page with breadcrumb, sidebar TOC, file type pills, styled content sections.

## Project Structure

```txt
src/
├── pages/                         # Astro routes
├── layouts/                       # BaseLayout.astro
├── components/                    # React UI components and page content
├── styles/                        # Global CSS variables and responsive styles
├── theme-data.js                  # Theme tokens
└── utils/                         # Contrast utilities
public/                            # Static assets (screenshots, audio, documents)
tests/                             # Playwright + axe accessibility checks
```

## Adding New Pages

Each content page follows the Astro route + page-key pattern in `src/pages`:

1. Add a route file in `src/pages/<category>/<file-type>.astro`
2. Render `<AppShell client:load page="..."/>` with the matching key
3. Implement/update the matching React page component in `src/components/pages/`
4. Use `ContentPageLayout` plus content components from `src/components/content.jsx`

URL pattern: `/{category-slug}/{file-type-slug}`

## Component Reference

### Layout
- `ContentPageLayout` -- Full page shell (nav, breadcrumb, pills, TOC, footer)
- `TopNav` -- Sticky header with category links
- `Breadcrumb` -- Path navigation
- `FileTypePills` -- File type switcher (auto-filters N/A types)
- `TableOfContents` -- Sticky sidebar with scroll-spy

### Content
- `AllyErrorBox` -- Red callout showing exact Ally error message
- `Step` -- Numbered instruction step
- `CompareBoxes` -- Side-by-side "Ally catches" vs "Ally misses"
- `Placeholder` -- Dashed box for future screenshots/audio
- `RefTable` -- Two-column reference table
- `ResourceLink` -- External link card with title and description
- `Callout` -- Info/warning/tip box

### Data
- `categories` -- Six categories with all dimensions
- `fileTypeMeta` -- Labels and slugs for five file types
- `stateInfo` -- Labels for checked/gap/unreliable/na
- `allyMessages` -- Exact Ally error text per category per file type

## Accessibility (WCAG 2.2 AA)

- **Lint**: `npm run lint` — ESLint with React + jsx-a11y rules for static checks.
- **Dev**: With `npm run dev`, axe-core runs in the browser and logs WCAG 2.2 AA violations to the console.
- **CLI**: Start the dev server, then `npm run a11y` to run axe against the home and sample content pages. If you see a Chrome/ChromeDriver version error, run `npx browser-driver-manager install chrome` and try again.
- **Cursor**: The project includes a WCAG 2.2 AA skill (`.cursor/skills/wcag-2-2-aa/`) and a rule (`.cursor/rules/wcag-a11y.mdc`) for UI files.

## Tech Stack

- Astro 4 + React 19
- No CSS framework (theme tokens + inline styles + global CSS)
- ESLint (React + jsx-a11y), axe-core (browser + Playwright)
- Vercel for deployment

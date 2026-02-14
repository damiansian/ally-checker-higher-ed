# Getting to 100

A practical reference for higher education instructors using Anthology Ally to improve course accessibility.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## When things go wrong

### Why do these errors keep happening?

The dev server writes compiled chunks into `.next/`. When something gets out of sync (e.g. you restart dev, switch branches, or the process was killed), the browser or the server can end up using an old chunk or a missing one. You get errors like **"Cannot find module './778.js'"** or **"__webpack_modules__[moduleId] is not a function"**. Fix: wipe the cache and run one dev server.

### One dev server, one URL

Use **one terminal** for the dev server. Always use **http://localhost:3000**.

- **Normal start:** `npm run dev` (runs on port 3000; if something is already on 3000, Next will say "port in use" — close that other terminal or app).
- **Start fresh (kill whatever is on 3000, then start):** `npm run dev:fresh` — use this when you’re not sure if an old server is still running, so you don’t get 3003, 3004, etc.

### When you see random Next.js / Webpack errors

1. **Clean and rebuild:**
   ```bash
   npm run clean
   npm run build
   ```
2. **Start one dev server:** `npm run dev:fresh` (or `npm run dev` if nothing is on 3000).
3. Open **http://localhost:3000** and hard-refresh (Cmd+Shift+R / Ctrl+Shift+R).

## What's Built

- **Home page** (`/`) -- Interactive category cards with likelihood/impact metrics, file type coverage states, and expandable Ally catches/misses detail. Cards link to content pages.
- **Text Alternatives: Word** (`/text-alternatives/word`) -- Complete content page with breadcrumb, sidebar TOC, file type pills, styled content sections.

## Project Structure

```
src/
├── app/
│   ├── layout.js                  # Root layout (fonts, ThemeProvider)
│   ├── globals.css                # Reset + CSS custom properties
│   ├── page.js                    # Home: category cards
│   └── text-alternatives/
│       ├── page.js                # Redirects to /word
│       └── word/
│           └── page.js            # Full content page
├── components/
│   ├── theme.js                   # ThemeProvider, light/dark tokens
│   ├── data.js                    # Categories, file types, Ally messages
│   ├── content.js                 # AllyErrorBox, Step, CompareBoxes, etc.
│   ├── layout.js                  # ContentPageLayout, TopNav, Breadcrumb, TOC
│   └── index.js                   # Barrel exports
└── public/                        # Static assets (screenshots, audio)
```

## Adding New Pages

Each content page follows the pattern in `text-alternatives/word/page.js`:

1. Import `ContentPageLayout` from `@/components/layout`
2. Import content components from `@/components/content`
3. Set `categorySlug`, `fileTypeSlug`, `title`, `subtitle`, `tocSections`
4. Write content using the styled components

URL pattern: `/{category-slug}/{file-type-slug}`

## Component Reference

### Layout
- `ContentPageLayout` -- Full page shell (nav, breadcrumb, pills, TOC, footer)
- `TopNav` -- Sticky header with category links and theme toggle
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

- **Lint**: `npm run lint` — ESLint with `eslint-config-next` (includes `jsx-a11y`) for static a11y rules.
- **Dev**: With `npm run dev`, axe-core runs in the browser and logs WCAG 2.2 AA violations to the console.
- **CLI**: Start the dev server, then `npm run a11y` to run axe against the home and sample content pages. If you see a Chrome/ChromeDriver version error, run `npx browser-driver-manager install chrome` and try again.
- **Cursor**: The project includes a WCAG 2.2 AA skill (`.cursor/skills/wcag-2-2-aa/`) and a rule (`.cursor/rules/wcag-a11y.mdc`) for UI files.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- No CSS framework (inline styles via theme tokens)
- ESLint (Next + jsx-a11y), axe-core (browser + CLI)
- Vercel for deployment

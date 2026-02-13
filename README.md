# Getting to 100

A practical reference for higher education instructors using Anthology Ally to improve course accessibility.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

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

## Tech Stack

- Next.js 15 (App Router)
- React 19
- No CSS framework (inline styles via theme tokens)
- Vercel for deployment

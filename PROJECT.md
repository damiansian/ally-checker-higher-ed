# Agent Communication Style

All agent responses must begin with: ♿🧠

---

# Project: Canvas LMS Accessibility, "Getting to 100"

## In this document

- [Purpose](#purpose)
- [Audience](#audience)
- [Three Outputs](#three-outputs)
- [Writing Style](#writing-style)
- [Accessibility is Non-Negotiable](#accessibility-is-non-negotiable)
- [Content Categories](#content-categories)
- [Tech Stack (Astro site)](#tech-stack-astro-site)
- [Agent Roles](#agent-roles)
- [Pre-Completion Gate](#pre-completion-gate)
- [Known Issues / Constraints](#known-issues--constraints)

---

## Purpose

A workshop and reference project for higher education instructors on fixing accessibility
errors in Canvas LMS course content. Built for **RUOnline Con 2026**.

The central argument: Getting to 100% in Anthology Ally is the starting line, not the finish.
Automated tools catch ~57% of barriers. The rest requires human judgment.

## Audience

Higher education instructors and instructional designers who use Canvas LMS and Anthology Ally.
Not developers. Not WCAG experts. People who author Word docs, PowerPoints, and Canvas pages.

---

## Three Outputs

| Artifact | Location | Status | Purpose |
|---|---|---|---|
| **Astro site** | `src/` | Deployed to Vercel | Online reference: what Ally catches vs. misses, fix instructions, per file type |
| **PowerPoint deck** | `presenation_deck_das/RUOnlineCon_2026_Damian_Sian.pptx` | In progress | Conference presentation slides |
| **Workshop Word doc** | `course-content-accessibility.html` → .docx | In progress | Sample document participants run accessibility checks on during the hands-on workshop |

The HTML file is authored as HTML and exported to Word (via Pandoc or Word's "Open as Web Page").
Its CSS styling is irrelevant to the Word output; only the semantic HTML structure matters.

---

## Writing Style

- Avoid em dashes in all written materials (site content, workshop doc, slide deck). Use commas, parentheses, or rewrite the sentence instead.

---

## Accessibility is Non-Negotiable

> **In this section:** [Astro site requirements](#astro-site-requirements) · [Workshop HTML doc requirements](#workshop-html-doc-requirements) · [Intentional accessibility issues](#intentional-accessibility-issues)

**Standard: WCAG 2.2 Level AA throughout: in the site, in the workshop doc, in the slide deck.**

This is a project *about* accessibility. Every output must practice what it teaches.
An accessible-content workshop with inaccessible materials is a credibility failure.

### Astro site requirements
- One `<h1>` per page, logical heading hierarchy
- All interactive elements keyboard-accessible with visible focus
- All images have meaningful alt text (or `alt=""` if decorative)
- Color contrast: 4.5:1 for normal text, 3:1 for large text (WCAG 1.4.3)
- No information conveyed by color alone (WCAG 1.4.1)
- `<html lang="en">` set in layout
- `aria-label` on icon-only controls; `aria-expanded` on toggles; `type="button"` on non-submit buttons
- Run `npm run lint` (eslint-plugin-jsx-a11y) before any task is done
- Run `npm run a11y` (Playwright + axe-core) for full WCAG 2.2 AA check

### Workshop HTML doc requirements
- Proper heading structure (h1 → h2 → h3, no skips, no headings used as styling)
- All tables have `<th>` with `scope` attributes
- All images have alt text
- Language attribute set: `<html lang="en">`
- Lists use `<ul>` / `<ol>`, not paragraphs with manual bullets
- No color as sole means of conveying information

### Intentional accessibility issues
The workshop doc may contain **deliberate accessibility errors** seeded for workshop exercises.
These must be clearly documented in a comment block at the top of the file. Do not fix seeded
errors without checking first.

---

## Content Categories

Defined in `src/components/data.js`. Six categories in the Astro site; eight in the HTML doc
(adds Color as Sole Means WCAG 1.4.1, and Lists WCAG 1.3.1).

| Category | WCAG | Astro site | HTML doc |
|---|---|---|---|
| Text Alternatives | 1.1.1 | Yes | Yes |
| Text Contrast | 1.4.3 | Yes | Yes |
| Color as Sole Means | 1.4.1 | No | Yes |
| Semantic Structure / Headings | 1.3.1, 2.4.1, 2.4.6 | Yes | Yes |
| Tables | 1.3.1 | Yes | Yes |
| Lists | 1.3.1 | No | Yes |
| Language | 3.1.1, 3.1.2 | Yes | Yes |
| Seizure Risk | 2.3.1 | Yes | Yes |

---

## Tech Stack (Astro site)

> **In this section:** [Key architectural patterns](#key-architectural-patterns) · [Key commands](#key-commands)

- **Framework**: Astro 4 + React 19 (islands, `client:load`)
- **Styling**: Inline styles via theme tokens from `useTheme()` (no CSS framework)
- **Theming**: `src/components/theme.jsx`, ThemeProvider + light/dark token system
- **A11y testing**: axe-core/react (dev overlay), axe-core/playwright (CI), eslint-plugin-jsx-a11y
- **Deployment**: Vercel
- **Dev server**: `npm run dev` (port 3000)
- **Path alias**: `@/` → `src/`

### Key architectural patterns
- `src/pages/**/*.astro` passes a `page` string key to `AppShell` (avoids Astro serialization limits)
- `AppShell.jsx` is a page registry; all page components registered there
- `src/components/data.js` is the single source of truth for all category data
- `src/components/layout.jsx`, shared: TopNav, Breadcrumb, FileTypePills, ContentPageLayout, TableOfContents
- `src/components/content.jsx`, shared content primitives: AllyErrorBox, CompareBoxes, RefTable, Callout, CheckerComparisonTable

### Key commands
```bash
npm run dev          # dev server on port 3000
npm run build        # contrast check + astro build
npm run lint         # eslint (includes jsx-a11y)
npm run a11y         # Playwright + axe-core full a11y test
npm run contrast-check  # standalone contrast validation
```

---

## Agent Roles

> **In this section:** [Inter-agent rules](#inter-agent-rules)

Multiple AI agents contribute to this project. Respect these lanes:

| Agent | Primary responsibility | Owns |
|---|---|---|
| **Cursor** | Building the Astro site | `src/`, `public/`, Astro config |
| **Codex** | Deep a11y testing and analysis | Test infrastructure, Playwright tests, axe results, a11y audit findings |
| **Claude Code** | HTML workshop doc, cross-cutting review, coordination | `course-content-accessibility.html`, architectural decisions |

### Inter-agent rules
- Do not modify files outside your lane without explicit user instruction
- A11y findings from Codex should be filed as comments or issues before Cursor acts on them
- All agents must pass the pre-completion gate before reporting done (see below)
- When in doubt about scope, ask the user. Do not assume.

---

## Pre-Completion Gate

Before reporting any task complete on the Astro site:

1. `npm run lint`: fix all errors
2. `npm run build`: must exit 0
3. If UI components were changed: `npm run a11y` or note it as a pending check

For the HTML workshop doc: validate heading structure, table headers, and image alt text manually.

---

## Known Issues / Constraints

- Language detection in Ally is unreliable for DOCX/PPTX/PDF (confirmed in testing)
- Canvas RCE false positive: Ally flags alt text >~120 chars (this is a known Ally bug, not a WCAG violation)
- `course-content-accessibility.html` heading structure has been reviewed and corrected

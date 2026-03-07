# Accessibility Testing Contract

## Automated Coverage

- `tests/a11y.spec.mjs`
  - Axe WCAG tags: `wcag2a`, `wcag2aa`, `wcag22aa`
  - Variants per route:
    - default viewport
    - 200% zoom proxy (`640x960`)
    - 400% zoom proxy (`320x1024`)
    - normal text spacing
    - SC 1.4.12 text spacing override
    - normal colors / forced colors emulation
  - Forced-colors note: `color-contrast` is disabled only in `forcedColors: active` runs due known emulation/reporting noise.

- `tests/keyboard.spec.mjs`
  - Skip-link behavior
  - Top-nav keyboard operability
  - Home interaction by keyboard

- `tests/semantics.spec.mjs`
  - Landmark presence (`main`, `nav`, `footer`)
  - Exactly one `h1`
  - Heading level progression checks

- `tests/names.spec.mjs`
  - Interactive controls have names
  - Images require `alt`

- `tests/focus.spec.mjs`
  - Focus indicators under normal and forced-colors modes

- `tests/media-preferences.spec.mjs`
  - Reduced-motion variant
  - `prefers-contrast: more` variant

## Scripts Reference

| Script | What it runs | When to use |
|---|---|---|
| `npm run test:a11y` | Full Chromium axe suite (all routes, all variants) | Pre-merge, CI |
| `npm run test:a11y:critical` | `/guide` and `/color` routes only (Chromium) | Quick local smoke check before pushing |
| `npm run test:a11y:all` | Full suite across Chromium + Firefox | Pre-release or when browser-specific issues are suspected |
| `npm run test:a11y:budget` | Budget checker against last Playwright JSON report | CI (runs after full suite) |
| `npm run test:a11y:report` | Opens the Playwright HTML report | After any test run to inspect failures |

## Concurrency and Port Handling

Each Playwright run selects a random preview-server port (range 4322-4421) so overlapping local runs do not collide. The port can also be pinned via the `PW_PORT` environment variable:

```bash
PW_PORT=4500 npm run test:a11y
```

`reuseExistingServer` is set to `false` unconditionally, so every run builds and launches its own preview server. This avoids silently testing against a stale build from a prior run.

CI is unaffected: each GitHub Actions job runs in an isolated container with no port contention.

## Browser Matrix

- Local default: Chromium (`npm run test:a11y`)
- Full matrix: Chromium + Firefox (`npm run test:a11y:all`)
- CI matrix in `.github/workflows/a11y.yml`

## Budgeting and Trend Guardrails

- Playwright JSON report output: `test-results/playwright-results.json`
- Budget file: `tests/a11y-budget.json`
- Budget checker: `npm run test:a11y:budget`
- Summary artifact: `test-results/a11y-summary.json`

## Manual Coverage Required (Not Fully Automatable)

- Screen reader workflows (NVDA/JAWS/VoiceOver)
- Meaning and quality of alt text
- Instructional clarity and cognitive load
- Real Windows High Contrast manual checks
- End-to-end task completion with assistive technologies

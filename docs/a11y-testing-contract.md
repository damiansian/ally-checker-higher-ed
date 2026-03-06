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

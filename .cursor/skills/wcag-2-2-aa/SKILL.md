---
name: wcag-2-2-aa
description: Apply and verify WCAG 2.2 Level AA accessibility when building or reviewing web UI. Use when working on accessibility, a11y, WCAG, Ally, screen readers, or when the user asks for accessible or inclusive design.
---

# WCAG 2.2 Level AA

## When to use

- Implementing or reviewing UI (components, pages, forms, navigation).
- Adding or changing images, media, links, buttons, headings, or focus behavior.
- Running or interpreting accessibility tests (axe, eslint-plugin-jsx-a11y).

## Quick checks

1. **Perceivable**: Text alternatives for non-text content; captions/alternatives for media; content can be presented in different ways; color is not the only means of conveying information; contrast and text resize.
2. **Operable**: Keyboard accessible; no keyboard traps; enough time; no seizure-inducing content; bypass blocks; focus visible; multiple ways to find pages; clear page titles and headings.
3. **Understandable**: Language of page set (`lang`); predictable behavior; input assistance (labels, errors, suggestions).
4. **Robust**: Valid markup; name, role, value for custom UI (ARIA where needed).

## Implementation notes

- **Images**: Decorative = `alt=""`. Meaningful = concise `alt` describing purpose.
- **Interactive elements**: Buttons and links need programmatic names (visible text or `aria-label`). Icon-only buttons must have `aria-label`.
- **Headings**: One `<h1>` per page; logical order (h1 → h2 → h3); no skipped levels.
- **Forms**: Every input has a visible `<label>` (or `aria-label`/`aria-labelledby`). Error messages associated with `aria-describedby` or live regions as appropriate.
- **Focus**: Visible focus indicator; focus order matches visual order; no `tabindex` > 0 unless required for behavior.
- **Color**: Don’t rely on color alone; ensure sufficient contrast (4.5:1 normal text, 3:1 large text per WCAG AA).
- **Motion**: Respect `prefers-reduced-motion` where motion is non-essential.

## Testing in this project

- **Lint**: `npm run lint` — ESLint with `eslint-plugin-jsx-a11y` for static a11y rules.
- **Runtime (dev)**: With `npm run dev`, axe-core runs in the browser and logs violations to the console.
- **CLI (WCAG 2.2 AA)**: Start the dev server, then `npm run a11y` to run axe against localhost with tags `wcag2a`, `wcag2aa`, `wcag22aa`. Requires a matching Chrome/ChromeDriver (e.g. `npx browser-driver-manager install chrome` if the CLI reports a version mismatch). Fix any reported violations and incompletes as needed.

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — full guidelines.
- [WCAG 2.2 at a Glance](https://www.w3.org/WAI/WCAG22/quickref/) — filterable quick reference.
- [axe-core rule list](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md) — maps rules to success criteria.

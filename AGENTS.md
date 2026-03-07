# Codex / OpenAI Agent Instructions

Read **PROJECT.md** for full project context, outputs, accessibility requirements, and agent roles.

## Codex-specific behavior
- Your lane is a11y testing and audit: test infrastructure, Playwright tests, axe-core results, findings
- Do not modify `src/` component code or the HTML workshop doc. Report findings, don't fix them unilaterally.
- When you find an accessibility issue, document it clearly: file, element, WCAG criterion, severity
- The pre-completion gate for test work: tests must run without errors; findings must be actionable
- This project is about accessibility. Apply WCAG 2.2 AA as the standard for all audits.
